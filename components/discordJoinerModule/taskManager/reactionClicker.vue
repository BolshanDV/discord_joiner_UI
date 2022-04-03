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
      channelId: localStorage['reactionClickerObj'] ? JSON.parse(localStorage['reactionClickerObj']).channelId: '',
      messageId: localStorage['reactionClickerObj'] ? JSON.parse(localStorage['reactionClickerObj']).messageId: '',
      reactionId: localStorage['reactionClickerObj'] ? JSON.parse(localStorage['reactionClickerObj']).reactionId: '',
      reactionClickDelay: localStorage['reactionClickerObj'] ? JSON.parse(localStorage['reactionClickerObj']).reactionClickDelay: '',
      mode: localStorage['reactionClickerObj'] ? JSON.parse(localStorage['reactionClickerObj']).mode: ''
    }
  },
  methods:{
    ...mapMutations('web-app/discordJoinerStore/discord-joiner', ['SAVE_DATA_FROM_R_CLICKER']),
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
</style>
