<template>
  <div class="">
    <!-- Navbar -->

    <div class="">
      <Dashboard>
        <template v-slot:middle>
          <div class="middle-bar">
            <b-skeleton-wrapper :loading="dataStatus.data.loading">
              <template #loading>
                <div v-for="item in [1, 2, 3, 4, 5]" >
                  <b-card class="mb-4">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex">
                        <div class="mr-4 pr-2 skeleton-avatar">
                          <b-skeleton type="avatar"></b-skeleton>
                        </div>
                        <div>
                          <b-skeleton width="2rem"></b-skeleton>
                          <b-skeleton width="4rem"></b-skeleton>
                        </div>
                      </div>
                      <b-skeleton width="30%"></b-skeleton>
                    </div>
                    <div class="mt-2">
                      <b-skeleton width="100%" height="10rem"></b-skeleton>
                    </div>
                    <div class="d-flex mt-2 justify-content-between">
                      <b-skeleton width="2rem"></b-skeleton>
                      <b-skeleton width="6rem"></b-skeleton>
                    </div>
                  </b-card>
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
                        class="top-icon pb-2"
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
                      <i class="uil uil-book-open"></i> 2mins read
                    </div>
                  </div>

                  <h5 class="mt-3" v-if="item?.mainPost?.metadata?.description">
                    {{ item?.mainPost?.metadata?.description?.slice(0, 70) }}...
                  </h5>
                  <div class="crd mx-auto" style="">
                    <div class="card-image">
                      <NuxtLink :to="'/post/' + item?.id">
                        <img
                          :src="
                            item?.metadata?.[0]?.url ??
                            'https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%202.png?raw=true'
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
                    <div class="">
                      <!-- <i class="uil uil-bookmark icon-footer"></i> -->
                    </div>
                    <div class="d-flex justify-content-between pt-1">
                      <div class="reactions-btn mr-3 d-flex align-items-center">
                        <div
                          :class="`${addActiveClass(item?.stats?.upvotes)}`"
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
                          <img src="@/images/arrow-up.svg" alt="like-btn" />
                        </div>
                        <div class="reactions-num">
                          {{ item?.stats?.upvotes.length }}
                        </div>
                      </div>
                      <div
                        class="reactions-btn mr-3 d-flex align-items-center dislike-btn"
                      >
                        <div
                          :class="`${addActiveClass(item.stats.downvotes)}`"
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
                          <img
                            src="@/images/arrow-down.svg"
                            alt="dislike-btn"
                          />
                        </div>
                        <div class="reactions-num">
                          {{ item?.stats?.downvotes.length }}
                        </div>
                      </div>
                    </div>
                    <!-- <div class="d-flex align-items-center">
                    <span @click="() => reactToPost(item.id)">
                      <i class="uil uil-heart icon-footer"></i
                    ></span>
                    <h5>{{ item?.stats?.totalUpvotes }}</h5>
                  </div> -->
                  </div>
                </div>
              </div>
            </b-skeleton-wrapper>
          </div>
        </template>

        <template v-slot:right>
          <div class="right-bar p-4">
            <h4 class="pb-5">Trending</h4>
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
import { recommendProfiles, clientId, publicationsQuery } from "../../api";
import { formatIpfdImg, dateFormatter, deepCopy } from "@/util";
import { defaultProfile } from "../../store";
import { useAppStore } from "~/store/app";
import { interactWithPost, whoReactedPub } from "~/services/api";

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
        loading: true,
        error: false,
        errorMsg: "",
      },
    });
    const store = useAppStore();
    const userProfile = store.currentUser?.id;
    const addActiveClass = (array = []) => {
      const isIncluded = array.some((i) => i.profile.id == userProfile);
      return isIncluded ? "active-post" : "";
    };

    onMounted(() => {
      signerOrProvider.value = window.ethereum;
      userQuery();
    });

    const reactToPost = async (
      typeOfReaction,
      publicationId,
      upVotesReactions,
      downVotesReactions
    ) => {
      const data = {
        profileId: store.currentUser?.id,
        publicationId,
        reaction: typeOfReaction,
      };

      const upVotes = deepCopy(upVotesReactions);
      const downVotes = deepCopy(downVotesReactions);

      const upVotesIncluded = upVotes.some(
        (i) => i?.profile?.id == userProfile
      );

      const post = await interactWithPost(data);

      const downVotesIncluded = downVotes.some(
        (i) => i?.profile?.id == userProfile
      );

      if (typeOfReaction === "UPVOTE") {
        const mappedData = publications.data.map((i) => {
          if (i.id == publicationId) {
            let currentUpVotes = i.stats.totalUpvotes;
            let currentDownVotes = i.stats.totalDownvotes;
            return {
              ...i,
              stats: {
                ...i.stats,
                upvotes: upVotesIncluded
                  ? i.stats.upvotes
                  : [...i.stats.upvotes, { profile: store.currentUser }],
                downvotes: downVotesIncluded
                  ? i.stats.downvotes.filter((i) => {
                      return i.profile.id == userProfile;
                    })
                  : i.stats.downvotes,
              },
            };
          }
          return i;
        });

        publications.data = mappedData;
      }

      if (typeOfReaction === "DOWNVOTE") {
        const mappedData = publications.data.map((i) => {
          if (i.id == publicationId) {
            let currentUpVotes = i.stats.totalUpvotes;
            let currentDownVotes = i.stats.totalDownvotes;
            return {
              ...i,
              stats: {
                ...i.stats,
                upvotes: upVotesIncluded
                  ? i.stats.upvotes.filter((i) => {
                      return i.profile.id == userProfile;
                    })
                  : i.stats.upvotes,

                downvotes: downVotesIncluded
                  ? i.stats.downvotes
                  : [...i.stats.downvotes, { profile: store.currentUser }],
              },
            };
          }
          return i;
        });

        publications.data = mappedData;
      }
    };

    const userQuery = async () => {
      try {
        const getProfilesId = await clientId.request(recommendProfiles);
        const ids = getProfilesId?.recommendedProfiles?.map((i) => i?.id);
        const publicationsPost = await clientId?.request(publicationsQuery, {
          ids,
        });
        const mappedData = publicationsPost?.publications?.items
          .filter((i) => i.__typename == "Post")
          ?.map((i) => {
            const dataMap = i?.metadata?.media?.map((j) => {
              return { ...j, url: formatIpfdImg(j?.original?.url) };
            });
            return {
              ...i,
              metadata: dataMap,
            };
          });
        publications.data = mappedData ?? publications.data;
        const mappedArr = mappedData.map((i) => i.id);
        const reactionData = await whoReactedPub(mappedArr);
        publications.data = publications.data.map((i, index) => {
          return {
            ...i,
            stats: {
              ...i.stats,
              upvotes: reactionData[
                index
              ]?.whoReactedPublication?.items?.filter(
                (i) => i.reaction == "UPVOTE"
              ),
              downvotes: reactionData[
                index
              ]?.whoReactedPublication?.items?.filter(
                (i) => i.reaction == "DOWNVOTE"
              ),
            },
          };
        });

        dataStatus.data.loading = false;
      } catch (error) {
        console.log("error", error);
      }
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
