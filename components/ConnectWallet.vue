<template>
  <div>
    <button :class="classes" @click="connect">
      {{ text }}
    </button>
  </div>
</template>

<script setup>
import { login } from "../services/connect";
import { toggleRegModal } from "../store";

const props = defineProps({
  redirect: {
    default: true,
  },
  classes: String,
  text: {
    default: "Login",
  },
});
const router = useRouter();

const connect = async () => {
  try {
    const { accessToken, user } = await login();
    // console.log("accessToken", accessToken);
    // console.log("user", user);

    if (accessToken) {
      router.push("/blogs");
    }
  } catch (error) {
    console.log("error connectons", error);
  }
};

const gotoCreate = () => {
  window.location.replace("/post/create");
};
</script>

<style>
.profile2 {
  background: 1px solid red;
}
.post-blog {
  margin-top: 5.2rem !important;
}

.write-btn {
  background: #0c2acb;
  padding: 0.5rem;
  border-radius: 15px;
}
</style>
