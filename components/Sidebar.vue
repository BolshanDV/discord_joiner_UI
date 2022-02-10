<template>
    <div class="sidebar_menu">
      <img src="../static/crypto_logo.svg" alt="">
      <nuxt-link
          v-for="(page , index) in getPages"
          :key="index"
          tag="div"
          class="sidebar_item "
          :to="page.url"
          active-class="sidebar_item_active"
          :exact="page.exact"
      >
        {{index}}
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
.sidebar_menu{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  height: 100%;
  width: 100%;
  /*margin: 20%;*/

}
.sidebar_item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.sidebar_item_active{
  color: rgba(120,14,0,0.83);
}

</style>
