<template>
  <div>
    <div class="navbar-top">
      <div class="container">
        <b-navbar toggleable="lg" type="dark" variant="none">
          <b-navbar-brand href="#">
            <img src="@/images/storytribe.svg" alt="image" />
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#">Link</b-nav-item>
              <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <!-- <div> -->
                <b-button v-b-modal.modal-1>Login</b-button>

                <b-modal id="modal-1" title="Login or Signup to storytribe">
                  <h2>Connect to your wallet</h2>
                  <p>
                    This process connects you to a wallet that is already saved
                    in your browser.
                  </p>

                  <LoginWallet />

                  <p class="text-center">New here? Sign up instead</p>
                </b-modal>
                <!-- </div> -->

                <b-button size="sm" class="my-2 my-sm-0 create text-light ml-3"
                  >Create account</b-button
                >
              </b-nav-form>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>

    <!-- <section class="test-sec container">

<form  @submit.prevent="postData">
  <b-form-input
         v-model="publishContent.data.content"
          class="mb-3" 
           />
 <b-form-textarea
          type="text"
           rows="2"
          v-model="publishContent.data.description" />

<input type="file" 
@change="uploadImage"
 class="form-control" id="customFile" />

<button type="submit">submit</button>
</form>
            </section> -->
    <!-- second section -->
    <section class="section-two">
      <div class="">
        <div class="container">
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-lg-5">
              <h1 class="stay-curious"><b>Stay curious</b></h1>
              <p class="mt-3 pb-4 stories">
                Uncover stories from writers on any topic <br />
                of your choice safely on the blockchain
              </p>

              <b-button size="sm" class="my-2 my-sm-0 create text-light">
                Let’s Get Started</b-button
              >
            </div>
            <div class="col-lg-5">
              <img src="@/images/landing1.png" alt="image" />
            </div>

            <div class="col-md-1"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-three">
      <div class="container">
        <h3 class="text-center story-header">
          Storytribe is such a vibe, here’s why
        </h3>
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-sm-4">
            <div class="card safe-col">
              <div class="card-body">
                <img
                  src="@/images/tick.svg"
                  class="tick-icon p-2"
                  alt="image"
                />
                <h6 class="card-title safe"><b> SAFE AND SECURE</b></h6>
                <p class="card-text lorem-text">
                  Lorem Ipsum has been the industry's <br />
                  standard dummy text ever since the <br />
                  1500s.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card safe-col">
              <div class="card-body">
                <img
                  src="@/images/tick.svg"
                  class="tick-icon p-2"
                  alt="image"
                />
                <h6 class="card-title safe"><b> SAFE AND SECURE</b></h6>
                <p class="card-text lorem-text">
                  Lorem Ipsum has been the industry's <br />
                  standard dummy text ever since the <br />
                  1500s.
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-2"></div>
        </div>

        <div class="row pt-4">
          <div class="col-md-2"></div>
          <div class="col-sm-4">
            <div class="card safe-col">
              <div class="card-body">
                <img
                  src="@/images/tick.svg"
                  class="tick-icon p-2"
                  alt="image"
                />
                <h6 class="card-title safe"><b> SAFE AND SECURE</b></h6>
                <p class="card-text lorem-text">
                  Lorem Ipsum has been the industry's <br />
                  standard dummy text ever since the <br />
                  1500s.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card safe-col">
              <div class="card-body">
                <img
                  src="@/images/tick.svg"
                  class="tick-icon p-2"
                  alt="image"
                />
                <h6 class="card-title safe"><b> SAFE AND SECURE</b></h6>
                <p class="card-text lorem-text">
                  Lorem Ipsum has been the industry's <br />
                  standard dummy text ever since the <br />
                  1500s.
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-2"></div>
        </div>
      </div>
    </section>

    <section class="section-four">
      <div class="row">
        <div class="col-lg-6">
          <img src="@/images/landing2.png" alt="image" />
        </div>

        <div class="col-lg-6">
          <h1 class="stay-curious"><b>Write freely</b></h1>
          <p class="mt-3 pb-4 stories">
            Write about topics that you care about that is securely on the
            blockchain.
          </p>

          <b-button size="sm" class="my-2 my-sm-0 create text-light">
            Let’s Get Started</b-button
          >
        </div>
      </div>
    </section>

    <section class="section-five">
      <div class="container">
        <h3 class="text-center story-header">Featured posts</h3>
        <div class="row">
          <!-- <div class="col-md-2"></div> -->
          <div class="col-sm-4">
            <div class="card safe-col">
              <div class="card-body">
                <img src="@/images/card2.png" alt="image" />
                <h6 class="card-title safe pt-2">
                  <b> Under the night’s sky</b>
                </h6>
                <p class="card-text lorem-text">
                  It is said that bad things happen when the sun goes down. I
                  believe that there are many benefits to exploring nature under
                  the night sky,
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card safe-col">
              <div class="card-body">
                <img src="@/images/card1.png" alt="image" />
                <h6 class="card-title safe pt-2">
                  <b> Interplanetary explorations</b>
                </h6>
                <p class="card-text lorem-text">
                  We will explore the unknown, reaching out beyond our world. We
                  are space explorers and we want to share all that we find with
                  you.
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card safe-col">
              <div class="card-body">
                <img src="@/images/card.png" alt="image" />
                <h6 class="card-title safe pt-2">
                  <b> Plastic bags are harming us</b>
                </h6>
                <p class="card-text lorem-text">
                  Over 1 million people die prematurely as a result of all toxic
                  substances in the air such as CO2 and air pollution. Let’s do
                  something about it!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-six">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1 class="stay-curious"><b>Write freely</b></h1>
          <p class="mt-3 pb-4 stories">
            Write about topics that you care about that is securely on the
            blockchain.
          </p>

          <b-button size="sm" class="my-2 my-sm-0 create text-light">
            Let’s Get Started</b-button
          >

          <div class="">
            <img
              class="w-25 mx-auto pt-5"
              src="@/images/landing3.png"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- footer -->
    <section class="section-seven">
      <footer>
        <div class="footer-top">
          <div class="container">
            <div class="row">
              <!-- <div class="col-md-2"></div> -->
              <div class="col-lg-4">
                <img src="@/images/storytribe.svg" alt="" />
                <p>
                  A decentralized blogging experience. Built on the lens
                  protocol
                </p>
              </div>

              <div class="col-md-4">
                <h4 class="ml-4">Company</h4>
                <ul class="address1">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Blog</li>
                  <li>Pricing</li>
                </ul>
              </div>

              <div class="col-md-4">
                <h4 class="ml-4">Resources</h4>
                <ul class="address1">
                  <li>Tutorials</li>
                  <li>Frequently asked question</li>
                  <li>Contact us</li>
                  <li>Other projects</li>
                </ul>
              </div>
              <div class="col-md-1"></div>
            </div>

            <div class="footer-bottom pt-5 pb-3">
              <div class="container pt-3">
                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-2">
                    <p>Terms and Conditions</p>
                  </div>
                  <div class="col-md-2">
                    <p>2022 copyright</p>
                  </div>
                  <div class="col-md-2">
                    <p>Privacy Policy</p>
                  </div>
                  <div class="col-md-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
