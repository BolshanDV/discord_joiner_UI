<template>
  <div class="column">
    <div class="head_block">
      <div class="row_position">
        <div>
          <img src="../static/crypto_logo.svg" alt="">
        </div>
        <div class="text">
          <div class="text_head">Welcome to Discord Hunter</div>
          <div class="text_little">Developed by Crypto</div>
        </div>
      </div>
    </div>
    <div class="row_position description">
      <div class="column head_block key_info margin">

        <div class="text_head">
          Key information
        </div>
        <div class="input_block_description text_little">License key</div>
        <div class="input_block">
          key
        </div>
        <div class="input_block_description text_little">Version</div>
        <div class="input_block">
          2.22
        </div>
      </div>
      <div class="column head_block key_info">
        <div class="text_head">
          Application info
        </div>
        <div class="input_block_description text_little">Last update</div>
        <div class="input_block">
          19/43.43
        </div>
        <div class="input_block button_check ">
          CHECK GUIDES
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
name: "homeInformation"
}
</script>

<style scoped>
.column{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /*align-items: center;*/
  height: 100%;
  padding-top: 2%;
}
.head_block{
  background: #161E29;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 3%;
}
.row_position{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 2%;
  align-items: center;
}
img{
  width: 60px;
  height: 60px;
}
.text{
  margin-left: 4%;
}
.text_head{
  font-size: 18px;
  margin-bottom: 1%;
}
.text_little{
  font-size: 14px;
  line-height: 16px;
  color: #7e7e7e;
}
.description{
  justify-content: space-between;
  padding: 0;
}
.key_info{
  width: 47%;
  padding: 2%;
}
.input_block{
  background-color: #080D16;
  border-radius: 10px;
  padding: 3%;
  height: 100%;
}
.input_block_description{
  margin-top: 5%;
  margin-bottom: 1.5%;
}
.button_check {
  background-color: rgba(42, 76, 120, 0.83);
  margin-top: 7%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.margin{
  margin-right: 2%;
}
</style>
