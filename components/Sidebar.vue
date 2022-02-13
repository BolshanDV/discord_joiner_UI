<template>
    <div class="sidebar_menu">
      <img src="../static/crypto_logo.svg" alt="" class="logo_svg">
      <nuxt-link
          v-for="page in getPages"
          :key="page.icon"
          tag="div"
          class="sidebar_item"
          :to="page.url"
          active-class="sidebar_item_active"
          :exact="page.exact"
      >
        <img :src="require('../assets/icons/' + page.icon)" alt="img" class="icons_block">
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
.sidebar_menu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  height: 100%;
  width: 100%;
}
.sidebar_item {
  margin: 0 2px 2px 0;
  background-color: #161E29;
  padding: 2.75vh 1.5vh 2.75vh 3vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  color: #EBEBEB;
  font-size: 18px;
  line-height: 21px;
}
.sidebar_item_active{
  border-right-style: solid;
  border-color: #6E7F99 ;
}
.logo_svg{
  width: 90px;
}
.icons_block{
  margin-right: 1vw;
  width: 1.5vw;
}
</style>
