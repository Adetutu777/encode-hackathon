<template>
  <div class="">
    <div class="container mt-4">
      <profileId />
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6 mt-5">
              <h2 class="row-text">{{ viewBlog?.data?.metadata?.content }}</h2>
            </div>
            <div class="col-md-6">
              <img
                class="img-fluid img-class"
                :src="
                  viewBlog?.data?.metadata?.media[0]?.original?.url ??
                  'https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%202.png?raw=true'
                "
                @error="replaceByDefault"
              />
            </div>

            <div class="content-area">
              <p v-html="viewBlog?.data?.metadata?.description"></p>
            </div>
          </div>
        </div>

        <!-- right -->
        <div class="col-md-3">
          <div class="main-right">
            <div class="right">
              <div class="content">
                <div class="first">
                  <div class="profile-photo">
                    <JazzIcon />
                  </div>
                  <div class="funds">
                    <h5>{{ viewBlog?.data?.profile?.name }}</h5>
                    <small>
                      {{ viewBlog?.data?.profile?.handle }}
                    </small>
                  </div>
                </div>
                <div class="second">
                  <p>
                    {{ viewBlog?.data?.profile?.bio }}
                  </p>
                </div>
                <div class="third d-flex justify-content-between mt-4">
                  <div class="fig1">
                    <h5>
                      {{ viewBlog?.data?.profile?.stats?.totalFollowers }}
                    </h5>
                    <p>Followers</p>
                  </div>
                  <div class="fig2">
                    <h5>
                      {{ viewBlog?.data?.profile?.stats?.totalPublications }}
                    </h5>
                    <p>Publications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    });

    const route = useRoute();

    onMounted(() => {
      getPublication();
    });

    const id = computed(() => route.params.id);

    const getPublication = async () => {
      try {
        const userPublication = await clientId.request(viewPublicationQuery, {
          id: id.value,
        });
        viewBlog.data = userPublication.publication;

        const blogPicture = viewBlog?.data?.metadata?.media?.[0]?.original?.url;
        const blogUrl = blogPicture.startsWith("ipfs")
          ? formatIpfdImg(blogPicture)
          : blogPicture;
        viewBlog.data.blogUrl = blogUrl;
      } catch (error) {}
    };
    const replaceByDefault = (e) => {
      e.target.src =
        "https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%206.png?raw=true";
    };
    return { viewBlog, id, replaceByDefault, dateFormatter };
  },
};
</script>

<style>
.row-text {
  line-height: 1.4;
}
.content-area {
  margin: 3rem 0;
}

.img-clss {
  border: 1px solid red;
  margin-right: -19rem;
}
</style>
