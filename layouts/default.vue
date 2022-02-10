<template>
    <div class="body">
      <div class="sidebar">
        <Sidebar/>
      </div>
      <div class="main">
        <Nuxt/>
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

  width: 100%;
  height: 100vh;
  background-color: #080D16;
}
.sidebar{
  background: #161E29;
  border-radius: 10px;
  width: 8%;
  padding: 1%;

}
.main{
  width: 92%;
  padding: 2%;
}
</style>
