<template>
  <div class="container mt-3">
    <profileId />

    <b-modal v-model="isCreating" title="Creating Post ">
      <div class="m-auto text-center">
        <div v-if="creationError" class="text-center">
          😥 {{ creatingStatus }}
          <div>
            <button class="my-2 btn-general mt-4" @click="tryAgain">
              Try again
            </button>
          </div>
        </div>

        <div v-if="!creationError">
          <div v-if="!isSuccess">
            <loader />
          </div>
          <div v-if="isSuccess">Created Successfully</div>
          <div class="mt-2">
            {{ creatingStatus }}
          </div>
        </div>
      </div>
    </b-modal>
    <div class="mx-auto text-center" v-if="!assetType">
      <div class="h3 mt-4 mb-4">What type of Content Are you Creating</div>
      <div class="d-flex justify-content-center mt-3">
        <div class="border w-25 text-center mx-2">
          <button
            @click="() => setAssetType('ARTICLE')"
            class="w-100 text-center p-2 btn-draft rounded-0"
          >
            Article
          </button>
        </div>
        <div class="border w-25 text-center mx-2">
          <button
            @click="() => setAssetType('VIDEO')"
            class="w-100 text-center p-2 btn-draft rounded-0"
          >
            Video
          </button>
        </div>
      </div>
    </div>
    <form @submit.prevent="postData" v-if="assetType">
      <div class="container">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-sm-8">
            <div cass="container">
              <button
                class="block-btn"
                style="border: none"
                @click.prevent="$router.push('/blogs')"
              >
                <span class="img-resize">&#128281;</span>
              </button>

              <div class="my-3">
                <div class="mb-2">Post Type: {{ assetType }}</div>
                <button @click="resetPostType" class="btn-draft">
                  Reset Post Type
                </button>
              </div>
              <!-- <video-player :options="videoOptions" /> -->
            </div>
            <div v-if="assetType == 'ARTICLE'">
              <GenerateImg />
            </div>
            <div class="card pt-3">
              <div class="card-body">
                <upload
                  @change="uploadImage"
                  :labelText="labelText"
                  :iconType="iconType"
                />
                <div class="add-title mt-4">
                  <input
                    type="text"
                    v-model="title"
                    placeholder="Add title"
                    class="w-100 border-0 text-title"
                  />
                  <div class="d-flex">
                    <div v-for="(tag, index) in tags" :key="index">
                      <button class="btn border rounded cancel-btn">
                        {{ tag.value }}
                        <span class="ml-2" @click="removeTag(tag.id)">x</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="add-tag mt-4 d-flex">
                  <input
                    ref="tagInput"
                    type="text"
                    v-model="tag"
                    placeholder="Add tags max. of 3"
                    class="w-100 p-2"
                  />
                  <b-button
                    type="button"
                    class="btn-general"
                    @click="enterTag"
                    squared
                    >Enter
                  </b-button>
                </div>
                <!-- write post -->
                <div class="mt-2">
                  <b-form-textarea
                    id="textarea"
                    v-model="text"
                    placeholder="Write your sweet post here ..."
                    rows="6"
                    max-rows="10"
                  ></b-form-textarea>
                </div>
              </div>
            </div>
            <div class="d-flex mt-3 pb-4">
              <button type="submit" class="mr-2 btn-publish btn-general">
                Publish
              </button>

              <button type="button" @click="saveDraft" class="btn-draft">
                Save to drafts
              </button>
            </div>
          </div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store/app";
import { convertBase64, wait } from "~/util";
import {
  createPost,
  uploadContent,
  preparePost,
  uploadVideo,
  prepareVideo,
} from "~/services/api";
import { truncateEthAddress } from "~/util";
import { storeNFT } from "~/upload";
import axios from "axios";
import { login } from "~/services/connect";
const router = useRouter();
const store = useAppStore();
const tags = ref([]);
const tag = ref("");
const title = ref("");
const text = ref("");
const currentId = ref(0);
const uploadIm = computed(() => store.currentCoverImage);
const isCreating = ref(false);
const creatingStatus = ref("Initializing");
const creationError = ref(false);
const isSuccess = ref(false);
const route = useRoute();
const drafts = computed(() => store.drafts);
const editId = computed(() => route.query.id);
const currentStoreId = computed(() => store.currentDraftId);
const currentUser = store.userAddress;

let currentDraftId = editId.value ? +editId.value : +currentStoreId.value + 1;

const videoOptions = {
  autoplay: true,
  controls: true,
  fluid: true,
  sources: [
    {
      src: "https://lp-playback.com/hls/5401pcadtee2yraw/video",
      type: "video/mp4",
    },
  ],
};

onMounted(() => {
  if (editId.value) {
    const draft = drafts.value.find((item) => item.id == editId.value);
    title.value = draft?.title;
    tags.value = draft?.tags ?? [];
    text.value = draft?.text;
    uploadIm.value = draft?.image;
  } else {
    router.push(`/post/createstory?id=${currentDraftId}`);
  }
});

