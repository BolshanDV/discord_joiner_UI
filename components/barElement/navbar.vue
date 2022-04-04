<template>
  <div class="navbar_section">
    <b-button variant="outline-danger"
              class="btn"
              @click="CLEAR"
    >
      <nuxt-link
          to="/web-tools"
          class="navbar_btn exit_btn"
      >
        Exit
      </nuxt-link>
    </b-button>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "navbar",
  beforeMount() {
    if (localStorage['capMonster']) {
      let key = localStorage['capMonster']
      this.SAVE_KEY(key)
    }
  },
  methods:{
    ...mapActions('web-app/authStore/authorization', ['CLEAR']),
    ...mapActions('web-app/captchaSettingsStore/settings', ['SAVE_KEY'])
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
  width: 7vw;
  height: 6%;
  max-width: 132px;
  max-height: 43px;
  background: #B41210;
  border-radius: 7px;
  border-color: #B41210;
  color: #FFFFFF;
  margin: 0 3%;
}
.navbar_btn{
  color: #FFFFFF;
}
</style>
