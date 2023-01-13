<template>
  <div>
    <!-- <ValidationObserver v-slot="{ invalid }"> -->
    <form @submit.prevent="onSubmit">
      <div class="">
        <!-- <ValidationProvider rules="required" v-slot="{ errors }"> -->
        <div class="input-group mt-4">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">@</span>
          </div>
          <input
            v-model="getDetails.data.handleName"
            type="text"
            class="form-control"
            placeholder="e.g john246"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <!-- <span class="" style="color: red">{{ errors[0] }}</span> -->
        <!-- </ValidationProvider> -->
        <br />
      </div>

      <!-- <ValidationProvider rules="image" v-slot="{ errors, validate }">
  <input type="file" @change="validate">

</ValidationProvider> -->

      <div class="">
        <input
          type="file"
          @change="handleChange"
          class="form-control"
          id="customFile"
        />
        <span v-if="!imgValid && uploaded"> Invalid image type </span>
      </div>

      <div class="d-flex justify-content-center">
        <b-button
          class="py-2 mt-4 submit-btn"
          :disabled="!!!getDetails.data.handleName || sendingBtn"
          type="submit"
        >
          {{ sendingBtn ? "sending....." : "Submit" }}
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import { ethers } from "ethers";
import axios from "axios";
import { createProfileAddress } from "../config/constant";
import profileAbi from "../config/createProfileAbi.json";
// import { userAddress } from "../store";
import { storeNFT } from "../upload.js";
import { wait } from "../helpers";
import { useAppStore } from "../store/app";
import { userApi } from "~/services/api";
import { clientId, createProfile } from "~/api";
import { getUserProfile } from "~/services/connect";
export default {
  setup() {
    const signer = ref("");
    const sendingBtn = ref(false);
    const router = useRouter();
    const appStore = useAppStore();
    const userAddress = computed(() => appStore.userAddress);
    const getDetails = reactive({
      data: {
        // walletAddress: '',
        handleName: "",
        imageUrl: "",
        // followModule: '',
      },
    });
    onMounted(() => {
      const signerOrProvider = new ethers.providers.Web3Provider(
        window.ethereum
      );
      signer.value = signerOrProvider?.getSigner();
    });
    const imageRef = ref("");

    const isFormValid = () => {
      const isValid = imageRef.value.includes("png");
    };
    const imgValid = ref(false);
    const uploaded = ref(false);

    const handleChange = async (values, validate) => {
      imageRef.value = values.target.files?.[0];
      const isValid = values.target.files?.[0]?.type.includes("png");
      imgValid.value = isValid;
      uploaded.value = true;
    };

    const onSubmit = async () => {
      sendingBtn.value = true;
      const refreshToken = localStorage.getItem("myStoryRefreshToken");
      try {
        let imageCid;
        if (imageRef.value) {
          imageCid = await storeNFT(imageRef.value);
          await wait(1000);
          const [p1] = await Promise.all([
            axios.get(`https://ipfs.io/ipfs/${imageCid}`),
          ]);
        }

        const res = await clientId.request(
          createProfile,
          {
            handle: getDetails.data.handleName,
            // url: `ipfs://${imageCid ? imageCid : "0x0"}`,
            // url: null,
          },
          {
            ["x-access-token"]: refreshToken,
          }
        );
        // console.log(res, "res creaste profile");
        // res.createProfile.txHash;

        // const contract = getContract();
        // const data = [
        //   userAddress.value,
        //   getDetails.data.handleName,
        //   imageCid ?? "0x0",
        //   "0x0000000000000000000000000000000000000000",
        //   "0x",
        //   "ipfs://QmbqbUQJkZqt8m1akGMKJBY3FZC94Ec2FMJKsLmp6szMNH",
        // ];

        // await wait(10000);
        // const txn = await contract.proxyCreateProfile(data, {
        //   gasLimit: 500000,
        // });
        // const newTxn = await txn.wait();

        // sendingBtn.value = false;
        if (res?.createProfile?.txHash) {
          localStorage.setItem("currenUserName", getDetails.data.handleName);
          const createUser = await userApi(userAddress.value, "POST", {
            handle: getDetails.data.handleName,
          });

          const user = await getUserProfile(getDetails?.data?.handleName);
          appStore.currentUser = user;
          appStore.currentUserStatus = 2;

          router.push("/blogs");
        }
        sendingBtn.value = false;
      } catch (error) {
        console.log(error);
        sendingBtn.value = false;
      }
    };

    // function getContract(
    //   contractAddress = createProfileAddress,
    //   abi = profileAbi
    // ) {
    //   const signerOrProvider = new ethers.providers.Web3Provider(
    //     window.ethereum
    //   );
    //   const signer = signerOrProvider?.getSigner();

    //   return new ethers.Contract(contractAddress, abi, signer);
    // }

    return { getDetails, onSubmit, sendingBtn, imageRef, handleChange };
  },
};
</script>

<style>
.submit-btn {
  background: #2c74b3;
}
</style>
