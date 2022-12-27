<template>
  <div>
    <profileId />

    <div class="container">
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-sm-8">
          <button class="btn-one mb-3">Generate Image</button>
          <div class="card pt-3">
            <div class="card-body">
              <button class="btn-two">Add cover</button>
              <!-- post title -->
              <div class="add-title mt-4">
                <input
                  type="text"
                  placeholder="Add title"
                  class="w-100 border-0 text-title"
                />
              </div>
              <div class="add-tag mt-4">
                <input
                  type="text"
                  placeholder="Add tags max. of 4"
                  class="w-100 p-2"
                />
              </div>
              <!-- write post -->
              <div class="mt-2">
                <b-form-textarea
                  id="textarea"
                  v-model="text"
                  placeholder="Write your sweet post ..."
                  rows="6"
                  max-rows="10"
                ></b-form-textarea>
              </div>
            </div>
          </div>
          <div class="d-flex mt-3">
            <button class="btn-two">Publish</button>
            <button class="btn-one">Save to drafts</button>
          </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.text-title {
  font-size: 2.5rem;
  font-weight: 500;
  padding: 0.3rem;
}
.add-title {
  border: none;
}
.add-title input {
  border: none;
  padding: 1rem 0.5rem;
}
</style>
