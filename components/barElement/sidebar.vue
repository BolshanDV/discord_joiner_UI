<template>
  <div class="column sidebar_column">
    <div class="sidebar_menu">
      <div class="logo_svg_block">
        <img src="../../static/crypto_logo.svg" alt="" class="logo_svg">
      </div>

      <nuxt-link
          v-for="page in getPages"
          :key="page.icon"
          tag="div"
          class="sidebar_item"
          :to="page.url"
          active-class="sidebar_item_active"
          :exact="page.exact"
      >
        <img :src="require('../../assets/icons/' + page.icon)" alt="img" class="icons_block">
        {{page.title}}
      </nuxt-link>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
name: "Sidebar",
  computed: {
    ...mapGetters('sidebarStore/sidebar',['getPages']),
    ...mapGetters('popUpStore/popUp', ['popUpFlagProxy'])
  },
  methods: {
    ...mapMutations('popUpStore/popUp', ['POPUP_DISPLAY']),
  }
}
</script>

<style scoped>
.switch_1{
  display: flex;
  align-items: center;
}
.text{
  color: #686872;
}
.checkbox_proxy{
  justify-content: space-between;
  align-items: center;
  padding: 7% 4%;
}
.sidebar_column{
  justify-content: space-between;
  height: 100%;
}
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
  background-color: rgba(22,30,41,0.6);
  padding: 2.75vh 1.5vh 2.75vh 3vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  color: #EBEBEB;
  font-size: 16px;
  line-height: 19px;
}
.sidebar_item_active{
  border-right-style: solid;
  border-color: #6E7F99 ;
  border-right-width: 1px;
}
.logo_svg{
  height: 11vh;
}
.icons_block{
  margin-right: 1vw;
  width: 1.5vw;
}
.logo_svg_block{
  display: flex;
  margin-left: 20px;
}
</style>
