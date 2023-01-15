import { init, useOnboard } from "@web3-onboard/vue";
import injectedModule from "@web3-onboard/injected-wallets";
// import coinbaseModule from "@web3-onboard/coinbase";
// import gnosisModule from "@web3-onboard/gnosis";
// import portisModule from "@web3-onboard/portis";
import chainWrite from "../images/GroupWrite.svg";
import { useModal } from "../store/modal";
import { ethers } from "ethers";

import {
  clientId,
  challenge,
  authenticate,
  defaultProfileQuery,
  getProfileByHandle,
  createProfile,
} from "../api.js";

import {
  userAddress,
  isConnected,
  userAccessToken,
  isConnecting,
  defaultProfile,
  ethereumObj,
} from "../store";
import { useAppStore } from "../store/app";
import { userApi, optinForNot, optOutForNot } from "./api";
import { deepCopy } from "~~/util";
import { wait } from "~~/helpers";

const modal = useModal();
const injected = injectedModule();
// const coinbaseConnect = coinbaseModule();
// const gnosisConnect = gnosisModule();
// const portisConnect = portisModule({
//   apiKey: "6cd12401-bf90-414d-89d1-4f6930dc4c7f",
// });

const appStore = useAppStore();

const infuraKey = "ba80361523fe423bb149026a490266f0";
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;
init({
  appMetadata: {
    name: "chainWrite",
    icon: chainWrite,
    logo: chainWrite,
    description: "Bringing Communication to web3",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" },
    ],
    agreement: {
      version: "1.0.1",
      termsUrl: "https://www.blocknative.com/terms-conditions",
      privacyUrl: "https://www.blocknative.com/privacy-policy",
    },

    gettingStartedGuide: "https://blocknative.com",
    explore: "https://blocknative.com",
  },

  accountCenter: {
    desktop: {
      position: "topRight",
      enabled: true,
      minimal: true,
    },
    mobile: {
      position: "topRight",
      enabled: true,
      minimal: true,
    },
  },

  wallets: [injected],
  // wallets: [injected, portisConnect, coinbaseConnect, gnosisConnect],
  chains: [
    {
      id: "0x13881",
      token: "Matic",
      label: "Polygon Mumbai",
      rpcUrl,
      color: "purple",
      //   icon: polygonIcon,
      blockExplorerUrl: "https://mumbai.polygonscan.com/",
    },
  ],
});

const {
  connectWallet,
  wallets,
  setChain,
  connectedChain,
  disconnectWallet,
  disconnectConnectedWallet,
} = useOnboard();

export const connect = async () => {
  appStore.connectError = null;

  try {
    const con = await connectWallet();
    // appStore.isConnected = true;
    appStore.isConnecting = true;
    return con;
  } catch (error) {
    const err = deepCopy(error);
    // console.log(err.message, "erro connectin!!!");
    appStore.connectError = err?.reason ?? "Error connecting wallet";
    console.log("error connections", err);
  }
  appStore.isConnecting = false;
};

export async function getUserProfile(handle) {
  if (!handle) return;
  try {
    const defaultId = await clientId.request(getProfileByHandle, {
      handle: `${handle}.test`,
    });
    return defaultId?.profile;
  } catch (error) {
    console.log("error >>.", error);
  }
}

export const createUser = async (imageCid, handle, refreshToken) => {
  try {
    if (imageCid) {
      imageCid = await storeNFT(imageRef.value);
      await wait(1000);
      const [p1] = await Promise.all([
        axios.get(`https://ipfs.io/ipfs/${imageCid}`),
      ]);
    }

    const res = await clientId.request(
      createProfile,
      {
        handle,
        // url: `ipfs://${imageCid ? imageCid : "0x0"}`,
        // url: null,
      },
      {
        ["x-access-token"]: refreshToken,
      }
    );

    if (res?.createProfile?.txHash) {
      const createUser = await userApi(userAddress.value, "POST", {
        handle,
      });
      await wait(5000);
      const user = await getUserProfile(handle);
      return { user };
    }
  } catch (e) {
    console.log(e, "error ourred");
    throw e;
  }
};

export async function login() {
  appStore.connectError = null;
  try {
    await connect();
    // appStore.isConnecting = true;
    const currentId = parseInt(connectedChain.value.id);

    if (currentId !== 80001) {
      await setChain({ wallet: "MetaMask", chainId: "0x13881" });
    }
    const address = wallets.value?.[0]?.accounts[0]?.address;
    userAddress.value = address;
    // localStorage.setItem("myStoryRefreshToken", address);
    isConnected.value = true;

    /* first request the challenge from the API server */
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const challengeInfo = await clientId.request(challenge, {
      address,
    });

    /* ask the user to sign a message with the challenge info returned from the server */
    const signature = await signer.signMessage(challengeInfo.challenge.text);
    /* authenticate the user */
    const authData = await clientId.request(authenticate, {
      address,
      signature,
    });

    /* if user authentication is successful, you will receive an accessToken and refreshToken */
    const {
      authenticate: { accessToken, refreshToken },
    } = authData;
    // appStore.userAddress = address;
    localStorage.setItem("myStoryRefreshToken", accessToken);
    // userAccessToken.value = accessToken;
    const currUser = await userApi(address?.toLocaleLowerCase());
    const checkUserStatus = currUser?.status;

    await appStore.setStatus(checkUserStatus ?? 0);
    const currentUser = await getUserProfile(currUser?.handle);

            // console.log('hola', address)
    if (currentUser && !currUser.optedIn) {
      const sub = await optinForNot(address);
  

      // await optOutForNot(address);
      // const updateUser = await userApi(address, "PUT");
      // await appStore.setStatus(updateUser);
    }

    // appStore.isConnected = true;

    return {
      accessToken,
      user: currentUser,
      // userStatus: checkUserStatus,
    };
  } catch (err) {
    const error = deepCopy(err);
    await disconnectConnectedWallet();
    appStore.connectError = error?.reason ?? "Error Connecting ";
    throw err;
  } finally {
    appStore.isConnecting = false;
    isConnecting.value = false;
  }
}
