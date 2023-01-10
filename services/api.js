import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import {
  publishPost,
  addReactionMutation,
  clientId,
  whoReactedQuery,
} from "~/api.js";
import LENSHUB from "~/config/lens.json";
import { storeNFT } from "~/upload";
import { LENS_HUB_CONTRACT_ADDRESS, baseUrl } from "~/config/constant";
import axios from "axios";
import { deepCopy } from "~~/util";

export const preparePost = async (file) => {
  const refreshToken = localStorage.getItem("myStoryRefreshToken");
  const data = JSON.parse(localStorage.getItem("storyDefaultProfile"));
  if (!data?.id) {
    throw new Error("You must create an account to create post");
  }
  try {
    const resp = await clientId.request(
      publishPost,
      {
        id: data.id,
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
    throw "Something went wrong";
  }
};

export const uploadContent = async (data) => {
  const { imageUpload, description, content, tags } = data;
  const jsonData = {
    version: "2.0.0",
    mainContentFocus: "ARTICLE",
    metadata_id: uuidv4(),
    description,
    locale: "en-US",
    content,
    external_url: null,
    image: `https://${imageUpload ? imageUpload : "0x0"}.ipfs.w3s.link/`,
    imageMimeType: "image/png",
    name: "Name",
    media: [
      {
        // item: `https://ipfs.io/ipfs/${imageUpload ? imageUpload : "0x0"}`,
        item: `https://${imageUpload ? imageUpload : "0x0"}.ipfs.w3s.link/`,
        type: "image/png",
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
    throw new Error("Something went wrong");
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

export const userApi = async (address, method = "GET") => {
  const url = `${baseUrl}user/${address}`;
  const response = await sendTokenRequest(url, method);
  return response?.data?.status;
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
