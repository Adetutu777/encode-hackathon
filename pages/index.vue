<template>

  <div>
    <!-- navbar -->
    <div class="lens-story">
    <div class="nav-header px-4 py-4 d-flex justify-content-between">
      <div>
        <img src="@/images/Chain-write.svg" alt="image">
      </div>

      <div class="">
        <CreateAccountWallet classes="btn-signup mt-2" />
      </div>
    </div>
    <!-- navbar ends here -->

    <!-- body -->
    <div class="container">
  <div class="row algn-items-start">
      <div class="col-md-1"></div>
        <div class="col-md-5 col-one">
          <h2>
            The All-in-One Web3 Blogging Platform!
          </h2>
          <p class="mt-4">
          Experience a New Social Media Revolution with chainWrite, This is a perfect platform for anyone looking to express themselves online without worrying about their data being shared or exploited
          </p>

          <div class="d-flex mt-5">
            <button class="btn-one"> <b>Get started</b></button>
          </div>
        </div>
        <!-- col-two -->
        <div class="col-md-6 mt-5">
          <img
            class="bg-image img-fluid"
            src="@/images/chainwritesmile.svg"
            alt="image"
          />
        </div>
      </div>

    

  <!-- footer -->

<!-- End of .container -->
    </div>
</div>
<div class="about-us">
    <div class="container">
    <div class="row ">
    <div class="text-center about-chain">
    <h3 class="about-heading">About Us</h3>
    <p class="about-text">Welcome to chainWrite, the revolutionary web3 social media application! With our Web3 social media application, users can share their thoughts <br> and experiences with the world. By using an Ethereum-based blockchain, we've created a platform where you can trust the content you post will <br> remain secure and private. No more worrying about your data being sold to third-parties or compromised.
</p>

<p> For those who want to read the posts of others, our web3 application allows users to browse posts by  categories, tags or even authors. This makes <br> it easy to find posts that are related to your interests and preferences. 
</p>
</div>
      </div>

    </div>
    </div>

    <div class="meet-team bg-light">
   <div class="container">

  <div class="row heading">
      <h2 class="text-center bottom-line pt-5">Meet Our Team</h2>
      <p class="subheading text-center pb-3">Creative Nerds</p>
  </div>

  <div class="row team-row">
      <div class="col-md-3"></div>
    <div class="col-md-3 col-sm-6 team-wrap">
      <div class="team-member text-center">
        <div class="team-img">
          <img src="@/images/ken.png" alt="">
          <div class="overlay">
            <div class="team-details text-center">
              <p>
                Creating software with humans in mind
              </p>
              <div class="socials mt-20">
                <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-google-plus"></i></a>
                <a href="#"><i class="fa fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </div>
        <h6 class="team-title">Oke Kehinde</h6>
        <span>FullStack Software developer</span>
      </div>
    </div>
    <!-- end team member -->

    <div class="col-md-3 col-sm-6 team-wrap">
      <div class="team-member text-center">
        <div class="team-img">
          <img src="@/images/tut.jpg" alt="">
          <div class="overlay">
            <div class="team-details text-center">
              <p>
                Creating software with humans in mind
              </p>
              <div class="socials mt-20">
                <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-google-plus"></i></a>
                <a href="#"><i class="fa fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </div>
        <h6 class="team-title">Adetutu Gbangbola</h6>
        <span>Software developer</span>
      </div>
    </div>
    <!-- end team member -->

    <div class="col-md-3 col-sm-6 team-wrap"></div>
    <!-- end team member -->

  </div>
</div>

    </div>

    <!-- footer -->
    <div class="mt-5 pt-5 pb-5 footer">
