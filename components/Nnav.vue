<template>
    <div>
<div class="container icon-input mb-3 d-flex">
<h5>mS</h5>
<div class="inp-div">
  <input class="icon-input__text-field px-5 py-1 input-text" type="text">
  </div>
  <i class="uil uil-search-alt search-icon mt-1"></i>
</div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style>
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