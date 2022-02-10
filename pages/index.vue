<template>
  <div class="space">
    <header>
      <p class="title">Home page</p>
    </header>
    <homeInformation/>

  </div>

</template>

<script>
export default {
name: "home",
  components: {
    homeInformation: () => import('../components/homeInformation')
  }
}
</script>

<style scoped>


</style>
