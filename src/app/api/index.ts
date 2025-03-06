import axios from "axios";

export const port = 5000

export const link = 'https://warm-reef-41256-e838c74ede11.herokuapp.com'
// export const link = 'http://localhost:5000'

export const conf = (jwt : string) => {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
}

const CLOUD_NAME = 'dnaic03hs';
const API_KEY = '426647881873473';
const API_SECRET = 'r8_h-BE6ff_uaoG5f_SstFx7f74';

export const uploadToCloudinary = async (file: File,type : string) => {
  const timestamp = new Date().getTime();
  // const signature = createHash('sha1')
  //   .update(`timestamp=${timestamp}${API_SECRET}`)
  //   .digest('hex');

  const uploadParams = {
    file: file,
    // timestamp: timestamp.toString(),
    // api_key: API_KEY,
    // signature: signature,
    upload_preset: 'mbungai'
  };
  
  const formData = new FormData();
  formData.append('file', file);
  // formData.append('timestamp', timestamp.toString());
  // formData.append('api_key', API_KEY);
  // formData.append('signature', signature);
  formData.append('upload_preset', 'mbungai');
  console.log(formData);
  
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`, // Replace 'df5uqnkgi' with your cloud name
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    // this.newArtist.artistImage = response.data.secure_url; // Save the uploaded image URL
    console.log('Image uploaded successfully:', res.data.secure_url);
    return res.data.secure_url as string
  } catch (error) {
    console.error('Error uploading image:', error);
    return null
  }
};