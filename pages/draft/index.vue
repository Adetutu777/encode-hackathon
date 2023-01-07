<template>
  <div>
    <Dashboard>
      <template v-slot:middle>
        <div class="">
          <div>
          <h3 class="pb-3">My Drafts</h3>
          </div>
          <div>
            <div class="update mt-3" v-if="drafts.length == 0">
              Nothing here...
            </div>
            <div v-for="draft in drafts" :key="draft.id">
            <div class="">
              <div cass="p-2 mt-3 post-tab d-flex" class="d-flex justify-content-between userdraft p-2">
              <!-- title -->
                <div class="">
                  <NuxtLink class="title-text" :to="`/post/createstory?id=${draft?.id}`">
                    <h5 class="text-header mt-1">
                      {{ draft?.title }}
                    </h5>
                  </NuxtLink>
                </div>
                    <!-- button -->
                <div>
                  <button
                    class="delete-btn px-3"
                    variant="outline-secondary"
                    @click="deleteDraft(draft.id)"
                    >Delete</button >
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
  border: 1px solid #F9F9F9;
  background: #F9F9F9;
  border-radius: 5px;
  flex-direction: column;
}

.userdraft{
   border: 1px solid #F9F9F9;
  background: #F9F9F9;
   margin-top: 0.6rem;
}

.title-text{
  text-decoration: none;
}

</style>
