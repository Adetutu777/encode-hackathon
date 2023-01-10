<template>
  <div class="">
    <!-- Navbar -->
    <b-modal
      @close="closeModal"
      v-model="errorStatus"
      id="reactionError"
      title="pending profile"
    >
      {{ reactionErrorMsg }}
    </b-modal>

    <div class="">
      <Dashboard>
        <template v-slot:middle>
          <div v-if="!error" class="middle-bar">
            <b-skeleton-wrapper :loading="dataStatus.data.loading">
              <template #loading>
                <div v-for="item in [1, 2, 3, 4, 5]" :key="item">
                  <div>
                    <BlogLoading />
                  </div>
                </div>
              </template>

              <div class="" v-for="item in publications.data" :key="item.id">
                <div class="mb-4 p-3 border rounded bg-white">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="img-icon">
                        <img
                          class="img-top"
                          :src="
                            item?.profile?.coverPicture?.original?.url ??
                            'https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%202.png?raw=true'
                          "
                        />
                      </div>

                      <NuxtLink
                        class="top-icon"
                        :to="`/profile/${item?.profile?.ownedBy}`"
                      >
                        <div class="name-icon">
                          {{ item?.profile?.name }}
                        </div>

                        <div class="date-icon">
                          {{ item?.profile?.handle }} .
                          {{ dateFormatter(item?.createdAt) }}
                        </div>
                      </NuxtLink>
                    </div>

                    <div class="">
                      <!-- <i class="uil uil-book-open"></i> 2mins read -->
                    </div>
                  </div>

                  <h5 class="mt-3" v-if="item?.mainPost?.metadata?.description">
                    <!-- {{ item?.mainPost }} -->
                    {{ item?.mainPost?.metadata?.description?.slice(0, 70) }}...
                  </h5>
                  <div class="crd mx-auto" style="">
                    <div class="card-image">
                      <NuxtLink :to="'/post/' + item?.id">
                        <img
                          :src="
                            item?.metadata?.[0]?.url ?? '@/images/children.jpg'
                          "
                          @error="replaceByDefault"
                        />
                        <!-- <img
                          :src="
                            item?.metadata?.[0]?.url ??
                            'https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%202.png?raw=true'
                          "
                          @error="replaceByDefault"
                        /> -->
                      </NuxtLink>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between pt-1">
                    <div class="" @click="() => savePost(item?.id)">
                      <!-- <i class="uil uil-bookmark icon-footer"></i> -->
                      <!-- <BookMark :selected="item.isSaved" /> -->
                    </div>
                    <div class="d-flex justify-content-between pt-1">
                      <div class="reactions-btn mr-3 d-flex align-items-center">
                        <div
                          @click="
                            () =>
                              reactToPost(
                                'UPVOTE',
                                item.id,
                                item?.stats?.upvotes,
                                item?.stats?.downvotes
                              )
                          "
                        >
                          <ArrowUp :selected="item?.stats?.upIncluded" />
                        </div>
                        <div class="reactions-num">
                          {{ item?.stats?.upvotes?.length }}
                        </div>
                      </div>
                      <div
                        class="reactions-btn mr-3 d-flex align-items-center dislike-btn"
                      >
                        <div
                          @click="
                            () =>
                              reactToPost(
                                'DOWNVOTE',
                                item.id,
                                item?.stats?.upvotes,
                                item?.stats?.downvotes
                              )
                          "
                        >
                          <ArrowDown :selected="item?.stats?.downIncluded" />
                        </div>
                        <div class="reactions-num">
                          {{ item?.stats?.downvotes?.length }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-skeleton-wrapper>
          </div>
          <div
            v-if="dataStatus.data.error"
            class="d-flex align-items-center justify-content-center flex-column"
          >
            <div class="mb-3">
              {{ dataStatus.data.errorMsg }}
            </div>
            <button class="btn-draft" @click="userQuery">try again</button>
          </div>
        </template>

        <template v-slot:right>
          <div clss="right-bar p-4">
            <h4 class="pb-5">Latest</h4>
            <div class="right-side">
              <div class="">
                <div>
                  <div class="p-2 d-inline-block trending mb-4">Blockchain</div>
                </div>

                <div>
                  <div class="p-2 d-inline-block trending mb-4">USDC token</div>
                </div>
                <div>
                  <div class="p-2 d-inline-block trending mb-4">World Cup</div>
                </div>
                <div>
                  <div class="p-2 d-inline-block trending mb-4">NFTs</div>
                </div>
              </div>
            </div>

            <!-- <NuxtLink to="/post/create" class="dropdown-two">
              <button class="mt-5 btn-show mx-auto d-flex">Show more</button>
            </NuxtLink> -->
          </div>
        </template>
      </Dashboard>
    </div>
  </div>
</template>

<script>
import { clientId, exploreQuery, userFeedQuery } from "../../api";
import { formatIpfdImg, dateFormatter, deepCopy } from "@/util";
import { defaultProfile } from "../../store";
import { useAppStore } from "~/store/app";
import {
  interactWithPost,
  whoReactedPub,
  addPost,
  getPosts,
  deletePost,
} from "~/services/api";

export default {
  layout: "no-sidebar",
  setup() {
    const loading = ref(true);
    const ethWindowObj = ref("");
    const signerOrProvider = ref("");
    const isConnected = ref(false);
    const userAddress = ref("");
    const getProfiles = reactive({
      data: {},
    });
    const publications = reactive({
      data: {},
    });
    const dataStatus = reactive({
      data: {
        data: [],
        loading: true,
        error: false,
        errorMsg: "",
      },
    });
    const store = useAppStore();
    const user = store.currentUser;

    const userProfile = store.currentUser?.id;
    // console.log(store.currentUser);
    const addActiveClass = (array = []) => {
      const isIncluded = array.some((i) => i.profile.id == userProfile);
      return isIncluded;
    };

    onMounted(() => {
      signerOrProvider.value = window.ethereum;
      userQuery();
    });

    const savePost = async (id) => {
      if (id) return;
      let isSaved = publications.data.some((i) => i.id == id);
      const currentIndex = publications.data.findIndex((i) => i.id == id);
      const prevData = deepCopy(publications.data);
      const tempData = deepCopy(publications.data);
      const currentItem = tempData[currentIndex];
      currentItem.isSaved = isSaved ? false : true;

      tempData[currentIndex] = currentItem;
      publications.data = tempData;
      console.log(currentItem, "current item");

      try {
        const response = await addPost(currentItem.id);
        // console.log(response);
      } catch (e) {
        publications.data = prevData;
        //console.log(e, "error savin");
      }
    };

    const errorStatus = ref(false);
    const reactionErrorMsg = ref("");

    const closeModal = () => {
      reactionErrorMsg.value = "";
      errorStatus.value = false;
    };

    const reactToPost = async (
      typeOfReaction,
      publicationId,
      upVotesReactions,
      downVotesReactions
    ) => {
      // console.log("label", store.currentUserStatus);
      if (store.currentUserStatus == 1) {
        reactionErrorMsg.value =
          "Pls wait while your pending account get activated on Lens";
        errorStatus.value = true;
        return;
      }
      if (store.currentUserStatus == 0) {
        reactionErrorMsg.value = "You  need to create an first";
        errorStatus.value = true;
        return;
      }
      const data = {
        profileId: store.currentUser?.id,
        publicationId,
        reaction: typeOfReaction,
      };
      let tempData = deepCopy(publications.data);
      const prevData = deepCopy(publications.data);
      const findIndex = tempData.findIndex((i) => i.id == publicationId);
      let currentItem = tempData[findIndex];
      // console.log(currentItem, "current item");

      let upIncluded = currentItem.stats.upvotes.some(
        (i) => i.profile.id == userProfile
      );

      let downIncluded = currentItem.stats.downvotes.some(
        (i) => i.profile.id == userProfile
      );

      if (upIncluded && typeOfReaction == "UPVOTE") {
        return;
      }
      if (downIncluded && typeOfReaction == "DOWNVOTE") {
        return;
      }

      if (typeOfReaction === "UPVOTE") {
        let upvotes = upIncluded
          ? currentItem.stats.upvotes
          : [
              ...currentItem.stats.upvotes,
              { profile: store.currentUser, reaction: "UPVOTE" },
            ];

        let downvotes = downIncluded
          ? currentItem.stats.downvotes.filter((i) => {
              return i.profile.id != userProfile;
            })
          : currentItem.stats.downvotes;
        tempData[findIndex] = {
          ...currentItem,
          stats: {
            ...currentItem.stats,
            upvotes,
            downvotes,
            downIncluded: downvotes.some((i) => i.profile.id == userProfile),
            upIncluded: upvotes.some((i) => i.profile.id == userProfile),
          },
        };
        publications.data = tempData;
      }

      if (typeOfReaction === "DOWNVOTE") {
        let downvotes = downIncluded
          ? currentItem.stats.downvotes
          : [
              ...currentItem.stats.downvotes,
              { profile: store.currentUser, reaction: "DOWNVOTE" },
            ];

        let upvotes = upIncluded
          ? currentItem.stats.upvotes.filter((i) => {
              return i.profile.id != userProfile;
            })
          : currentItem.stats.upvotes;
        tempData[findIndex] = {
          ...currentItem,
          stats: {
            ...currentItem.stats,
            upvotes,
            downvotes,
            downIncluded: downvotes.some((i) => i.profile.id == userProfile),
            upIncluded: upvotes.some((i) => i.profile.id == userProfile),
          },
        };
        publications.data = tempData;
      }

      try {
        const post = await interactWithPost(data);
      } catch (e) {
        publications.data = prevData;
      }
    };

    const userQuery = async () => {
      dataStatus.data.error = false;
      dataStatus.data.errorMsg = "";
      dataStatus.data.loading = true;
      try {
        const explorer = await clientId.request(exploreQuery);
        const posts = await getPosts();
        // console.log(userProfile, "user profile");
        const mappedData = explorer?.explorePublications?.items
          ?.filter((i) => i.__typename == "Post")
          .map((i) => {
            const dataMap = i?.metadata?.media?.map((j) => {
              return { ...j, url: formatIpfdImg(j?.original?.url) };
            });
            return {
              ...i,
              isSaved: posts.data.some((k) => k.postId == i.id),
              metadata: dataMap,
            };
          });
        publications.data = mappedData ?? publications.data;
        const mappedArr = mappedData.map((i) => i.id);
        const reactionData = await whoReactedPub(mappedArr);
        publications.data = publications.data.map((i, index) => {
          let upvotes = reactionData[
            index
          ]?.whoReactedPublication?.items?.filter(
            (i) => i.reaction == "UPVOTE"
          );

          let downvotes = reactionData[
            index
          ]?.whoReactedPublication?.items?.filter(
            (i) => i.reaction == "DOWNVOTE"
          );

          let downIncluded = addActiveClass(downvotes);
          let upIncluded = addActiveClass(upvotes);
          return {
            ...i,
            stats: {
              ...i.stats,
              upvotes,
              downvotes,
              downIncluded,
              upIncluded,
            },
          };
        });

        dataStatus.data.loading = false;
      } catch (error) {
        dataStatus.data.error = true;
        dataStatus.data.errorMsg = "Error Fetching Data";
        console.log("error", error);
      }

      dataStatus.data.loading = false;
    };

    const replaceByDefault = (e) => {
      e.target.src =
        "https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%206.png?raw=true";
    };
    return {
      loading,
      getProfiles,
      isConnected,
      userAddress,
      publications,
      replaceByDefault,
      dateFormatter,
      defaultProfile,
      reactToPost,
      addActiveClass,
      dataStatus,
      savePost,
      errorStatus,
      reactionErrorMsg,
      closeModal,
      userQuery,
    };
  },
};
</script>

<style>
.aa {
  margin-bottom: 1rem;
}

.dislike-btn {
  margin-left: 1rem !important;
}

.reactions-btn {
  margin-left: 0.2rem;
}

.reactions-num {
  margin: 0 0.3rem;
}

.active-post {
  pointer-events: none;
  background-color: #f2f2f2;
  border: 1px solid #f2f2f2;
}

.skeleton-avatar {
  padding-right: 1rem;
}
</style>
