import { User } from "./user"

export interface Response{
  message : string
  token : string
  data : User
}