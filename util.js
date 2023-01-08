import { utils } from "ethers";
// import sharp from "sharp";

export const formatIpfdImg = (ipfs) => {
  const CID = ipfs;
  const getCid = CID
    ? CID.split("").slice(7).join("")
    : "bafkreigfkue3cdeve7pa23vvsmp2lcmj32flksdvlrllt44gpl25bqhp6m";
  // `https://${getCid}.ipfs.w3s.link/`
  const url =
    CID?.length === (66 || 53)
      ? // ? "https://ipfs.io/ipfs/" + getCid
        `https://${getCid}.ipfs.w3s.link/`
      : !CID?.length
      ? "https://ipfs.io/ipfs/bafkreigfkue3cdeve7pa23vvsmp2lcmj32flksdvlrllt44gpl25bqhp6m"
      : CID;

  return url;
};

// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
export const truncateEthAddress = (address) => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const convertBase64 = (blob) => {
  console.log(blob, "blov!!!!");
  if (typeof blob == "string") {
    return blob;
  }
  if (!blob) return;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

export const dateFormatter = (date) => {
  if (!date) return "";
  return new Date(date).toDateString();
};

export function splitSignature(signature) {
  return utils.splitSignature(signature);
}

export const wait = (milliseconds = 6000) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// export async function compressImage(img) {
//   try {
//     const compressed = await sharp(img)
//       // .resize({
//       //   width: 150,
//       //   height: 97
//       // })
//       .toFormat("jpeg", { mozjpeg: true });
//     return compressed;
//   } catch (error) {
//     console.log(error);
//   }
// }

export const deepCopy = (obj = {}) => {
  return JSON.parse(JSON.stringify(obj));
};

// export const checkUseStatus = (address) => {
//   if (!address) return;
//   const rawData = localStorage.getItem("profilePendingNew");
//   const isPending = JSON.parse(rawData);
//   const currentUser = isPending.find((i) => i.address == address);
//   return currentUser?.isPending ?? false;
// };
