<template>
  <div>
    <!---------------- NAVBAR ---------------->

    <main>
      <form>
        <div class="d-flex justify-content-between container mt-4">
          <div>
            <img src="@/images/storytribe.svg" alt="sotry logo" />
          </div>

          <div class="d-flex">
            <NuxtLink to="/blogs">
              <button type="button" class="btn btn-primary" id="post1">
                Cancel
              </button>
            </NuxtLink>

            <!-- <button  class="btn btn-primary ml-2" id="post3"
          type="submit"
            >
          
              Publish
            
            </button> -->

            <b-button @click="togglePublishModal" class="create-btn">
              Publish</b-button
            >

            <b-modal v-model="publishModal" title="You’re now publishing">
              <div v-if="errorPublishing" class="text-center">
                Error try again
              </div>

              <!-- <div class="">
                  <h3></h3>
                  </div> -->
              <div class="text-center">
                <b-button class="create-btn text-center" @click="postData">
                  {{ isPublishing ? "Publishing" : "Publish" }}
                </b-button>
              </div>
              <!-- <b-button  class="create-btn text-center" @click="postData"> Publish</b-button> -->

              <template #modal-footer>
                {{ "" }}
              </template>
            </b-modal>
          </div>
        </div>

        <div class="container first-class">
          <GenerateImg />
          <upload @change="uploadImage" />

          <div class="my-4">
            <img
              class="img-fluid"
              :src="store.currentCoverImage"
              v-if="store.currentCoverImage"
            />
          </div>

          <label for="blog-title"
            ><input
              v-model="publishContent.data.content"
              type="text"
              placeholder="Add Title"
          /></label>
          <hr id="down" />
          <span class="large"><i class="uil uil-text"></i></span>
          <span class="large"><i class="uil uil-bold"></i></span>
          <span class="large"><i class="uil uil-italic"></i></span>
          <span class="large"><i class="uil uil-link"></i></span>
          <span class="large"><i class="uil uil-globe"></i></span>
          <span class="large"><i class="uil uil-scenery"></i></span>
          <hr />

          <label for="tell-story" class="tell">
            <b-form-textarea
              v-model="publishContent.data.description"
              type="text"
              rows="4"
            />
          </label>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { publishPost, clientId } from "../../api.js";
import { storeNFT } from "../../upload.js";
import { defaultProfile, userAccessToken } from "../../store";
import { ethers } from "ethers";
import { splitSignature } from "../../util";
import LENSHUB from "../../config/lens.json";
import { wait } from "../../helpers";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { LENS_HUB_CONTRACT_ADDRESS } from "../../config/constant";
import { toggleCreateImgModal } from "../../store/modalRef";
import { useAppStore } from "../../store/app";
import { convertBase64 } from "~/util";

import "@/styles/create.css";

export default {
  layout: "no-sidebar",
  setup() {
    const store = useAppStore();
    const showImg = ref("");
    const crudStatus = ref("");
    const imageRef = ref("");
    const signer = ref("");
    const errorPublishing = ref(false);
    const isPublishing = ref(false);
    const showCreateImgModal = ref(false);
    const coverImageLabel = ref("");

    const publishModal = ref(false);
    const togglePublishModal = () => {
      publishModal.value = !publishModal.value;
    };

    const prevUploadImg = `Change <svg
                class="ml-2"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M864 260H728l-32.4-90.8a32.07 32.07 0 0 0-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 1 0 192 0 96 96 0 1 0-192 0z"
                ></path>
              </svg>`;

    const router = useRouter();
    onMounted(() => {
      const signerOrProvider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      signer.value = signerOrProvider?.getSigner();
    });
    const publishContent = reactive({
      data: {
        fileCid: "",
        imageCid: "",
        content: "",
        description: "",
      },
    });

    const uploadImage = async (values) => {
      imageRef.value = values.target.files[0];
      const base64 = await convertBase64(imageRef.value);
      store.setCoverImage(base64);
    };

    const postData = async () => {
      errorPublishing.value = false;

      isPublishing.value = true;

      try {
        crudStatus.value = "image upload in progress...";
        let imageUpload;

        if (imageRef.value) {
          imageUpload = await storeNFT(imageRef.value);
        }

        const jsonData = {
          version: "2.0.0",
          mainContentFocus: "TEXT_ONLY",
          metadata_id: uuidv4(),
          description: publishContent.data.description,
          locale: "en-US",
          content: publishContent.data.content,
          external_url: null,
          image: `ipfs//:${imageUpload ? imageUpload : "0x0"}`,
          imageMimeType: "text/html",
          name: "Name",
          attributes: [],
          tags: ["using_api_examples"],
          appId: "api_examples_github",
        };

        crudStatus.value = "uploading content...";
        const file = await storeNFT(jsonData);
        crudStatus.value = "Almost done";

        const signerOrProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signer = signerOrProvider?.getSigner();

        const refreshToken = localStorage.getItem("storybiteRefreshToken");
        const { id, ownedBy, ...others } = JSON.parse(
          localStorage.getItem("storyDefaultProfile")
        );

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

        const contract = new ethers.Contract(
          LENS_HUB_CONTRACT_ADDRESS,
          LENSHUB,
          signer
        );

        await wait(10000);
        const dataAvailable = await axios.get(`
      https://ipfs.io/ipfs/${file}`);
        // console.log("dataAvailable", dataAvailable)
        const tx = await contract.post({
          profileId: typedData.value.profileId,
          contentURI: `ipfs://${file}`,
          collectModule: typedData.value.collectModule,
          collectModuleInitData: typedData.value.collectModuleInitData,
          referenceModule: typedData.value.referenceModule,
          referenceModuleInitData: typedData.value.referenceModuleInitData,
        });
        await tx.wait();

        router.push(`/profile/${ownedBy}`);
      } catch (error) {
        console.log("error", error);
      } finally {
        isPublishing.value = false;
      }
    };

    return {
      togglePublishModal,
      publishModal,
      showImg,
      uploadImage,
      publishContent,
      postData,
      crudStatus,
      imageRef,
      isPublishing,
      errorPublishing,
      toggleCreateImgModal,
      showCreateImgModal,
      store,
      coverImageLabel,
    };
  },
};
</script>

<style>
.create-btn {
  background: #0c2acb;
}
</style>
