<template>
  <div class="column">
    <div class="row_position description">
      <div class="column head_block key_info margin">

        <div class="text_head">
          Decoders
        </div>
        <div class="input_block_description text_little">License key</div>
        <div class="form-check form-switch">
          <input class="form-check-input " type="checkbox" id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
        </div>
        <div class="input_block_description text_little">Version</div>
        <div class="input_block">
          2.22
        </div>
      </div>
      <div class="column head_block key_info">
        <div class="text_head">
         Other settings
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
    <div class="head_block">
      <div class="row_position">
        <div class="key_info head_block column webhook_item">
          <div class="text_head">
            Webhook settings
          </div>
          <div class="input_block_description text_little">Discord Joiner webhook</div>
          <div class="input_block">
            https://
          </div>
          <div class="input_block button_check ">
            TEST WEBHOOK
          </div>
        </div>
      </div>
    </div>
    <div class="row_position button_section">
      <div class=" row_position functional_btn ">Import</div>
      <div class="row_position functional_btn">Export</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "settings"
}
</script>

<style scoped>
.column{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /*align-items: center;*/
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
  justify-content: center;
  padding: 2%;
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
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.margin{
  margin-right: 2%;
}
.webhook_item{
  margin-bottom: 0;
  justify-content: flex-start;
  width: 50%;
  background-color: rgba(22,30,41,0.83);
}
.functional_btn{
  border-radius: 10px;
  border: 2px solid rgba(42, 76, 120, 0.83);
  color: rgba(42, 76, 120, 0.83);
  padding: 1% 2%;
  margin-right: 2%;
  width: 7%;
}
.button_section{
  justify-content: flex-start;
  padding-bottom: 0;
}
</style>
