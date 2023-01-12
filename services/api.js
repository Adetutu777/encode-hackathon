import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import * as PushAPI from "@pushprotocol/restapi";
import {
  publishPost,
  addReactionMutation,
  clientId,
  whoReactedQuery,
} from "~/api.js";
import LENSHUB from "~/config/lens.json";
import { storeNFT } from "~/upload";
import {
  LENS_HUB_CONTRACT_ADDRESS,
  baseUrl,
  channelAddress,
} from "~/config/constant";
import axios from "axios";
import { deepCopy, slugify } from "~~/util";

export const preparePost = async (file, id) => {
  const refreshToken = localStorage.getItem("myStoryRefreshToken");
  const data = JSON.parse(localStorage.getItem("storyDefaultProfile"));
  if (!data?.id) {
    throw new Error("You must create an account to create post");
  }
  try {
    const resp = await clientId.request(
      publishPost,
      {
        id,
        uri: `ipfs://${file}`,
      },
      {
        ["x-access-token"]: refreshToken,
      }
    );
    const typedData = resp.createPostTypedData.typedData;
    return typedData;
  } catch (error) {
    const res = JSON.parse(JSON.stringify(error));
    const notAuthorized = res?.response?.errors;
    if (notAuthorized?.[0]?.["message"].includes("not authenticated")) {
      throw new Error("Not Authorized, Please login to create post");
    }
    throw res;
  }
};

export const prepareVideo = async (name) => {
  try {
    const response = await axios.get(`/api/prepare-video/${slugify(name)}`);
    return response?.data;
  } catch (e) {
    new Error(e);
  }
};
export const uploadVideo = async (url, data) => {
  try {
    await axios({
      method: "PUT",
      url,
      data,
    });
  } catch (e) {
    console.log(e, "error uploadin");
    throw new Error(e);
  }
};

export const uploadContent = async (data) => {
  const { assetUrl, description, content, tags, type = "ARTICLE" } = data;
  const jsonData = {
    version: "2.0.0",
    mainContentFocus: type,
    metadata_id: uuidv4(),
    description,
    locale: "en-US",
    content,
    external_url: null,
    ...(type == "ARTICLE" && {
      image: `https://${assetUrl ? assetUrl : "0x0"}.ipfs.w3s.link/`,
      imageMimeType: "image/png",
    }),
    name: "Name",
    media: [
      {
        item:
          type == "ARTICLE"
            ? `https://${assetUrl ? assetUrl : "0x0"}.ipfs.w3s.link/`
            : assetUrl,
        type: type == "ARTICLE" ? "image/png" : "video/mp4",
      },
    ],
    attributes: [],
    tags,
    appId: "chain_write_article",
  };

  try {
    const file = await storeNFT(jsonData);
    return file;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = async (typedData, file) => {
  const signerOrProvider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = signerOrProvider?.getSigner();
  const contract = new ethers.Contract(
    LENS_HUB_CONTRACT_ADDRESS,
    LENSHUB,
    signer
  );

  try {
    const tx = await contract.post({
      profileId: typedData.value.profileId,
      contentURI: `ipfs://${file}`,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
    });
    const trx = await tx.wait();

    return trx;
  } catch (e) {
    const res = JSON.parse(JSON.stringify(e));

    if (res.code === "ACTION_REJECTED") {
      throw new Error(res.reason);
    }
    throw new Error(res);
  }
};

export const interactWithPost = async (data) => {
  // const reaction = clientId.
  const refreshToken = localStorage.getItem("myStoryRefreshToken");

  try {
    const addReaction = await clientId.request(addReactionMutation, data, {
      ["x-access-token"]: refreshToken,
    });
    return addReaction;
  } catch (e) {
    const errors = deepCopy(e);
    console.log("error reaction", errors);
    throw errors;
  }
};

export const whoReactedPub = async (publications = []) => {
  try {
    const postIds = Promise.all(
      publications.map(async (i) => {
        const whoReacted = await clientId.request(whoReactedQuery, {
          publicationId: i,
        });
        return whoReacted;
      })
    );
    return postIds;
  } catch (e) {
    console.log("error", e);
  }
};

export const sendTokenRequest = async (url, method = "GET", data) => {
  const token = localStorage.getItem("myStoryRefreshToken");
  const instance = axios.create({
    // timeout: 1000,
    headers: { Authorization: "Bearer " + token },
  });
  try {
    const response = await instance({ method, url, data });
    return response;
  } catch (e) {
    console.log(e, "error!!!");
    throw e;
  }
};

export const userApi = async (address, method = "GET", data) => {
  const url = `${baseUrl}user/${address}`;
  const response = await sendTokenRequest(url, method, data);
  return response?.data;
};

export const addPost = async (id) => {
  const url = `${baseUrl}post/${id}`;
  const response = await sendTokenRequest(url, "POST");
  console.log(response);
  return response?.data;
};

export const getPosts = async () => {
  const url = `${baseUrl}post}`;

  try {
    const response = await axios.get(baseUrl + "post");
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const deletePost = async (id) => {
  const url = `${baseUrl}post}/${id}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const optinForNot = async (address) => {
  const _signer = new ethers.providers.Web3Provider(window.ethereum);
  await PushAPI.channels.subscribe({
    signer: _signer,
    channelAddress: `eip155:80001:${channelAddress}`, // channel address in CAIP
    userAddress: `eip155:80001:${address}`, // user address in CAIP
    onSuccess: () => {
      console.log("opt in success");
    },
    onError: (e) => {
      console.error("opt in error", e);
      console.log(e, "error optin");
    },
    env: "staging",
  });
};
export const optOutForNot = async (address) => {
  const _signer = new ethers.providers.Web3Provider(window.ethereum);
  console.log(_signer, "siner+++++");
  const channelData = await PushAPI.channels.getChannel({
    channel: "eip155:80001:0x1049DCFE27985721FB103D22076266377381EC7D", // channel address in CAIP
    env: "staging",
  });
  console.log(channelData, "data cnalle");

  await PushAPI.channels.unsubscribe({
    signer: _signer,
    channelAddress: `eip155:80001:${channelAddress}`, // channel address in CAIP
    userAddress: `eip155:80001:${address}`, // user address in CAIP
    onSuccess: () => {
      console.log("opt out success");
    },
    onError: (e) => {
      console.error("opt out error", e);
      console.log("opt out error lo", e);
    },
    env: "staging",
  });
};
export const sendNofication = () => {};
export const receiveNotification = () => {};
