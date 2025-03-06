import axios from "axios";
import { conf, link } from ".";
import { Rating } from "../types";
import { RatingDto } from "../types/ratingDto";

const route : string = "api/ratings"

export const createRating = async (rating : RatingDto, jwt : string) => {
  try{
    // console.log("Authorization Header:", config.headers); // Log the authorization header
    const res = await axios.post(`${link}/${route}`,rating,conf(jwt))
    console.log("message", res.statusText);
    console.log(res.data.data);
    return res.data.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getRatings = async (jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}`,conf(jwt))
    console.log(res.data.data);
    return res.data.data as Rating[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const getRating = async (id : string, jwt : string) => {
  try{
    const res = await axios.get(`${link}/${route}/${id}`,conf(jwt))
    console.log(res.data.data);
    return res.data.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const updateRating = async (id : string, rating : Rating, jwt : string) => {
  try{
    const res = await axios.put(`${link}/${route}/${id}`,rating,conf(jwt))
    console.log(res.data.data);
    return res.data.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const deleteRating = async (id : string, jwt : string) => {
  try{
    const res = await axios.delete(`${link}/${route}/${id}`,conf(jwt))
    console.log(res.data.data);
    return res.data.data as Rating
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const artistRatings = async (artistId : string, jwt : string) => {
  try{
    const res = await axios.get(`${link}/api/artist_ratings/${artistId}`,conf(jwt))
    console.log(res.data.data);
    return res.data.data as Rating[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}

export const userRatings = async (userId : string, jwt : string) => {
  try{
    const res = await axios.get(`${link}/api/user_ratings/${userId}`,conf(jwt))
    console.log(res.data.data);
    return res.data.data as Rating[]
  }
  catch(error){
    console.error('Error:', error);
    return null
  }
}