import axios from "axios";
import { useRuntimeConfig } from "#app";

export async function storeNFT(image) {
  const key = useRuntimeConfig();
  console.log(image);
  const nftImage = await axios.post("https://api.web3.storage/upload", image, {
    headers: {
      Authorization: `Bearer ${key.public.web3StorageKey}`,
      Accept: "application/json",
    },
  });

  return nftImage.data.cid;
}
