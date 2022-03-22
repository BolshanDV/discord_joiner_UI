<template>
  <div class="navbar_section">
    <b-button variant="outline-danger"
              class="btn"
              @click=""
    >
      <nuxt-link
          to="/"
          class="navbar_btn"
      >
        Exit
      </nuxt-link>
    </b-button>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "navbar",
  methods:{
    ...mapMutations('authStore/authorization', ['CLEAR_TOKEN'])
  }
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
.navbar_btn{
  color: #FFFFFF;
}
</style>
