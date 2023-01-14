<template>
  <div>
    <b-modal
      v-model="showViewModal"
      @close="closeModal"
      id="notifications-modal"
      :title="currentMsg?.data?.title"
    >
      {{ currentMsg?.data?.message }}
    </b-modal>
    <Dashboard>
      <template v-slot:middle>
        <div class="">
          <div>
            <h3 class="pb-3">Notifications</h3>
          </div>
          <div>
            <div class="update mt-3" v-if="notifications?.length == 0">
              Nothing here...
            </div>
            <div v-for="notify in notifications" :key="notify.sid">
              <div class="">
                <div
                  cass="p-2 mt-3 post-tab d-flex"
                  class="d-flex justify-content-between userdraft p-2"
                >
                  <!-- title -->
                  <div class="title-text">
                    <h5 class="text-header mt-1">
                      {{ notify?.notification?.title }}
                    </h5>
                  </div>

                  <div>
                    <button
                      class="delete-btn px-3"
                      variant="outline-secondary"
                      @click="view(notify)"
                    >
                      view
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Dashboard>
  </div>
</template>

<script>
import Dashboard from "~~/components/Dashboard.vue";
import { computed, onMounted, ref, reactive } from "vue";
import { useAppStore } from "~/store/app";

export default {
  components: {
    Dashboard,
  },
  layout: "no-sidebar",
  setup() {
    const store = useAppStore();
    const notifications = store.notifications;
    const showViewModal = ref(false);
    const currentMsg = reactive({
      data: {},
    });

    const closeModal = () => {
      showViewModal.value = false;
      currentMsg.data = {};
    };
    const view = (msg) => {
      currentMsg.data = msg;
      console.log(msg);
      showViewModal.value = true;
    };

    return {
      view,
      notifications,
      closeModal,
      showViewModal,
      currentMsg,
    };
  },
};
</script>

<style scoped>
.delete-btn {
  margin-left: 0.5rem;
  border: 1px solid #66a7df;
  border-radius: 1rem;
}
.delete-btn:hover {
  background: #66a7df;
  color: white;
}

.post-tab {
  width: 100%;
  margin-top: 0.6rem;
  border: 1px solid #f9f9f9;
  background: #f9f9f9;
  border-radius: 5px;
  flex-direction: column;
}

.userdraft {
  border: 1px solid #f9f9f9;
  background: #f9f9f9;
  margin-top: 0.6rem;
}

.title-text {
  text-decoration: none;
}
</style>
