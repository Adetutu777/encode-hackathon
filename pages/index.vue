<template>
  <div>
    <div class="nav-header px-4 py-4 d-flex justify-content-between">
      <div><img src="@/images/storytribe.svg" alt="image" /></div>

      <div
        class="d-flex align-items-center"
        :class="{ 'connect-btn': !!!appStore.currentUser.id }"
        v-if="!!!appStore.currentUser.id"
      >
        <div>
          <ConnectWallet classes="login-btn" text="Login" />
        </div>
        <div>
          <CreateAccountWallet classes ="create-btn" />
        </div>
      </div>
    </div>

    <!-- second section -->
    <section class="section-two">
      <div class="">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 animate__animated animate__fadeInLeft">
              <div class="mx-auto" style="max-width: 23rem">
                <h1 class="stay-curious-one pt-5"><b>Stay curious</b></h1>
                <p class="mt-3 pb-4 stories stories-one">
                  Uncover stories from writers on any topic <br />
                  of your choice safely on the blockchain
                </p>

                <b-button size="sm" class="my-2 my-sm-0 create text-light">
                  Let’s Get Started</b-button
                >
              </div>
            </div>
            <div class="col-lg-6 animate__animated animate__fadeInRight">
              <img src="@/images/blogging.svg" alt="image" />
            </div>
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
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <img src="@/images/note-book.svg" alt="image" />
          </div>
          <!-- <div class="col-lg-1"></div> -->

          <div class="col-lg-5">
            <h1 class="stay-curious3"><b>Stay curious</b></h1>
            <p class="mt-3 pb-4 stories">
              Uncover stories from writers on any topic of your choice <br />
              safely on the blockchain
            </p>

            <b-button size="sm" class="my-2 my-sm-0 create text-light">
              Let’s Get Started</b-button
            >
          </div>
        </div>
      </div>
    </section>

    <section class="section-five">
      <div class="container">
        <h3 class="text-center story-header">Featured posts</h3>
        <div class="row">
          <div class="col-sm-4">
            <div class="card safe-col">
              <div class="card-body">
                <img src="@/images/sky-one.svg" alt="image" />
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
                <img src="@/images/sky2.svg" alt="image" />
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
                <img src="@/images/sky3.svg" alt="image" />
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
      <div clss="row">
        <div class="text-center">
          <h1 class="stay-curious4"><b>Write freely</b></h1>
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
              src="@/images/woman-pc.svg"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- footer -->
    <section class="section-seven">
      <footer>
        <div class="container">
          <div class="footer-top">
            <div class="row">
              <!-- <div class="col-md-2"></div> -->
              <div class="col-lg-3">
                <img src="@/images/storytribe.svg" alt="" />
                <p>
                  A decentralized blogging experience. Built on the lens
                  protocol
                </p>
              </div>

              <div class="col-md-3">
                <h4 class="company">Company</h4>
                <ul class="address1">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Blog</li>
                  <li>Pricing</li>
                </ul>
              </div>

              <div class="col-md-3">
                <h4 class="company">Resources</h4>
                <ul class="address1">
                  <li>Tutorials</li>
                  <li>Frequently asked question</li>
                  <li>Contact us</li>
                  <li>Other projects</li>
                </ul>
              </div>
              <div class="col-md-3">
                <h4 class="company">FAQs</h4>
                <ul class="address1">
                  <li>Ask us anything</li>
                  <li>Message us</li>
                  <li>Contact us</li>
                  <li>Other projects</li>
                </ul>
              </div>
              <!-- <div class="col-md-1"></div> -->
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
import { clientId, createProfile } from "../api.js";
import { ethers } from "ethers";
import { useAppStore } from "../store/app";

export default {
  layout: "no-sidebar",
  setup(props) {
    const router = useRouter();
    const signerOrProvider = ref("");
    const address = ref("");
    const token = ref("");
    const toggle = ref("");

    const appStore = useAppStore();

    const signData = async () => {
      const signerOrProvider = new ethers.providers.Web3Provider(
        window?.ethereum
      );
      const signer = signerOrProvider.getSigner();
      let text =
        "\nhttps://api-mumbai.lens.dev wants you to sign in with your Ethereum account:\n0x1049dCFe27985721Fb103d22076266377381eC7D\n\nSign in with ethereum to lens\n\nURI: https://api-mumbai.lens.dev\nVersion: 1\nChain ID: 80001\nNonce: e1e3dfe3aafe331b\nIssued At: 2022-11-30T15:57:26.325Z\n ";
      let signature = await signer.signMessage(text);
      let addressy = ethers.utils.verifyMessage(text, signature);
    };

    const createAccount = async () => {
      try {
        if (!token.value) {
          await login();
        }

        const createUserAcct = await clientId.request(
          createProfile,
          {
            handle: "adetutuOmoba",
            profilePictureUri: null,
            followNFTURI: null,
            followModule: null,
          },
          {
            headers: {
              ["x-access-token"]: token.value,
            },
          }
        );
      } catch (error) {
        console.log("an error occured", error);
      }
    };
    return {
      signData,
      signerOrProvider,
      address,
      token,
      createAccount,
      appStore,
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

.connect-btn {
  margin-right: 2.8rem;
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
  padding: 5rem 0;
}
.stay-curious {
  color: #0723b4;
  margin-top: 4rem;
}
.stay-curious-one {
  color: #0723b4;
  margin-top: 5rem;
}
.stay-curious4 {
  color: #0723b4;
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
  padding: 5rem 0;
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
  /* text-transform: uppercase; */
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

.login-btn {
  border: 0;
  color: #05177b;
  background: #ccdffb;
}
.login-btn:hover {
  background: #051c93;
}
.create-btn:hover {
  background: #051c93;
}
.stay-curious3 {
  margin-top: 12rem;
}

.section-seven {
  padding-top: 3rem;
}
.company {
  margin-left: 2rem;
}

.nav-header {
  max-width: 80rem;
  margin: auto;
}
.animate__animated {
  animation-duration: 1.5s;
}
</style>
