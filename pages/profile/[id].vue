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
                  <div class="info">
                    <h3 class="mt-3">
                      {{ $route.params.id }}
                    </h3>
                    <p class="mb-2">
                      {{ userData?.data.stats?.totalFollowers ?? 0 }}
                      followers
                    </p>
                  </div>
                </div>
              </div>

              <b-tabs
                active-nav-item-class="font-weight-bold"
                style=""
                content-class="mt-3"
                align="center"
                fill
              >
                <b-tab @click="getValue(0)" title="Post" active></b-tab>
                <b-tab @click="getValue(1)" title="Following"></b-tab>
                <b-tab @click="getValue(2)" title="About"></b-tab>
              </b-tabs>
            </div>
          </div>

          <div class="update mt-3" v-if="currentTab == 0">
            <div class="" v-if="postsData.length == 0">Nothing here...</div>
            <div class="  " v-for="item in postsData" :key="item.id">
              <div class="post-tab p-2">
                <NuxtLink class="user-post name-icon" :to="`/post/${item?.id}`">
                  <h6 class="content-post">
                    {{ item?.metadata?.content }}
                  </h6>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div clss="photo" v-if="currentTab == 1">
            <h5>{{ userData?.data?.stats?.totalFollowing }} following</h5>
          </div>

          <div clss="photo" v-if="currentTab == 2">
            <p>{{ userData?.data?.bio }}</p>
          </div>
        </div>
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
import { getUserProfile } from "~/services/connect";

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
    const currentTab = ref(0);
    const userData = reactive({
      data: {},
    });
    const postsData = ref([]);
    const id = computed(() => route.params.id);
    onMounted(async () => {
      const name = id.value ? id.value.split(".")?.[0] : "";
      const userData = await getUserProfile(name);

      const posts = await clientId.request(userPublicationsQuery, {
        id: userData.id,
      });

      userData.data = userData;
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
  width: 100%;
  margin-top: 0.6rem;
  border: 1px solid #f9f9f9;
  background: #f9f9f9;
  border-radius: 5px;
  flex-direction: column;
}

.user-post {
  text-decoration: none;
}
.content-post:hover {
  color: #66a7df;
}

.content-post {
  font-size: 1.2rem;
}
</style>
