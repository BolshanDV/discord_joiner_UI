<template>
  <div class="login">
    <img src="../static/crypto_logo.svg" alt="" class="logo">
    <div class="title item">
      Discord Joiner
    </div>
    <div class="text-field">
      <input class="text-field__input input_element"
             v-model="authToken"
             autocomplete="off"
             placeholder="Enter your token"
             type="search"
             name="search">
    </div>
    <div class="item">
      <div>
        <div href="" class="btn waves-effect waves-red"
             @click.prevent="LOGIN_WITH_TOKE(authToken)"
        >
          Login with token
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "login",
  layout: 'empty',
  data() {
    return {
      authToken: ''
    }
  },
  computed: {
    ...mapGetters('authStore/authorization', ['token'])
  },
  methods:{
    ...mapActions('authStore/authorization', ['LOG_IN']),
    LOGIN_WITH_TOKE(token) {
      this.LOG_IN(token)
      this.$router.push('/discordJoiner')
    }
  }
}
</script>

<style scoped>
img{
  width: 130px;
  height: 53px;
}
.login{
  margin-top: 25vh;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-content: center;
  align-items: center;
  position: absolute;
}
.title{
  font-weight: 300;
  font-size: 45px;
  line-height: 45px;
  margin-top: 20px;
}
.item{
  margin-top: 30px;
}
.btn{
  color: #c4bfbf;
  width: 200px;
  height: 56px;
  background: #B41210;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
.logo{
  height: 128px;
  width: 128px;
}
.text-field{
  width: 100%;
  margin-top: 5%;
}
.text-field__input{
  background-color: rgba(22,30,41,0.81);
}
</style>
