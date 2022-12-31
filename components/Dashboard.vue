<template>
  <div>
    <div
      v-if="isPending"
      class="d-flex justify-content-center w-full p-2 py-3 mx-auto top-banner"
    >
      <div class="glass">
        <topbanner />
      </div>
      <div class="">Profile Creation Pending</div>
    </div>

    <div class="container">
      <!-- <nav class="nav-head">
      <header class="navbar-header">
        <NuxtLink to="/">
          <img src="@/images/storytribe.svg" alt="image" />
        </NuxtLink>

        <div class="search-bar">
          <i class="uil uil-search"></i>
          <input type="search" placeholder="Find your favourite blogs" />
        </div>

        <profileId />
      </header>
    </nav> -->

      <div class="">
        <profileId />
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="">
            <div class="card-ody">
              <div class="sidebar">
                <div class="">
                  <NuxtLink to="/blogs" class="dropdown d-block">
                    <i class="icon-icons uil uil-estate"></i> <span>Home</span>
                  </NuxtLink>
                  <NuxtLink to="/help" class="dropdown d-block">
                    <i class="icon-icons uil uil-envelope-add"></i>
                    <span>Notifications</span>
                  </NuxtLink>
                  <NuxtLink to="/userSetting" class="dropdown d-block">
                    <i class="icon-icons uil uil-setting"></i>
                    <span>Settings</span>
                  </NuxtLink>
                  <NuxtLink
                    :to="`/profile/${defaultProfile?.ownedBy}`"
                    class="dropdown d-block"
                  >
                    <i class="icon-icons uil uil-user-circle"></i>
                    <span>Profile</span>
                  </NuxtLink>
                  <NuxtLink to="/draft" class="dropdown d-block">
                    <i class="icon-icons uil uil-question-circle"></i>
                    <span>Draft</span>
                  </NuxtLink>
                  <NuxtLink
                    to="/post/createstory"
                    class="write-dropdown d-block text-center text-light create-post mt-3"
                  >
                    <span class="">Create post</span>
                  </NuxtLink>
                  <!-- <NuxtLink to="/post/create" class="dropdown">
              <button
                class="mt-5 text-light btn-write mx-auto d-flex align-items-center"
              >
                <img
                  class="write-icon d-inline-block"
                  src="@/images/leaf.svg"
                  alt="image"
                />
                Write
              </button>
            </NuxtLink> -->
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
              <div>
                <slot class="right-bar p-4" name="right"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="mt-3">
      <div class="d-flex justify-content-between mx-auto homepage-view wrapper">

        <div class="sidebar">
          <div class="">
            <NuxtLink to="/blogs" class="dropdown d-block">
              <i class="icon-icons uil uil-estate"></i> <span>Home</span>
            </NuxtLink>
            <NuxtLink to="/help" class="dropdown d-block">
              <i class="icon-icons uil uil-envelope-add"></i>
              <span>Notifications</span>
            </NuxtLink>
            <NuxtLink to="/userSetting" class="dropdown d-block">
              <i class="icon-icons uil uil-setting"></i> <span>Settings</span>
            </NuxtLink>
            <NuxtLink
              :to="`/profile/${defaultProfile?.ownedBy}`"
              class="dropdown d-block"
            >
              <i class="icon-icons uil uil-user-circle"></i>
              <span>Profile</span>
            </NuxtLink>
            <NuxtLink to="/help" class="dropdown d-block">
              <i class="icon-icons uil uil-question-circle"></i>
              <span>Help</span>
            </NuxtLink>
            <NuxtLink to="/post/create" class="dropdown">
              <button
                class="mt-5 text-light btn-write mx-auto d-flex align-items-center"
              >
                <img
                  class="write-icon d-inline-block"
                  src="@/images/leaf.svg"
                  alt="image"
                />
                Write
              </button>
            </NuxtLink>
          </div>
        </div>

        <div class="middle-info w-100 mx-5 p-3">
          <slot name="middle"></slot>
        </div>

        <div>
          <slot class="right-bar p-4" name="right"></slot>
        </div>
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
import { login } from "../services/connect";
import { useAppStore } from "../store/app";
export default {
  setup() {
    const data = localStorage.storyDefaultProfile;
    const defaultProfile = JSON.parse(data);
    const appStore = useAppStore();

    onMounted(() => {
      if (!appStore.isConnected) {
        login();
      }
    });

    const pendingArray = computed(() => appStore.isPending);
    const userAddress = computed(() => appStore.userAddress);
    const isPending = computed(() => {
      const currentUser = pendingArray.value.find(
        (user) => user.address === userAddress.value
      );
      return currentUser?.isPending;
    });

    return { defaultProfile, isPending };
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
a.dropdown:hover {
  background: #f3f6fb;
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
.router-link-active,
.router-link-active i,
.router-link-active span {
  color: #0c2acb !important;
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
  background: #45a29e;
  border-radius: 2rem;
}

.top-banner {
  font-weight: 700;
  background: #d2122e;
  color: #fff;
}
.glass {
  margin-right: 0.8rem;
}
</style>
