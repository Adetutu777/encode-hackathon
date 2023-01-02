<template>
  <div class="">
    <!-- Navbar -->

    <div class="">
      <Dashboard>
        <template v-slot:middle>
          <div class="middle-bar">
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
                    </NuxtLink>
                  </div>
                </div>

                <div class="d-flex justify-content-between pt-1">
                  <div class="">
                    <i class="uil uil-bookmark icon-footer"></i>
                  </div>
                  <div class="d-flex justify-content-between pt-1">
                    <div class="reactions-btn mr-3 d-flex align-items-center">
                      <div
                        :class="`${addActiveClass(item?.stats?.upvotes)}`"
                        @click="
                          () =>
                            reactToPost('UPVOTE', item?.stats?.upvotes, item.id)
                        "
                      >
                        up
                      </div>
                      <div class="reactions-num">
                        {{ item?.stats?.upvotes.length }}
                      </div>
                    </div>
                    <div class="reactions-btn mr-3 d-flex align-items-center">
                      <div
                        :class="`${addActiveClass(item.stats.downvotes)}`"
                        @click="
                          () =>
                            reactToPost(
                              'DOWNVOTE',
                              item?.stats?.downvotes,
                              item.id
                            )
                        "
                      >
                        down
                      </div>
                      <div class="reactions-num">
                        {{ item?.stats?.downvotes?.length }}
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
          </div>
        </template>

        <template v-slot:right>
          <div class="right-bar p-4">
            <h4 class="pb-5">Trending</h4>
            <div class="right-side">
              <div class="">
                <div>
                  <div class="p-2 d-inline-block trending mb-4">
                    Chivalry is dead
                  </div>
                </div>

                <div>
                  <div class="p-2 d-inline-block trending mb-4">
                    Rema’s concert
                  </div>
                </div>
                <div>
                  <div class="p-2 d-inline-block trending mb-4">World Cup</div>
                </div>
                <div>
                  <div class="p-2 d-inline-block trending mb-4">
                    Peter Obi's
                  </div>
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
    const store = useAppStore();
    const userProfile = store.currentUser?.id;
    const addActiveClass = (array = []) => {
      const isIncluded = array.map((i) => i.profile?.id).includes(userProfile);
      return isIncluded ? "active-post" : "";
    };

    onMounted(() => {
      signerOrProvider.value = window.ethereum;
      userQuery();
    });

    const reactToPost = async (publicationId) => {
      const data = {
        profileId: store.currentUser?.id,
        publicationId,
        reaction: "DOWNVOTE",
      };

      const post = await interactWithPost(data);
      const mappedData = publications.data.map((i) => {
        if (i.id == publicationId) {
          return {
            ...i,
            stats: {
              ...i.stats,
              totalUpvotes: i.stats.totalUpvotes + 1,
            },
          };
        }
        return i;
      });
      publications.data = mappedData;
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
    };
  },
};
</script>

<style>
.top-icon {
  text-decoration: none;
}
.name-icon,
.date-icon {
  color: #2f2f30;
}

.aa {
  margin-bottom: 1rem;
}

.reactions-btn {
  margin-left: 0.5rem;
}

.reactions-num {
  margin: 0rem 0.5rem;
}

.active-post {
  background-color: #f2f2f2;
  border: 1px solid #f2f2f2;
}
</style>
