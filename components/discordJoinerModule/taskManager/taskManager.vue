<template>
  <div class="column">
    <div>
      <p class="title">Task Manager</p>
    </div>
    <div class="work_space column">
      <div class="work_space_element_title">
        Task name
      </div>
      <div class="work_space_element row_position">
        Test
      </div>
      <div class="work_space_element_title">
        Accounts tokens list
      </div>
      <div class="work_space_element row_position">
        Burners - 1
      </div>
      <div class="work_space_element_title">
        Proxy list
      </div>
      <div class="work_space_element row_position">
        RU- 1
      </div>
    </div>
    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Reaction clicker</div>
        <div>
          <b-form-checkbox name="check-button" switch></b-form-checkbox>
        </div>
      </div>
      <reaction-clicker/>
    </div>
    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Send Command</div>
        <div >
          <b-form-checkbox name="check-button" class="custom-checkbox" switch></b-form-checkbox>
        </div>
      </div>
      <send-command/>
    </div>

  </div>


</template>

<script>
import reactionClicker from "./reactionClicker";
import sendCommand from "./sendCommand";
export default {
name: "taskManager",
  components: {
    reactionClicker,
    sendCommand
  }
}
</script>

<style scoped>
.work_space{
  background: rgba(16,23,34,0.6);
  border-radius: 5px;
  padding: 3%;
  margin-top: 2%;
  /*width: 100%;*/
}
.work_space_element{
  background: rgba(22,30,41,0.6);
  border-radius: 3px;
  height: 6%;
  padding: 2%;
  margin-top: 2.75%;

}
.work_space_element_title{
  margin-top: 3.75%;
}
.work_space_element_advent{
  justify-content: space-between;
}

</style>
