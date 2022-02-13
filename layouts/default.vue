<template>
    <div class="body">
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
import Sidebar from "../components/Sidebar";
import navbar from "../components/navbar";
export default {
  name: "default",
  components: {
    Sidebar,
    navbar
  }
}
</script>

<style scoped>
.body{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #161E29;
  height: 100vh;
}
.sidebar{
  background: #0D121A;
  border-radius: 10px;
  width: 20%;
  /*padding: 1% 1% 1% 1.5%;*/

}
.main{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 80%;
  background: url("../assets/images/waveBackground.svg") 20% 50%/100% 100% no-repeat;
}
.main_section{
  padding: 2%;
  height: 100%;
}
.navbar{
  background-color: #080D16;
  height: 9%;
}
</style>
