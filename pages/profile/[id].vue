<template>
  <div>
    <Dashboard>
      <template v-slot:middle>
        <div class="">
          <!-------------- feeds --------------->
          <div class="feeds">
            <div class="feed">
              <div class="head">
                <div class="user">
                  <JazzIcon :diameter="100" />
                  <!-- <div class="body-photo">
                    <img src="images/Ellipse 43.png" />
                  </div> -->
                  <div class="info">
                    <h3 class="mt-3">
                      {{ userData.data.handle }}
                    </h3>
                    <!-- <small>@nkem_asake</small> -->
                    <p class="mb-2">
                      {{ userData?.data.stats?.totalFollowers ?? 0 }}
                      followers
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <b-tabs content-clss="mt-3">
                  <b-tab @click="getValue(0)" title="Post" active></b-tab>
                  <b-tab @click="getValue(1)" title="Following"></b-tab>
                  <b-tab @click="getValue(2)" title="About"></b-tab>
                </b-tabs>
              </div>
            </div>
          </div>

          <div class="update mt-3" v-if="currentTab == 0">
            <div class="" v-if="postsData.length == 0">Nothing here...</div>
            <div class="  " v-for="item in postsData" :key="item.id">
              <div class="post-tab p-2 mt-3">
                <NuxtLink  :to="`/post/${item?.id}`">
                <h5 cass="pr-5">
                  {{ item?.metadata?.content }}
                  </h5>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div clss="photo" v-if="currentTab == 1">
            <p>{{ userData?.data?.stats?.totalFollowing }} followers</p>
          </div>

          <div clss="photo" v-if="currentTab == 2">
            <p>{{ userData?.data?.bio }}</p>
          </div>
        </div>
      </template>

      <template v-slot:right>
      <p>remove me</p>
      </template>
    </Dashboard>
  </div>
</template>

<script>
import {
  clientId,
  defaultProfileQuery,
  userPublicationsQuery,
} from "../../api";

import { wait } from "../../util";

import "@/styles/profile.css";
import Dashboard from "~~/components/Dashboard.vue";
export default {
  components: {
    Dashboard,
  },
  layout: "no-sidebar",
  setup() {
    const route = useRoute();
    console.log("routy", route.params);
    const currentTab = ref(0);
    const userData = reactive({
      data: {},
    });
    const postsData = ref([]);
    const id = computed(() => route.params.id);
    console.log("idy", id);

    onMounted(async () => {
      const data = await clientId.request(defaultProfileQuery, {
        address: id.value,
      });
      const posts = await clientId.request(userPublicationsQuery, {
        id: data.defaultProfile.id,
      });

      userData.data = data.defaultProfile;
      const filtered = posts.publications.items.filter(
        (post) => post.__typename === "Post"
      );

      postsData.value = filtered;
    });

    const getValue = (val) => {
      currentTab.value = val;
    };

    return { currentTab, getValue, userData, postsData };
  },
};
</script>

<style>
.nav-tabs .nav-link {
  border-radius: 5px !important;
}

.post-tab {
  width: 80%;
  display: inline-flex;
  border: 0.8px solid #0c2acb;
  border-radius: 5px;
  flex-direction: column;
}
</style>
