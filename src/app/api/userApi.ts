import axios from "axios";
import { link, conf } from ".";
import { User } from "../types";
import { UserDto } from "../types/userDto";

const route: string = "api/users";

// Function to send verification code
export const sendCode = async (user: UserDto) => {
  try {
    const res = await axios.post(`${link}/send-code`, user);
    console.log("message", res.statusText);
    const use = res.data.message as string;
    console.log(res.data);
    return use;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const verifyCode = async (phoneNumber: number, code : number) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    console.log({phoneNumber, code});
    
    const res = await axios.post(`${link}/verify-code`, {phoneNumber, code})
    console.log("message", res.statusText);
    const use = res.data;
    console.log(res.data);
    return use;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Function to get all users
export const getUsers = async (jwt: string) => {
  try {
    const res = await axios.get(`${link}/${route}`, conf(jwt));
    console.log(res.data.data);
    return res.data.data as User[];
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Function to get user by ID
export const getUser = async (id: string, jwt: string) => {
  try {
    const res = await axios.get(`${link}/${route}/${id}`, conf(jwt));
    console.log(res.data.data);
    return res.data.data as User;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Function to get all doctors
export const getDoctors = async (jwt: string | null) => {
  try {
    const res = await axios.get(`${link}/doctors`);
    console.log(res.data.doctors);
    return res.data.doctors as User[];
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return null;
  }
};
