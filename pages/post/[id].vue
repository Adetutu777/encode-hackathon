<template>
  <div class="">
    <Dashboard>
      <template v-slot:middle>
        <div class="feeds">
          <div class="feed">
            <div class="head">
              <div class="user">
                <div class="profile-photo">
                  <JazzIcon />
                  <!-- <img src="@/images/Ellipse 44.png" alt="" /> -->
                </div>

                <NuxtLink class="top-icon" :to="`/profile/${viewBlog?.data?.profile?.ownedBy}`">
                  <div class="details name-icon">
                    <h5>{{ viewBlog?.data?.profile?.name }}</h5>
                  </div>
                    <div class="date-icon">
                      {{ viewBlog?.data?.profile?.handle }} -
                      {{ dateFormatter(viewBlog?.data?.createdAt) }}</div>
                  <!-- </div> -->
                </NuxtLink>
              </div>
              <div class="info">
                
              </div>
            </div>
            <div class="title">
              <h5 class="mt-3 pb-1">{{ viewBlog?.data?.metadata?.content }}</h5>
            </div>

            <div class="photo">
              <img
                class="img-fluid"
                :src="
                  viewBlog?.data?.blogUrl ??
                  'https://github.com/DrVickie8/Team-Lens-Developers/blob/main/Lens-folder/images/Frame%202.png?raw=true'
                "
                @error="replaceByDefault"
              />
            </div>
            <div class="blog">
              <p class="mt-2">{{ viewBlog?.data?.metadata?.description }}</p>
            </div>
          </div>
         
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
                <div class="funds">
                  <h5>{{ viewBlog?.data?.profile?.name }}</h5>
                  <small>
                    {{ viewBlog?.data?.profile?.handle }}
                  </small>
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
                <div class="totalPublication ">
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
.bio-prof{
  font-size: 0.9rem;
}
.totalPublication{
  margin-left: 1rem;
}

.right-col{
  padding-right: 1rem;
}
</style>
