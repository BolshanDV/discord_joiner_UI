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
    <div class="work_space_element_title">Command</div>
    <div class="text-field">
     <input class="text-field__input input_element"
            v-model.number="commandText"
            autocomplete="off"
            placeholder="Enter command"
            type="search"
            name="search">
    </div>
    <div class="row_position work_space_element_advent">
      <div>Send command only mode</div>
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
      commandText: '',
      mode: ''
    }
  },
  methods: {
    ...mapMutations('discordJoinerStore/discord-joiner.js', ['SAVE_DATA_FROM_S_COMMAND']),
    SAVE() {
      this.SAVE_DATA_FROM_S_COMMAND({
        channelId: this.channelId,
        commandText: this.commandText,
        mode: this.mode
      })
    }
  },
  watch: {
    channelId: function () {this.SAVE()},
    commandText: function () {this.SAVE()},
    mode: function () {this.SAVE()},
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
