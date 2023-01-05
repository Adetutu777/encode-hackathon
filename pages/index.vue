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
    <div class="text-center">
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
    <div class="row text-center">
      <h3>Meet the Team</h3>
      <div class="col-md-2"></div>
      <div class="col-md-4">
      <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngkey.com%2Fmaxpic%2Fu2t4t4e6w7r5r5y3%2F&psig=AOvVaw0GGcN0nYl_b8pAYKil_414&ust=1673046219926000&source=images&cd=vfe&ved=2ahUKEwjelKn-xLH8AhVEyqQKHWBlCYYQjRx6BAgAEAo" alt="image">
      </div>
      <div class="col-md-4"></div>
      <div class="col-md-2"></div>
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

.about-text{
  line-height: 1.8;
}
</style>
