import axios from "axios";

const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAwYkJGNzgyMjE0YTJiNzY0MkYzNzMzNThiNTI1NkU0YjlBQ0NDQmUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2OTk5MDA5MDU4MywibmFtZSI6ImxlbnMtYXBpLWtleSJ9.oxmZJQfNBnu_Weg1hLTxQpI9SbuPBN9-if92WJq_FCU";

export async function storeNFT(image) {
  const nftImage = await axios.post("https://api.nft.storage/upload", image, {
    headers: {
      Authorization: `Bearer ${NFT_STORAGE_KEY}`,
      Accept: "application/json",
    },
  });

  return nftImage.data.value.cid;
}
