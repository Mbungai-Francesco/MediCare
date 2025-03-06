export interface ArtistDto{
  image           ?:  string       
  name            :  string       
  stageName       :  string       // @unique  
  numOfAlbums     :  number          // @default(0)
  recordLabel     :  string
  publishingHouse :  string
  startDate       :  Date
  mediaLinks      :  string[]
}