import { publishPost, clientId } from "../../api.js";
import { storeNFT } from "../../upload.js";
import { defaultProfile, userAccessToken } from "../../store";

export default {
  layout: "no-sidebar",
  setup() {
    const showImg = ref("");
    const crudStatus = ref("");
    const imageRef = ref("");
    const publishContent = reactive({
      data: {
        fileCid: "",
        imageCid: "",
        content: "",
        description: "",
      },
    });

    const sampleJson = {
      version: "2.0.0",
      metadata_id: "1c71292d-b9a9-499c-9da6-08394572067d",
      description: "Hello testing",
      content: "Hello testing",
      external_url: "https://lenster.xyz/u/testingme.test",
      image:
        "ipfs://bafkreiguwgr6xrclk2hp3373m33anrzh2ioxunqlcfugw5s7f5ux7fid5m",
      imageMimeType: "image/svg+xml",
      name: "Comment by @testingme.test",
      tags: [],
      animation_url: null,
      mainContentFocus: "TEXT_ONLY",
      contentWarning: null,
      attributes: [
        {
          traitType: "type",
          displayType: "string",
          value: "text_only",
        },
      ],
      media: [],
      locale: "en-US",
      createdOn: "2022-12-01T16:27:45.881Z",
      appId: "Lenster",
    };

    const uploadImage = async (values) => {
      imageRef.value = values.target.files[0];
    };

    const postData = async () => {
      try {
        //   console.log("ssdsdsds", {...defaultProfile},)
        // console.log("ssdsdsds token", userAccessToken.value )

        crudStatus.value = "image upload in progress...";
        const imageUpload = await storeNFT(imageRef.value);
        const jsonData = {
          version: "2.0.0",
          metadata_id: "",
          description: publishContent.data.description,
          content: publishContent.data.content,
          external_url: "",
          image: imageUpload,
          imageMimeType: "image/svg+xml",
          name: "",
          tags: [],
          animation_url: null,
          mainContentFocus: "TEXT_ONLY",
          contentWarning: null,
          attributes: [
            {
              traitType: "type",
              displayType: "string",
              value: "text_only",
            },
          ],
          media: [],
          locale: "en-US",
          createdOn: new Date(),
          appId: "Lenster",
        };

        crudStatus.value = "uploading content...";
        const file = await storeNFT(jsonData);
        crudStatus.value = "Almost done";

        const resp = await clientId.request(
          publishPost,
          {
            id: defaultProfile?.data?.id,
            uri: `ipfs://${file}`,
          },
          {
            ["x-access-token"]: userAccessToken.value,
          }
        );
      } catch (error) {
        console.log("error", error);
      }
    };

    return {
      showImg,
      uploadImage,
      publishContent,
      postData,
      crudStatus,
      imageRef,
    };
  },
};
</script>

