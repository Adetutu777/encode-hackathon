<template>
  <div class="d-flex justify-content-center my-2">
    <div class="btn-wrapper">
      <button
        :disabled="isConnecting"
        type="button"
        :class="`${
          isConnecting ? 'disabled' : ''
        } btn btn-lg btn-connect text-light `"
        @click="login"
      >
        {{ isConnecting ? "connecting" : "Connect Wallet" }}
      </button>
    </div>
  </div>
</template>

<script>
import {
  clientId,
  challenge,
  authenticate,
  createProfile,
  defaultProfileQuery,
} from "../api.js";
import {
  userAddress,
  isConnected,
  userAccessToken,
  isConnecting,
  defaultProfile,
} from "../store";
import { ethers } from "ethers";
export default {
  props: {
    redirect: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const signerOrProvider = ref("");
    const address = ref("");
    const token = ref("");
    async function connect() {
      /* this allows the user to connect their wallet */
      isConnecting.value = true;
      try {
        const account = await window.ethereum.send("eth_requestAccounts");
        if (account.result.length) {
          address.value = account.result[0];
          userAddress.value = address.value;
          isConnected.value = true;

          const defaultId = await clientId.request(defaultProfileQuery, {
            address: address.value,
          });

          defaultProfile.data = defaultId.defaultProfile;
          localStorage.setItem(
            "storyDefaultProfile",
            JSON.stringify(defaultId.defaultProfile)
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
    async function login() {
      try {
        await connect();
        /* first request the challenge from the API server */

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const challengeInfo = await clientId.request(challenge, {
          address: address.value,
        });

        /* ask the user to sign a message with the challenge info returned from the server */
        const signature = await signer.signMessage(
          challengeInfo.challenge.text
        );
        /* authenticate the user */
        const authData = await clientId.request(authenticate, {
          address: address.value,
          signature,
        });
        /* if user authentication is successful, you will receive an accessToken and refreshToken */
        const {
          authenticate: { accessToken, refreshToken },
        } = authData;
        // localStorage.setItem("myStoryRefreshToken", accessToken);

        token.value = accessToken;
        userAccessToken.value = accessToken;
        console.log(router, "routersss");
        if (accessToken && props.redirect) {
          router.push("/blogs");
        }
      } catch (err) {
        console.log("Error signing in: ", err);
      } finally {
        isConnecting.value = false;
      }
    }
    return { signerOrProvider, address, token, login, isConnecting };
  },
};
</script>

<style>
.btn-connect {
  background: #0c2acb;
  padding: 1rem 8rem;
}
</style>
