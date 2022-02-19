<template>
  <div class="column">
    <div>
      <p class="title">Task Manager</p>
    </div>

    <div class="work_space column">
      <div class="work_space_element_title">
        Invite code
      </div>
        <div class="text-field__icon">
          <input class="text-field__input" type="search" v-model="taskName" name="search" placeholder="Enter invite code" value="css уроки">
        </div>

      <div class="work_space_element_title">
        Accounts tokens list
      </div>
      <div class="row_position ">
        <div class="work_space_element input_element_item">
          <div class="text-field__icon">
            <input class="text-field__input" type="search" name="search" placeholder="Enter tokens list" value="css уроки">
<!--            <span class="text-field__aicon">-->
<!--              //TODO svg-->
<!--            </span>-->
          </div>
        </div>




        <div class="additional_functional work_space_element item"
             @click="POPUP_DISPLAY"
        >
          <img src="../../../assets/icons/download.svg" alt="icon" class="">
        </div>
        <div class="additional_functional work_space_element"
             @click="ADD_TOKEN_WITH_CLEAR"
        >
          <img src="../../../assets/icons/add.svg" alt="icon" class="">
        </div>
      </div>

      <div class="work_space_element_title">
        Proxy list
      </div>
      <div class="row_position ">
        <div class="work_space_element input_element_item">
          <b-form-input v-model="proxyList" placeholder="Enter proxy" class="input_element"></b-form-input>
        </div>
        <div class="additional_functional work_space_element item"
        >
          <img src="../../../assets/icons/download.svg" alt="icon" class="">
        </div>
        <div class="additional_functional work_space_element">
          <img src="../../../assets/icons/add.svg" alt="icon" class="">
        </div>
      </div>

      <div class="row_position work_space_element_advent row_position_input">
        <div class="delay">
          <div class="work_space_element_title">
            Delay
          </div>
          <div class="work_space_element row_position">
            <b-form-input v-model="delay" placeholder="delay" class="input_element"></b-form-input>
          </div>
        </div>
        <div>
          <div class="work_space_element_title">
            Invites per task
          </div>
          <div class="work_space_element row_position">
            <b-form-input v-model="invitesPerTask" placeholder="Invites per task" class="input_element"></b-form-input>
          </div>
        </div>
      </div>

    </div>
    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Reaction clicker</div>
        <div>
          <label>
            <input type="checkbox" class="switch_1" v-model='selectedReactionClicker'>
          </label>
        </div>
      </div>
      <reaction-clicker v-if="selectedReactionClicker"/>
    </div>

    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Send Command</div>
        <div >
          <input type="checkbox" class="switch_1" v-model='selectedTaskManager'>
        </div>
      </div>
      <send-command v-if="selectedTaskManager"/>
    </div>
    <div class="row_position row_position_btn">
      <div class="row_position row_position_btn_form"
           @click="CREATE_TASK({taskName, accountsTokensList})"
      >
        Create task
      </div>
    </div>
  </div>
</template>

<script>
import reactionClicker from "./reactionClicker";
import sendCommand from "./sendCommand";
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
name: "taskManager",
  components: {
    reactionClicker,
    sendCommand,
  },
  data() {
    return {
      selectedTaskManager: false,
      selectedReactionClicker: false,
      taskName: '',
      token: '',
      proxyList: '',
      delay: '',
      invitesPerTask: ''

    }
  },
  computed: {
    ...mapGetters('discordJoinerStore/discordJoiner', ['tokens'])
  },
  methods: {
    ...mapActions('discordJoinerStore/discordJoiner', ['CREATE_TASK', 'VALIDATE_SINGLE_TOKEN']),
    ...mapMutations('discordJoinerStore/discordJoiner', ['POPUP_DISPLAY']),
    ADD_TOKEN_WITH_CLEAR() {
      this.VALIDATE_SINGLE_TOKEN(this.token);
      this.token = ""
    }
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
}
.work_space_element_title{
  margin-top: 3.75%;
  margin-bottom: 2.75%;
}
.work_space_element_advent{
  justify-content: space-between;
  align-items: center;
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
  height: 5vh;
  justify-content: center;

}
.input_element{
  background-color: rgba(22,30,41,0.6);
  border-width: 0;
  color: #CCCCCC;
}

.additional_functional {
  background: rgba(22,30,41,0.6);
  border-radius: 3px;
  padding: 2.75%;
}
.item{
  margin: 0 3%;
}
.input_element_item{
  width: 80%;
}
.delay{
  margin-right: 2%;
}
.row_position_input{
  margin-top: 2%;
}
</style>
