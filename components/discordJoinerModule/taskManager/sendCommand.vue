<template>
  <div class="column">
    <div class="work_space_element_title">Channel id</div>
      <div class="text-field">
        <input class="text-field__input input_element" v-model="channelId" autocomplete="off" placeholder="Enter channel id" type="search" name="search">
      </div>
    <div class="work_space_element_title">Command</div>
    <div class="text-field">
     <input class="text-field__input input_element" v-model="commandText" autocomplete="off" placeholder="Enter command" type="search" name="search">
    </div>
    <div class="row_position work_space_element_advent">
      <div>Send command only mode</div>
      <div>
        <input type="checkbox" class="switch_1" >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reactionClicker",
  data() {
    return {
      channelId: '',
      commandText: '',
    }
  },
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
