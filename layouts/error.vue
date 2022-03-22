<template>
  <div class="login">
    <img src="../static/crypto_logo.svg" alt="" class="logo">
    <div class="title item">
      Discord Joiner
    </div>
    <div class="title item error">
      Error 404
    </div>
    <div class="item">
      <div>
        <a href="" class="btn waves-effect waves-red">
          Go back login page
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
  layout: 'empty'
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
  color: #FFFFFF;
  width: 200px;
  height: 56px;
  background: #B41210;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
.error{
  color: #B41210;
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