const resetPostType = () => {
  assetType.value = "";
};
const setAssetType = (type) => {
  assetType.value = type;
};
const enterTag = () => {
  tag.value = tag.value.trim();
  if (tag.value.length > 0 && tags.value.length < 3) {
    currentId.value = currentId.value + 1;
    tags.value.push({ id: currentId.value, value: tag.value });
    tag.value = "";
  }
};

const removeTag = (id) => {
  tags.value = tags.value.filter((item) => item.id !== id);
};

const assetType = ref();

const labelText = computed(() => {
  return assetType.value == "ARTICLE" ? "Add Cover" : " Video";
});

const iconType = computed(() => {
  const image = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path><path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"></path></svg>`;
  const video = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path><path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path><path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z"></path></svg>`;
  return assetType.value == "ARTICLE" ? image : video;
});

const uploadImage = async (e) => {
  const file = e.target.files[0];
  store.setCoverImage(file);
};

const mockData = async () => {
  // await storeFiles(uploadIm.value);
};

const saveDraft = async () => {
  const findDraft = drafts.value.find((item) => item.id == editId.value);
  const userDraft = {
    id: currentDraftId,
    title: title.value,
    tags: tags.value,
    text: text.value,
    image: uploadIm.value,
  };

  await store.setCurrentDraftId(currentDraftId);
  await store.saveDraft(userDraft);
  router.push("/draft");
};

let fileCID;

const resetForm = () => {
  tags.value = [];
  title.value = "";
  text.value = "";
  if (creatingStatus.value == "Hurray  Post created 🤗") {
    store.currentCoverImage = "";
    store.deleteDraft(currentDraftId.value);
  }
};

onUnmounted(() => {
  resetForm();
});

const postData = async () => {
  // currentUserStatus
  isCreating.value = true;
  creationError.value = false;
  let img = uploadIm.value;

  try {
    creationError.value = false;
    creatingStatus.value = "Initializing";
    const statusUser = store.currentUserStatus;

    if (statusUser == 1) {
      creationError.value = true;
      creatingStatus.value = "Please Wait, Your Account is still Pending";
      return;
    }

    // if (statusUser == 0) {
    //   creationError.value = true;
    //   creatingStatus.value = "You need to create an account";
    //   return;
    // }

    if (img && !fileCID && assetType.value == "ARTICLE") {
      // uploading image to IPFS
      creatingStatus.value = "Uploading image to IPFS";
      img = await storeNFT(img);
    }
    if (img && assetType.value == "VIDEO") {
      // uploading video to livePeer
      creatingStatus.value = "Uploading Video to LivePeer";
      const { url, playBackId } = await prepareVideo(img.name);
      await uploadVideo(url, img);
      img = `https://lp-playback.com/hls/${playBackId}/video`;
    }
    const tagFull = JSON.parse(JSON.stringify(tags.value));

    const data = {
      content: title.value, // main body of the post
      tags: tagFull.map((item) => item.value),
      description: text.value, // title of te post
      assetUrl: img,
      type: assetType.value,
    };

    if (!fileCID) {
      // uploading post to IPFS
      creatingStatus.value = "Uploading post to IPFS";
      const uploadedContent = await uploadContent(data);
      fileCID = uploadedContent;
    }

    // preparing post
    creatingStatus.value = "Preparing post";
    const prepare = await preparePost(fileCID);

    creatingStatus.value = "Almost done, Please wait";
    await wait(10000);

    const [p1] = await Promise.all([
      axios.get(`https://ipfs.io/ipfs/${fileCID}`),
    ]);
    creatingStatus.value = "Creating post";

    const res = await createPost(prepare, fileCID);
    isSuccess.value = true;
    creatingStatus.value = "Hurray  Post created 🤗";

    setTimeout(() => {
      resetForm();
      // window.location.href = `/profile/${store.userAddress}`;
      // router.push(`/profile/${store.userAddress}`);
      router.push(`/blogs`);
    }, 3000);
  } catch (err) {
    creationError.value = true;
    creatingStatus.value = err?.message ?? "Something went wrong";

    // if (store.isPending) {
    //   creatingStatus.value = "Please Wait, Your Account is still Pending";
    // }
  } finally {
  }
};

const tryAgain = async () => {
  if (creatingStatus.value.toLowerCase().includes("account to create post")) {
    isCreating.value = false;
    // await login();
    return;
    // return postData();
  }
  if (creatingStatus.value.toLowerCase().includes("not authorized")) {
    isCreating.value = false;
    await login();
    return postData();
  }
  postData();
};
</script>

<style scoped>
.btn-publish {
  margin-right: 0.5rem;
}
.cancel-btn {
  margin-left: 0.5rem;
}
.text-title {
  font-size: 2.5rem;
  font-weight: 500;
  padding: 0.3rem;
}
.add-title {
  border: none;
}
.add-title input {
  border: none;
  padding: 1rem 0.5rem;
}

.img-resize {
  font-size: 1.5rem;
}

.block-btn {
  border: none;
  background: #ffffff;
  color: white;
}
</style>
