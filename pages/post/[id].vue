<template>
  <div class="">
    <Dashboard>
      <template v-slot:middle>
        <div v-if="viewBlog.loading">
          <BlogLoading />
        </div>
        <div
          v-if="!!viewBlog.error"
          class="d-flex align-items-center justify-content-center flex-column"
        >
          <div class="mb-3">
            {{ viewBlog.errorMsg }}
          </div>
          <button class="btn-draft" @click="getPublication">Try Again</button>
        </div>
        <div v-if="!viewBlog.loading" class="feeds">
          <feed :viewBlog="{ ...viewBlog.data }" />
        </div>
      </template>

      <template v-slot:right>
        <div class="main-right right-col">
          <div class="right">
            <div class="content">
              <div class="first">
                <div class="profile-photo">
                  <JazzIcon />
                </div>
                <div class="second">
                  <p>
                    {{ viewBlog?.data?.profile?.bio }}
                  </p>
                </div>
              </div>
              <div class="second">
                <p class="bio-prof mt-2">
                  {{ viewBlog?.data?.profile?.bio }}
                </p>
              </div>
              <div class="third d-flex">
                <div class="fig1 mr-3">
                  <h5>
                    {{ viewBlog?.data?.profile?.stats?.totalFollowers }}
                  </h5>
                  <p>Followers</p>
                </div>
                <div class="totalPublication">
                  <h5>
                    {{ viewBlog?.data?.profile?.stats?.totalPublications }}
                  </h5>
                  <p>Publications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Dashboard>
  </div>
</template>

<script>
import { viewPublicationQuery, clientId } from "../../api";
import { formatIpfdImg, dateFormatter } from "@/util";

export default {
  layout: "no-sidebar",
  setup() {
    const viewBlog = reactive({
      data: {},
      error: false,
      loading: true,
      errorMsg: "",
    });

    const route = useRoute();

    onMounted(() => {
      getPublication();
    });

    const id = computed(() => route.params.id);
    const isVideo = computed(() => {
      const video =
        viewBlog?.data?.metadata?.media?.[0]?.original?.mimeType == "video/mp4";

      return video;
    });

    const getPublication = async () => {
      viewBlog.loading = true;
      viewBlog.error = false;
      viewBlog.errorMsg = "";

      try {
        const userPublication = await clientId.request(viewPublicationQuery, {
          id: id.value,
        });
        viewBlog.data = userPublication.publication;

        const blogPicture = viewBlog?.data?.metadata?.media?.[0]?.original?.url;
        const blogUrl = blogPicture?.startsWith("ipfs")
          ? formatIpfdImg(blogPicture)
          : blogPicture;
        viewBlog.data.blogUrl = blogUrl;
      } catch (error) {
        viewBlog.error = true;
        viewBlog.errorMsg = "Error Fetching Data";
      }

      viewBlog.loading = false;
    };
    const replaceByDefault = (e) => {
      e.target.src =
        "https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%206.png?raw=true";
    };
    const videoOptions = computed(() => {
      return {
        autoplay: true,
        controls: true,
        fluid: true,
        sources: [
          {
            src: viewBlog?.data?.metadata?.media?.[0]?.original?.url,
            // src: "https://lp-playback.com/hls/5401pcadtee2yraw/video",
            type: "video/mp4",
          },
        ],
      };
    });
    return {
      viewBlog,
      id,
      replaceByDefault,
      dateFormatter,
      getPublication,
      videoOptions,
      isVideo,
    };
  },
};
</script>

<style>
.bio-prof {
  font-size: 0.9rem;
}
.totalPublication {
  margin-left: 1rem;
}
.right-col {
  padding-right: 1rem;
}

.icon-jaz {
  margin-left: 0.4rem;
}
</style>
