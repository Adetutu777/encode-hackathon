
<template>
  <div class="">
    <Dashboard>
      <template v-slot:middle>
        <div class="middle-bar">
          <div class="top-header" style="">
            <div class="d-flex flex-row">
              <div class="p-2">
                <span><i class="uil uil-award-alt icon-icons"></i></span>
                New
              </div>
              <div class="p-2">
                <span><i class="uil uil-panel-add icon-icons"></i></span>
                Top
              </div>
              <div class="p-2">
                <span><i class="uil uil-clock icon-icons"></i></span>
                History
              </div>
            </div>
          </div>

          <div
            class="body-nav"
            v-for="item in publications.data"
            :key="item.id"
          >
            <div class="d-flex justify-content-between">
              <div class="d-flex align-items-center">
                <div class="img-icon">
                  <!-- <img src="@/images/Ellipse 44.png" alt="image"> -->
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

              <div class=""><i class="uil uil-book-open"></i> 2mins read</div>
            </div>

            <h5 class="mt-3" v-if="item?.mainPost?.metadata?.description">
              {{ item?.mainPost?.metadata?.description?.slice(0, 70) }}...
            </h5>
            <!-- <h5 class="mt-3">Being among the top 1% is not as easy as it seems</h5> -->
            <div class="crd mx-auto" style="">
              <div class="card-image">
                <NuxtLink :to="'/post/' + item?.id">
                  <!-- <img class="card-img-top " src="@/images/Frame 4.png" alt="Card image cap" /> -->
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
      </template>
      <template v-slot:right>
        <div class="right-bar p-4">
          <h4 class="pb-5">Trending Topics</h4>
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
                <div class="p-2 d-inline-block trending mb-4">Peter Obi's</div>
              </div>
            </div>
          </div>

          <NuxtLink to="/post/create" class="dropdown-two">
            <button class="mt-5 btn-show mx-auto d-flex">Show more</button>
          </NuxtLink>
        </div>
      </template>
    </Dashboard>
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
.homepage-view {
  max-width: 87rem;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 20px;
}
.sidebar {
  min-width: 15rem;
  padding: 1rem;
  padding-top: 0;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 16px;
}

.middle-bar {
  border-radius: 7px;
  margin: 0 1rem;
  transform: translateY(1rem);
}
.right-bar {
  min-width: 18rem;
  background: #ffffff;
  border-radius: 12px;
}

.icon-icons {
  font-size: 23px;
  vertical-align: middle;
  color: #292d32;
}
.icon-icons + span {
  margin-left: 1rem;
  color: #292d32;
}
.dropdown {
  padding: 1rem 0;
  text-decoration: none;
}
.btn-write {
  background: #0c2acb;
  text-decoration: none;
}
.dropdown-two {
  text-decoration: none;
}
.btn-show {
  background: #f4f8ff;
  color: #0c2acb;
}
a.nuxt-link-active {
  color: white;
  background: #243b41;
}
a.nuxt-link-active.active:hover {
  color: white;
  background: #243b41;
}
.card-image {
  max-width: 50rem;
}
.card-image img {
  width: 100%;
  height: auto;
}
.icon-footer {
  font-size: 1.8rem;
}

.trending {
  background: #f4f8ff;
  border-radius: 10000px;
  padding: 0.5rem;
}

.top-header {
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 16px;
  transform: translateY(-1rem);
}

.wrapper {
  background: #f9fbff;
}
.body-nav {
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.img-icon {
  margin-right: 1rem;
}
.nav-head {
  background: #ffffff !important;
  position: sticky !important;
}

.img-top {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
.write-icon {
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.5rem;
}
.top-icon {
  text-decoration: none;
}
.name-icon {
  color: #292d32;
}
.date-icon {
  color: #6c6e70;
}
</style>