<style>
.login {
  background: #ccdffb;
  border: 1px solid #ccdffb;
  color: #05177b;
}

.create,
.btn-login {
  background: #0c2acb;
  border: 1px solid #0c2acb;
}
.section-two,
.section-four,
.section-six {
  background: #cce1ff;
  padding: 7rem 0;
}
.stay-curious {
  color: #0723b4;
  padding-top: 10rem;
}
.stories {
  color: #0d2da9;
}
.story-header {
  color: #0723b4;
  padding-bottom: 3rem;
}
.tick-icon {
  width: 3.2rem;
}
.safe {
  color: #331b3b;
}
.lorem-text {
  color: #331b3b;
}
.safe-col {
  background: #ffffff;
  box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.section-three,
.section-five {
  background: #f0f6ff;
  padding: 7rem 0;
}

ul {
  padding: 0px;
}
ol,
ul {
  margin-bottom: 0px;
}

.footer-top {
  padding: 50px 0 50px;
}
.footer-top h4 {
  font-size: 19px;
  text-transform: uppercase;
  margin-bottom: 30px;
}
.footer-top p {
  font-size: 13px;
  line-height: 2;
}

footer p {
  margin-bottom: 0;
}
.footer-logo {
  display: block;
  margin-bottom: 32px;
}
.address1 li {
  list-style: none;
  position: relative;
  padding: 0px 0 14px 34px;
  line-height: 26px;
}
ul.address1 span {
  position: absolute;
  width: 40px;
  max-width: 40px;
  left: 0;
}
.address1 li a {
  color: #fff;
  text-decoration: none;
}
ul.address1 i {
  width: 20px;
  position: absolute;
  left: 0px;
  text-align: center;
  font-size: 28px;
  top: 0;
}
</style>
