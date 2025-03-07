
export interface User{
  image: string
  available: boolean
  speciality: string
  id             ?:   string      
  name           :   string
  dateofbirth    ?:   Date
  email          ?:   string      
  phoneNumber       :   number
}