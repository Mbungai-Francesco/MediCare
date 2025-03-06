const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const twilio = require('twilio');
require('dotenv').config();  // Load environment variables

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const app = express();
app.use(bodyParser.json());

let verificationCodes = {};

// 📌 Send SMS function
const sendSms = async (phoneNumber, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: `+237${phoneNumber}` // Adjust based on Twilio's format
        });
        console.log('✅ SMS sent:', response.sid);
        return true;
    } catch (error) {
        console.error('❌ Error sending SMS:', error.message);
        return false;
    }
};

// 📌 Send Verification Code
app.post('/send-code', async (req, res) => {
    const { phoneNumber, name, email = '' } = req.body;
    if (!phoneNumber) return res.status(400).json({ error: 'Phone number is required' });

    const code = Math.floor(1000 + Math.random() * 9000);  // Generate a random code for sending
    verificationCodes[phoneNumber] = { code, name, email };

    const message = `Your verification code is ${code}`;
    const smsSent = await sendSms(phoneNumber, message);

    if (smsSent) {
        res.json({ message: 'Verification code sent!' });
    } else {
        // If SMS sending fails, notify the user and tell them to use the universal codes
        res.json({ 
            message: 'Failed to send SMS. You can enter the universal code 5555 or 55550 to proceed.' 
        });
    }
});

// 📌 Verify Code & Save User (Ensuring Unique Phone Numbers)
app.post('/verify-code', (req, res) => {
    const { phoneNumber, code } = req.body;
    if (!phoneNumber || !code) return res.status(400).json({ error: 'Phone number and code are required' });

    // Check if the code matches the stored code OR if it's the universal code 5555 or 55550
    const storedCode = verificationCodes[phoneNumber]?.code;

    if (storedCode === parseInt(code) || code === "5555" || code === "55550") {
        const { name, email } = verificationCodes[phoneNumber];

        // 🔍 Check if phone number exists in database
        const checkQuery = 'SELECT * FROM users WHERE phoneNumber = ?';
        connection.query(checkQuery, [phoneNumber], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            if (results.length > 0) {
                // ✅ UPDATE existing user
                const updateQuery = 'UPDATE users SET name = ?, email = ? WHERE phoneNumber = ?';
                connection.query(updateQuery, [name, email, phoneNumber], (err) => {
                    if (err) return res.status(500).json({ error: 'Database update error' });
                    res.json({ message: 'User updated successfully!', name, email });
                });
            } else {
                // ✅ INSERT new user
                const insertQuery = 'INSERT INTO users (name, phoneNumber, email) VALUES (?, ?, ?)';
                connection.query(insertQuery, [name, phoneNumber, email], (err) => {
                    if (err) return res.status(500).json({ error: 'Database insert error' });
                    res.json({ message: 'User registered successfully!', name, email });
                });
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid verification code' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
