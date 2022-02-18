<template>
  <div class="navbar_section">
    <div class="navbar_icon">Icon</div>
    <div class="navbar_user">User</div>
    <b-button variant="outline-danger" class="btn">Exit</b-button>
  </div>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style scoped>
.navbar_section{
  flex-direction: row;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  width: 100%;
}
.btn{
  width: 10%;
  background: #B41210;
  border-radius: 7px;
  color: #FFFFFF;
  margin: 0 3%;
}
.navbar_user{
  margin: 0 2%;
}
</style>
