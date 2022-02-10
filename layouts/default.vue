<template>
  <div>
    <div class="body">
      <div class="sidebar">
        <Sidebar/>
      </div>
      <div class="main">
        <Nuxt/>
      </div>

    </div>
  </div>


</template>

<script>
import Sidebar from "../components/Sidebar";
export default {
  name: "default",
  components: {
    Sidebar
  }
}
</script>

<style scoped>
.body{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  /*margin: 0;*/
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #161E29;

}
.sidebar{
  background: #0D121A;
  width: 8vw;
}
.main{
  width: 92vw;

}
</style>