<div class="container">
  <div class="row">
    <div class="col-lg-5 col-xs-12 about-company">
      <img src="@/images/Chain-write.svg" alt="image">
      <p class="pr-5 text-light mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis </p>
      <p><a href="#"><i class="fa fa-facebook-square mr-1"></i></a><a href="#"><i class="fa fa-linkedin-square"></i></a></p>
    </div>
    <div class="col-lg-3 col-xs-12 links">
      <h4 class="mt-lg-0 mt-sm-3">Links</h4>
        <ul class="m-0 p-0">
          <li>- <a href="#">Lorem ipsum</a></li>
          <li>- <a href="#">Nam mauris velit</a></li>
          <li>- <a href="#">Etiam vitae mauris</a></li>
          <li>- <a href="#">Fusce scelerisque</a></li>
          <li>- <a href="#">Sed faucibus</a></li>
          <li>- <a href="#">Mauris efficitur nulla</a></li>
        </ul>
    </div>
    <div class="col-lg-4 col-xs-12 location">
      <h4 class="mt-lg-0 mt-sm-4">Location</h4>
      <p>22, Lorem ipsum dolor, consectetur adipiscing</p>
      <p class="mb-0"><i class="fa fa-phone mr-3"></i>(+234) 0000 0000</p>
      <p><i class="fa fa-envelope-o mr-3"></i>info@chainWrite.com</p>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col copyright">
      <p class=""><small class="text-white-50">© 2023. All Rights Reserved.</small></p>
    </div>
  </div>
</div>
</div>
  </div>
</template>

<script>
import { clientId, createProfile } from "../api";
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
.lens-stor {
  background: #1f2833;
  height: 100vh;
}
.lens-story {
  backgroun: linear-gradient(166.23deg, #2C74B3 1.51%, #329FFE 99.65%);
  background: linear-gradient(160.1deg, #2471b4 0.01%, #65B7FF 95.54%);
  height: 100vh;
}


.nav-header {
  max-width: 80rem;
  margin: auto;
}

.your-story {
  color: #66fcf1;
}

.col-one {
  margin-top: 7rem;
  color: #FFFFFF;
}

.bg-image {
  border-radius: 2rem;
}
.btn-one {
 border: 1px solid #FFFFFF;
 background: #FFFFFF;
  color: #2C74B3;
  margin-left: 1rem;
  padding: 0.5rem 2rem;
  border-radius: 13px;
}
.btn-one:hover {
  background: transparent;
  color: #FFFFFF  ;
}
.about-us{
  background: #f7eded;
 padding: 2rem 0 2rem 0;
}
.about-heading {
  margin: 0.5rem 0 1rem 0;
}
.about-chain{
  padding: 2rem 0 3rem 0;
}

.about-text{
  line-height: 1.8;
}




/* Our Team
-------------------------------------------------------*/

.our-team .team-row {
  margin-left: -40px;
  margin-right: -40px;
}

.our-team .team-wrap {
  padding: 0 40px;
}

.our-team .container-fluid {
  padding: 0 50px;
}

.team-img img {
  -webkit-transition: all .2s ease-in-out;
  -moz-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  overflow: hidden;
  width: 100%;
}

.team-member,
.team-img {
  position: relative;
  overflow: hidden;
}

.team-title {
  margin: 30px 0 7px;
}

.overlay {
  background-color: rgba(20,20,20,.7);
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-transition: all .2s ease-in-out;
  -moz-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}

.team-details {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 0;
  padding: 5%;
  overflow: hidden;
  width: 100%;
  z-index: 2;
  -webkit-transition: all .2s ease-in-out;
  -moz-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}

.team-details p {
  color: #fff;
}

.team-img:hover .team-details {
  opacity: 1;
  margin-top: -80px;
}

.team-img:hover .overlay {
  opacity: 1;
}

.socials a {
  display: inline-block;
  width: 37px;
  height: 37px;
  background-color: transparent;
  border: 1px solid red;
}

.socials i {
  line-height: 37px;
  color: #616161;
  font-size: 14px;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  text-align: center;
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  -ms-transition: all 0.2s linear;
  transition: all 0.2s linear;
}

.team-details .socials i {
	color: #fff;
}

.socials a:hover i {
  color: #fff;
  background-color: #355c7d;
}
.footer {
  background: #2471b4;
  color: white;
}
.footer .links ul {
  list-style-type: none;
}
.footer .links li a {
  color: white;
  transition: color 0.2s;
 
}
.footer .links li a:hover {
  text-decoration: none;
  color: #023067;
}
.footer .about-company i {
  font-size: 25px;
}
.footer .about-company a {
  color: white;
  transition: color 0.2s;
}
.footer .about-company a:hover {
  color: #4180cb;
}
.footer .location i {
  font-size: 18px;
}
.footer .copyright p {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

</style>
