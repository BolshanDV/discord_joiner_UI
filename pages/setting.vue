<template>
  <div>
    <header>
      <p class="title">Setting</p>
    </header>
    <settings/>
  </div>

</template>

<script>
export default {
name: "setting",
  components: {
    homeInformation: () => import('../components/settings')
  }
}
</script>

<style scoped>

</style>
