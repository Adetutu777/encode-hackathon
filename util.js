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

export const prettifyUsername = (username) => {
  if (!username) return;
  return username.split(".")?.[0];
};
export const deepCopy = (obj = {}) => {
  return JSON.parse(JSON.stringify(obj));
};

export const slugify = (string) => {
  const newText = string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  return newText;
};

// export const checkUseStatus = (address) => {
//   if (!address) return;
//   const rawData = localStorage.getItem("profilePendingNew");
//   const isPending = JSON.parse(rawData);
//   const currentUser = isPending.find((i) => i.address == address);
//   return currentUser?.isPending ?? false;
// };

export function getVideoCover(file, seekTo = 0.5) {
  console.log("getting video cover for file: ", file);
  return new Promise((resolve, reject) => {
    const videoPlayer = document.createElement("video");
    videoPlayer.setAttribute("src", URL.createObjectURL(file));
    videoPlayer.load();
    videoPlayer.addEventListener("error", (ex) => {
      reject("error when loading video file", ex);
    });
    // load metadata of the video to get video duration and dimensions
    videoPlayer.addEventListener("loadedmetadata", () => {
      // seek to user defined timestamp (in seconds) if possible
      if (videoPlayer.duration < seekTo) {
        reject("video is too short.");
        return;
      }
      // delay seeking or else 'seeked' event won't fire on Safari
      setTimeout(() => {
        videoPlayer.currentTime = seekTo;
      }, 200);
      // extract video thumbnail once seeking is complete
      videoPlayer.addEventListener("seeked", () => {
        console.log("video is now paused at %ss.", seekTo);
        // define a canvas to have the same dimension as the video
        const canvas = document.createElement("canvas");
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;
        // draw the video frame to canvas
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        // return the canvas image as a blob
        ctx.canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.75 /* quality */
        );
      });
    });
  });
}
