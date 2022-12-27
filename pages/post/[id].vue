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

                <NuxtLink :to="`/profile/${viewBlog?.data?.profile?.ownedBy}`">
                  <div class="details">
                    <h5>{{ viewBlog?.data?.profile?.name }}</h5>
                    <small
                      >{{ viewBlog?.data?.profile?.handle }} .
                      {{ dateFormatter(viewBlog?.data?.createdAt) }}</small
                    >
                  </div>
                </NuxtLink>
              </div>
              <div class="info">
                <!-- <span><i class="uil uil-book-open"></i></span> -->
                <!-- <small>2min read</small>
                    <span class="adjust"><i class="uil uil-bookmark"></i></span> -->
              </div>
            </div>
            <div class="title">
              <h5 class="mb-4">{{ viewBlog?.data?.metadata?.content }}</h5>
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
              <p>{{ viewBlog?.data?.metadata?.description }}</p>
            </div>
          </div>
          <!-- <div class="feed">
            <div class="comment">
              <div class="all">
                <div class="grp1">
                  <div class="grp1a">
                    <span><i class="uil uil-comment-alt-lines"></i></span>700
                  </div>
                  <div class="grp1b">
                    <span><i class="uil uil-align-center-justify"></i></span
                    >Sort by
                  </div>
                </div>
                <div class="grp2">
                  <div class="flex">
                    <div class="profile-photo">
                      <JazzIcon />
                    </div>
                    <div class="flex2" id="add">
                      <input
                        type="text"
                        placeholder="Add a comment"
                        style="
                          font-size: 18px;
                          background: transparent;
                          margin-left: -1rem;
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="grp3">
                  <div class="flex3">
                    <button id="cancel">Cancel</button>
                    <button>Comment</button>
                  </div>
                </div>
                <div class="profiles">
                  <div class="ellipses">
                    <div class="pro1">
                      <div class="sub">
                        <JazzIcon />
                      </div>
                      <div class="sub2">
                        <small id="br">@milkway.lens</small><br />
                        <small>God when will I be a billionaire ooo</small>
                        <div class="sub2a">
                          <span><i class="uil uil-heart"></i>20</span>
                          <p>Reply</p>
                        </div>
                        <div class="sub2b">
                          <span><i class="uil uil-triangle"></i></span>
                          <p>20 replies</p>
                        </div>
                      </div>
                    </div>
                    <div class="ellipses-main">
                      <span><i class="uil uil-ellipsis-v"></i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </template>

      <template v-slot:right>
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
              <div class="third">
                <div class="fig1 mr-3">
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

<style></style>
