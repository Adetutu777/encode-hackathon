<template>
  <div class="lens-story">
    <!-- navbar -->
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
            Lorem ipsum dolor sit amet <br />
            consectetur, adipisicing elit. <br />
            Minima, enim.
          </h2>
          <p class="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            <br />
            ipsum voluptatum reiciendis pariatur exercitationem laborum <br />
            architecto sunt consequuntur quia a?
          </p>

          <div class="d-flex mt-5">
            <button class="btn-one"> <b>Get started</b></button>
            <!-- <button class="btn-two">Publish</button> -->
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
  background: linear-gradient(160.1deg, #2C74B3 0.01%, #65B7FF 95.54%);
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
</style>
