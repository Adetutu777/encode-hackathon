<template>
  <div>
    <Dashboard>
      <template v-slot:middle>
        <div class="">
          <div>Drafts</div>
          <div>
            <div class="update mt-3" v-if="drafts.length == 0">
              Nothing here...
            </div>
            <div v-for="draft in drafts" :key="draft.id">
              <div class="p-2 mt-3 d-flex">
                <div>
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
      </template>
    </Dashboard>
  </div>
</template>

<script>
import Dashboard from "~~/components/Dashboard.vue";
import { computed, onMounted, ref } from "vue";

export default {
  components: {
    Dashboard,
  },
  layout: "no-sidebar",
  setup() {
    const draftsStore = computed(() =>
      JSON.parse(localStorage.getItem("drafts") ?? [])
    );
    const drafts = ref(draftsStore.value);

    const deleteDraft = (id) => {
      const newDrafts = drafts.value.filter((draft) => draft.id !== id);
      drafts.value = newDrafts;
      localStorage.setItem("drafts", JSON.stringify(newDrafts));
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
</style>
