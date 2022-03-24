<template>
    <div class="column">
      <div class="work_space_element_title">Channel id</div>
        <div class="text-field">
          <input class="text-field__input input_element"
                 v-model.number="channelId"
                 autocomplete="off"
                 placeholder="Enter channel id"
                 type="search"
                 name="search">
        </div>
      <div class="work_space_element_title">Message id</div>
        <div class="text-field">
          <input class="text-field__input input_element"
                 v-model="messageId"
                 autocomplete="off"
                 placeholder="Enter massager id"
                 type="search"
                 name="search">
        </div>
      <div class="work_space_element_title">Reaction id</div>
        <div class="text-field">
          <input class="text-field__input input_element"
                 v-model.number="reactionId"
                 autocomplete="off"
                 placeholder="Enter reaction id"
                 type="search"
                 name="search">
        </div>
      <div class="work_space_element_title">Reaction click delay</div>
        <div class="text-field">
          <input class="text-field__input input_element"
                 v-model.number="reactionClickDelay"
                 autocomplete="off"
                 placeholder="Enter delay"
                 type="search"
                 name="search">
        </div>
      <div class="row_position work_space_element_advent">
        <div>Reaction clicker only mode</div>
        <div>
            <input
                type="checkbox"
                class="switch_1"
                v-model="mode"
            >
        </div>
      </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
name: "reactionClicker",
  data() {
    return {
      channelId: '',
      messageId: '',
      reactionId: '',
      reactionClickDelay: '',
      mode: ''
    }
  },
  methods:{
    ...mapMutations('discordJoinerStore/discordJoiner', ['SAVE_DATA_FROM_R_CLICKER']),
    SAVE_DATA() {
      this.SAVE_DATA_FROM_R_CLICKER({
        channelId: this.channelId,
        messageId: this.messageId,
        reactionId: this.reactionId,
        reactionClickDelay: this.reactionClickDelay,
        mode: this.mode
      })
    }
  },
  watch: {
    channelId: function () {this.SAVE_DATA()},
    messageId: function () {this.SAVE_DATA()},
    reactionId: function () {this.SAVE_DATA()},
    reactionClickDelay: function () {this.SAVE_DATA()},
    mode: function () {this.SAVE_DATA()},
  }
}
</script>

<style scoped>
.work_space_element_title{
  margin-top: 3.75%;
  margin-bottom: 2.75%;
}
.work_space_element_advent{
  justify-content: space-between;
  margin-top: 3.75%;
}
.row_position_btn{
  justify-content: flex-end;
  margin-top: 5%;
}
.row_position_btn_form{
  background: rgba(43, 214, 162, 0.2);
  border: 1px solid #2BD6A2;
  border-radius: 4px;
  font-size: 14px;
  line-height: 16px;
  width: 10vw;
  height: 3vh;
  justify-content: center;
}
.row_position_btn_form:active{
  background: #2BD6A2;
}
</style>
