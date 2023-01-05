<template>
  <div>
    <Dashboard>
      <template v-slot:middle>
        <div class="">
          <div>
          <h3>My Drafts</h3>
          </div>
          <div>
            <div class="update mt-3" v-if="drafts.length == 0">
              Nothing here...
            </div>
            <div v-for="draft in drafts" :key="draft.id">
            <div class="">
              <div class="p-2 mt-3 post-tab d-flex justify-content-between">
                <div class="">
                  <NuxtLink :to="`/post/createstory?id=${draft?.id}`">
                    <h5 cass="pr-5">
                      {{ draft?.title }}
                    </h5>
                  </NuxtLink>
                </div>

                <div>
                  <b-button
                    class="ml-3 delete-btn"
                    variant="outline-secondary"
                    @click="deleteDraft(draft.id)"
                    >Delete</b-button
                  >
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
import { computed, onMounted, ref } from "vue";
import { useAppStore } from "~/store/app";

export default {
  components: {
    Dashboard,
  },
  layout: "no-sidebar",
  setup() {
    const store = useAppStore();
    const drafts = computed(() => store.drafts);
    console.log(drafts.value, "draftss");

    const deleteDraft = (id) => {
      store.deleteDraft(id);
    };

    return {
      deleteDraft,
      drafts,
    };
  },
};
</script>

<style scoped>
.delete-btn {
  margin-left: 0.5rem;
}

.post-tab {
  width: 100%;
  margin-top: 0.6rem;
  border: 1px solid #F9F9F9;
  background: #F9F9F9;
  border-radius: 5px;
  flex-direction: column;
  
}
</style>
