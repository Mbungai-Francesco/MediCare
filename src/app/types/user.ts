import { Artist } from "./artist"

export interface User{
  id             :   string      
  name           :   string
  dateofbirth    :   Date
  email          :   string      
  password       :   string
  followingIds   :   string[]    
  followings     :   Artist[] 
  jwt           ?:   string   
  createdAt      :   Date    
  updatedAt      :   Date  
}