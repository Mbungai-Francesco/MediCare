export interface RatingDto{
  userId       :     string       // @db.ObjectId
  rate         :     number          // @default(0)
  artistId     :     string       // @db.ObjectId 
}