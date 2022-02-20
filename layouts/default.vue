<template>
    <div class="body">
      <modal-page
        v-if="popUpFlag"
      />
      <div class="sidebar">
        <Sidebar/>
      </div>
      <div class="main">
        <div class="navbar">
          <navbar/>
        </div>
        <div class="main_section">
          <Nuxt/>
        </div>
      </div>
    </div>
</template>

<script>
import Sidebar from "../components/barElement/sidebar";
import navbar from "../components/barElement/navbar";
import modalPage from "../components/modalPage";
import {mapGetters} from "vuex"
export default {
  name: "default",
  components: {
    Sidebar,
    navbar,
    modalPage
  },
  computed: {
    ...mapGetters('popUpStore/popUp', ['popUpFlag'])
  }
}
</script>

<style scoped>
.body{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #161E29;
  min-height: 100vh;
}
.sidebar{
  background: #0D121A;
  width: 20%;


}
.main{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 80%;
  background: url("../assets/images/waveBackground.svg") 20% 50%/100% 100% no-repeat;
}
.main_section{
  padding: 3%;
}
.navbar{
  background-color: #080D16;
  height: 11vh;
}
</style>
