<template>
  <div class="feed">
    <div class="head">
      <div class="use">
        <div class="d-flex">
          <div class="profile-photo">
            <JazzIcon />
          </div>

          <div class="">
            <NuxtLink
              class="top-icon"
              :to="`/profile/${viewBlog?.profile?.ownedBy}`"
            >
              <div class="icon-jaz">
                <div class="details name-icon">
                  <h5>{{ viewBlog?.profile?.name }}</h5>
                </div>
                <div class="date-icon">
                  {{ viewBlog?.profile?.handle }} -
                  {{ dateFormatter(viewBlog?.createdAt) }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="info"></div>
    </div>
    <div class="title">
      <h5 class="mt-3 pb-1">{{ viewBlog?.metadata?.content }}</h5>
    </div>
    <div v-if="isVideo" class="mb-4 mx-auto">
      <video-player :url="viewBlog?.metadata?.media?.[0]?.original?.url" />
    </div>

    <div class="photo" v-if="!isVideo">
      <img
        class="img-fluid"
        :src="
          viewBlog?.blogUrl ??
          'https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%202.png?raw=true'
        "
        @error="replaceByDefault"
      />
    </div>
    <div class="blog mt-3">
      <p v-html="viewBlog?.metadata?.description"></p>
    </div>
  </div>
</template>

<script setup>
import { formatIpfdImg, dateFormatter } from "@/util";

const props = defineProps({
  viewBlog: {
    default: {},
    type: Object,
  },
});

const viewBlog = props?.viewBlog;

const isVideo = computed(() => {
  const video =
    viewBlog?.metadata?.media?.[0]?.original?.mimeType == "video/mp4";

  return video;
});

const videoOptions = computed(() => {
  return {
    autoplay: true,
    controls: true,
    fluid: true,
    sources: [
      {
        src: viewBlog?.metadata?.media?.[0]?.original?.url,
        // src: "https://lp-playback.com/hls/5401pcadtee2yraw/video",
        type: "video/mp4",
      },
    ],
  };
});

const replaceByDefault = (e) => {
  e.target.src =
    "https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%206.png?raw=true";
};
</script>
