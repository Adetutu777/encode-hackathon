<template>
  <div>
    <NuxtLayout name="no-sidebar">
      <div
        v-if="isPending"
        class="d-flex justify-content-center w-full p-2 my-0 py-3 mx-auto top-banner"
      >
        <div class="glass">
          <topbanner />
        </div>
        <div class="">Profile Creation Pending</div>
      </div>

      <div class="container">
        <div class="">
          <profileId />
        </div>
        <div class="row mt-3">
          <div class="col-md-3">
            <div class="">
              <div class="card-ody">
                <div class="sidebar">
                  <div class="sidebar-inner">
                    <NuxtLink to="/blogs" class="dropdown d-block">
                      <i class="icon-icons uil uil-estate sidebar-left"></i>
                      <span>Home</span>
                    </NuxtLink>
                    <!-- <NuxtLink to="/help" class="dropdown d-block">
                    <i class="icon-icons uil uil-envelope-add"></i>
                    <span>Notifications</span>
                  </NuxtLink> -->
                    <!-- <NuxtLink to="/userSetting" class="dropdown d-block">
                    <i class="icon-icons uil uil-setting"></i>
                    <span>Settings</span>
                  </NuxtLink> -->
                    <NuxtLink
                      :to="`/profile/${userName}`"
                      class="dropdown d-block"
                    >
                      <i
                        class="icon-icons uil uil-user-circle sidebar-left"
                      ></i>
                      <span>Profile</span>
                    </NuxtLink>
                    <NuxtLink to="/draft" class="dropdown d-block">
                      <i
                        class="icon-icons uil uil-save sidebar-left"
                      ></i>
                      <span>Draft</span>
                    </NuxtLink>
                    <NuxtLink to="/notifications" class="dropdown d-block">
                      <i
                        class="icon-icons uil uil-bell sidebar-left"
                      ></i>
                      <span>Notifications</span>
                    </NuxtLink>
                    <NuxtLink
                      to="/post/createstory"
                      class="write-dropdown d-block text-center text-light create-post mt-5"
                    >
                      <span class="">Create post</span>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="">
              <div class="card-body">
                <div cass=" p-4">
                  <slot name="middle"></slot>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="">
              <div class="card-ody">
                <div class="right-bar p-4" v-if="$slots.right">
                  <slot name="right"></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { login } from "../services/connect";
import { receiveNotifications } from "~/services/api";
import { useAppStore } from "../store/app";
import { computed } from "vue";

export default {
  setup() {
    const store = useAppStore();
    const appStore = toRefs(store);
    const userName = computed(() => store?.currentUser?.handle);

    const statusUser = appStore.currentUserStatus;
    const isPending = statusUser == 1;
    const note = ref("");
    onMounted(async () => {
      const not = await receiveNotifications(store?.currentUser?.ownedBy);
      await store.setNotifications(not);
      note.value = not;
    });
    return { isPending, appStore, userName, note };
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
.sidebar,
.right-bar {
  padding-bottom: 4rem;
  background: F9FBFF;
  background: #ffffff;
  border: 1.5px solid #ececec;
  border-radius: 16px;
}
.middle-bar {
  border-radius: 7px;
  margin: 0 1rem;
  transform: translateY(1rem);
}
.right-ba {
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
.dropdown,
.write-dropdown {
  padding: 1rem 0;
  text-decoration: none;
}
.write-dropdown:hover {
  background: #66a7df;
}
a.dropdown:hover {
  background: #f2f9ff;
  border-radius: 15px;
}
.router-link-active i,
.router-link-active span {
  color: #2c74b3 !important;
  font-weight: bold;
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
.middle-info {
  border: 1px solid red;
  margin-bottom: 5rem;
}
.create-post {
  background: #2c74b3;
  border-radius: 2rem;
  margin: 0 2.5rem;
}
.top-banner {
  font-weight: 700;
  background: #66a7df;
  color: #fff;
}
.glass {
  margin-right: 0.8rem;
}
.sidebar-left {
  padding-left: 1rem;
}
</style>
