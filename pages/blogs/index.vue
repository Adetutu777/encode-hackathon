<template>
  <div class="mt-3">
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
                  <div class="d-flex align-items-center">
                    <span><i class="uil uil-heart icon-footer"></i></span>
                    <h5>{{ item?.stats?.totalUpvotes }}</h5>
                  </div>
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
import { formatIpfdImg, dateFormatter } from "@/util";
import { defaultProfile } from "../../store";

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

    onMounted(() => {
      signerOrProvider.value = window.ethereum;
      userQuery();
    });

    // function to connect to MetaMask
    const onClickConnect = async () => {
      try {
        // Will open the MetaMask UI
        const account = await signerOrProvider.value.send(
          "eth_requestAccounts",
          []
        );
        isConnected.value = true;
        userAddress.value = account[0];
      } catch (error) {
        console.error(error);
        console.log(error.message);
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
        // console.log('hello', pu)
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
      onClickConnect,
      isConnected,
      userAddress,
      publications,
      replaceByDefault,
      dateFormatter,
      defaultProfile,
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
</style>
