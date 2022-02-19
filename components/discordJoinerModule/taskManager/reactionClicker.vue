<template>
    <div class="column">
      <div class="work_space_element_title">Channel id</div>
        <div class="text-field">
          <input class="text-field__input input_element" v-model="channelId" autocomplete="off" placeholder="Enter channel id" type="search" name="search">
        </div>
      <div class="work_space_element_title">Message id</div>
        <div class="text-field">
          <input class="text-field__input input_element" v-model="massageId" autocomplete="off" placeholder="Enter massager id" type="search" name="search">
        </div>
      <div class="work_space_element_title">Reaction id</div>
        <div class="text-field">
          <input class="text-field__input input_element" v-model="reactionId" autocomplete="off" placeholder="Enter reaction id" type="search" name="search">
        </div>
      <div class="work_space_element_title">Reaction click delay</div>
        <div class="text-field">
          <input class="text-field__input input_element" v-model="reactionClickDelay" autocomplete="off" placeholder="Enter delay" type="search" name="search">
        </div>
      <div class="row_position work_space_element_advent">
        <div>Reaction clicker only mode</div>
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
      massageId: '',
      reactionId: '',
      reactionClickDelay: ''
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
