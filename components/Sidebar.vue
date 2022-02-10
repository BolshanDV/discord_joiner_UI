<template>
  <div class="sidebar">
    <nuxt-link
        v-for="page in getPages"
        :key="page.title"
        tag="div"
        :to="page.url"

    >
      {{page.title}}
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
name: "Sidebar",
  computed: {
    ...mapGetters('sidebarStore/sidebar',['getPages'])
  }
}
</script>

<style scoped>

</style>
