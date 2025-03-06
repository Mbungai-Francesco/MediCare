import { Rating } from "./rating"
import { User } from "./user"

export interface Artist{
  id              :  string       // @id @default(auto()) @map("_id") @db.ObjectId
  image           ?:  string       
  name            :  string       
  stageName       :  string       // @unique  
  numOfAlbums     :  number          // @default(0)
  rate            ?:  number
  ratings         :  Rating[]  
  mediaLinks      :  string[]
  recordLabel     :  string
  publishingHouse :  string
  startDate       :  Date
  followers       :  User[]       // @relation(fields: [followerIds], references: [id])
  followerIds     :  string[]     // @db.ObjectId
  createdAt       :  Date     // @default(now())
  updatedAt       :  Date     // @updatedAt
}