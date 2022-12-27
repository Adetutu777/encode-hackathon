<template>
  <div>
<div class="d-flex">
  <div class="container icon-input mb-3 d-flex">
<h5>mS</h5>
<div class="inp-div aa">
  <input class=" icon-input__text-field px-5 py-1 input-text" type="text">
  </div>
  <i class="uil uil-search-alt search-icon mt-1"></i>
</div>

 <!-- <NuxtLink to="/post/create" class="dropdown">
              <button
                clss="mt-5 text-light btn-write mx-auto d-flex align-items-center"
              >
                Create post
              </button>
            </NuxtLink> -->
            <!-- <div class="">
            <button>Create post</button>
            </div> -->

    <NuxtLink class="profile" :to="`/profile/${defaultProfile?.ownedBy}`">
      <div class="d-flex align-items-center">
        <JazzIcon />
        
        <div class="handle">
        <h5 class="text-muted">
            {{ defaultProfile?.handle }}
          </h5>
          <h4>
            {{ defaultProfile?.id }}
          </h4>
          
        </div>
      </div>
    </NuxtLink>
  </div>
  </div>
</template>

<script setup>
const data = localStorage.storyDefaultProfile;
const defaultProfile = JSON.parse(data);
</script>

<style>
.profile {
  text-decoration: none;
}

.handle {
margin-left: 0.5rem;
}
.handle h4 {
  font-size: 1rem;
  color: #292d32;
  outline: none;
  
}
.handle h5 {
  font-size: 0.8rem;
  color: #6c6e70;
}

.icon-input{
  position: relative;
}

.search-icon{
  position: absolute;
  left:18rem;
}

.input-text{
  margin-left: 0.8rem;
}

</style>
