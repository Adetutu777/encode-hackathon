import { init, useOnboard } from "@web3-onboard/vue";
import injectedModule from "@web3-onboard/injected-wallets";
import coinbaseModule from "@web3-onboard/coinbase";
import gnosisModule from "@web3-onboard/gnosis";
import portisModule from "@web3-onboard/portis";
import storyTribe from "../images/GroupWrite.svg";
import { useModal } from "../store/modal";
import { ethers } from "ethers";

import {
  clientId,
  challenge,
  authenticate,
  defaultProfileQuery,
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
import { userApi } from "./api";

const modal = useModal();
const injected = injectedModule();
const coinbaseConnect = coinbaseModule();
const gnosisConnect = gnosisModule();
const portisConnect = portisModule({
  apiKey: "6cd12401-bf90-414d-89d1-4f6930dc4c7f",
});

const appStore = useAppStore();
const store = computed(() => appStore);

const infuraKey = "ba80361523fe423bb149026a490266f0";
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;
init({
  appMetadata: {
    name: "chainWrite",
    icon: storyTribe,
    logo: storyTribe,
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

  wallets: [injected, portisConnect, coinbaseConnect, gnosisConnect],
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

const { connectWallet, wallets, setChain, connectedChain } = useOnboard();

export const connect = async () => {
  try {
    const con = await connectWallet();
    appStore.isConnected = true;
    return con;
  } catch (error) {
    console.log("error connections", error);
  }
};

export async function getUserProfile(userAddress) {
  try {
    const defaultId = await clientId.request(defaultProfileQuery, {
      address: userAddress,
    });
    defaultProfile.data = defaultId.defaultProfile;
    const strnData = JSON.stringify(defaultId.defaultProfile);

    localStorage.setItem("storyDefaultProfile", strnData);

    return defaultId.defaultProfile;
  } catch (error) {
    console.log("error >>.", error);
  }
}

export async function login() {
  try {
    await connect();
    const currentId = parseInt(connectedChain.value.id);

    if (currentId !== 80001) {
      await setChain({ wallet: "MetaMask", chainId: "0x13881" });
    }
    const address = wallets.value?.[0]?.accounts[0]?.address;
    const currentUser = await getUserProfile(address);
    console.log(currentUser, "current user!!!");
    userAddress.value = address;
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
    appStore.userAddress = address;
    localStorage.setItem("myStoryRefreshToken", accessToken);
    userAccessToken.value = accessToken;
    const checkUserStatus = await userApi(address);

    await appStore.setStatus(checkUserStatus ?? 0);

    if (!currentUser && checkUserStatus == 0) {
      await modal?.toggleCreateModal?.();
      return;
    }

    if (currentUser) {
      appStore.currentUser = currentUser;
    }
    if (currentUser && checkUserStatus == 1) {
      const updateUser = await userApi(address, "PUT");
      await appStore.setStatus(updateUser);
    }

    return {
      accessToken,
      user: currentUser,
    };
  } catch (err) {
    console.log("Error signing in: ", err);
    throw err;
  } finally {
    isConnecting.value = false;
  }
}
