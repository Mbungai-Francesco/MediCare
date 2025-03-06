import { Artist } from "./artist"

export interface Rating{
  id           :     string       // @id @default(auto()) @map("_id") @db.ObjectId
  artistId     :     string       // @db.ObjectId 
  artist       :     Artist       // @relation(fields: [artistId], references: [id], onDelete: Cascade)
  userId       :     string       // @db.ObjectId
  rate         :     number          // @default(0)
  createdAt    :     Date     // @default(now())
  updatedAt    :     Date     // @updatedAt
}