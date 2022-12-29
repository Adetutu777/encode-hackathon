import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { publishPost, clientId } from "~/api.js";
import LENSHUB from "~/config/lens.json";
import { storeNFT } from "~/upload";
import { LENS_HUB_CONTRACT_ADDRESS } from "~/config/constant";

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
    mainContentFocus: "TEXT_ONLY",
    metadata_id: uuidv4(),
    description,
    locale: "en-US",
    content,
    external_url: null,
    image: `ipfs//:${imageUpload ? imageUpload : "0x0"}`,
    imageMimeType: "text/html",
    name: "Name",
    attributes: [],
    tags,
    appId: "api_examples_github",
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
