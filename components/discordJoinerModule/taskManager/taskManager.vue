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
        <b-form-input v-model="taskName" placeholder="Enter your task name" class="input_element"></b-form-input>
      </div>
      <div class="work_space_element_title">
        Accounts tokens list
      </div>
      <div class="work_space_element row_position">
        <b-form-input v-model="accountsTokensList" placeholder="Enter accounts tokens list" class="input_element"></b-form-input>
      </div>
      <div class="work_space_element_title">
        Proxy list
      </div>
      <div class="work_space_element row_position">
        <b-form-input v-model="proxyList" placeholder="Enter proxy list" class="input_element"></b-form-input>
      </div>
    </div>
    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Reaction clicker</div>
        <div>
          <b-form-checkbox
              name="check-button"
              switch
              v-model="selectedReactionClicker"
          ></b-form-checkbox>
        </div>
      </div>
        <reaction-clicker v-if="selectedReactionClicker"/>


    </div>
    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Send Command</div>
        <div >
          <b-form-checkbox
              name="check-button"
              class="custom-checkbox"
              switch
              v-model="selectedTaskManager"
          ></b-form-checkbox>
        </div>
      </div>
      <send-command v-if="selectedTaskManager"/>
    </div>
    <div class="row_position row_position_btn">
      <b-button
          variant="outline-info"
          class="row_position_btn_form"
          @click="CREATE_TASK({taskName, accountsTokensList})"
      >
        Create task
      </b-button>
    </div>

  </div>


</template>

<script>
import reactionClicker from "./reactionClicker";
import sendCommand from "./sendCommand";
import {mapActions} from 'vuex'
export default {
name: "taskManager",
  components: {
    reactionClicker,
    sendCommand
  },
  data() {
    return {
      selectedTaskManager: false,
      selectedReactionClicker: false,
      taskName: 'fC58BsPDFU',
      accountsTokensList: 'NjkyMzI0NjYyODI2MjM3OTcy.YaKYPA.ukmjaaKrpb8teiOUVzyWNKlFcp8',
      proxyList: ''
    }
  },
  methods: {
    ...mapActions('discordJoinerStore/discordJoiner', ['CREATE_TASK'])
  }
}
</script>

<style scoped>
.work_space{
  background: rgba(16,23,34,0.6);
  border-radius: 5px;
  padding: 3%;
  margin-top: 2%;
}
.work_space_element{
  background: rgba(22,30,41,0.6);
  border-radius: 3px;
  height: 6%;
  margin-top: 2.75%;

}
.work_space_element_title{
  margin-top: 3.75%;
}
.work_space_element_advent{
  justify-content: space-between;
}
.row_position_btn{
  justify-content: flex-end;
  margin-top: 5%;
}
.row_position_btn_form{
  background: rgba(43, 214, 162, 0.2);
  border: 1px solid #2BD6A2;
  box-sizing: border-box;
  border-radius: 4px;
  color: #CCCCCC;
  width: 35%;
}
.input_element{
  background-color: rgba(22,30,41,0.6);
  border-width: 0;
  color: #CCCCCC;
}
</style>
