<template>
  <div class="video-pl">
    <video ref="videoPlayer" class="video-js vjs-layout-tiny"></video>
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {
          autoplay: false,
          controls: true,
          fluid: true,
          sources: [
            {
              src: "https://lp-playback.com/hls/5401pcadtee2yraw/video",
              type: "video/mp4",
            },
          ],
        };
      },
    },
    url: {
      type: String,
      default: "ello",
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    let videoParams = {
      ...this.options,
      sources: [...this.options.sources].map((i) => ({ ...i, src: this.url })),
    };

    this.player = videojs(this.$refs.videoPlayer, videoParams, () => {
      this.player.log("onPlayerReady", this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped>
.video-pl {
  max-width: 12rem;
  max-height: 30rem;
}
</style>
