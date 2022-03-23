<template>
  <div class="column">
    <div>
      <p class="title">Task Manager</p>
    </div>
    <div class="work_space column">
      <div class="work_space_element_title">
        Task name
      </div>
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model = "taskName"
               autocomplete="off"
               placeholder="Enter invite code"
               type="search"
               name="search">
      </div>
      <div class="work_space_element_title">
        Account token
      </div>
      <div class="text-field__icon">
        <input class="text-field__input input_element"
               v-model="token"
               value="token"
               @keyup.enter="VALIDATE_TOKEN(token)"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter token"
        >
        <div
            class="text-field__aicon"
            @click="VALIDATE_TOKEN(token)"
        >
          <img src="../../assets/icons/add.svg" alt="" class="click">
        </div>

      </div>
      <div class="work_space_element_title">
        Channels list
      </div>
      <div class="text-field__icon">
        <input class="text-field__input input_element"
               @keyup.enter="ADD_CHANNEL_TO_LISTS_WITH_CLEAR_UP(channel)"
               v-model="channel"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter channel id"
        >
        <div
            class="text-field__aicon"
            @click="ADD_CHANNEL_TO_LISTS_WITH_CLEAR_UP(channel)"
        >
          <img src="../../assets/icons/add.svg" alt="" class="click">
        </div>

      </div>
      <div
          class="work_space_element row_position scroll space_element"
          v-if="channelList.length !== 0"
      >
        <div
            class="row_position mini_element"
            v-for="(channel, index) in channelList"
            :key="index"
        >
            <div><img :src='channel.iconUrl' alt="" class="channelIcon"></div>
            <div class="mini_element_icons">
              <div class="scroll_horizontal scroll_horizontal_limit">
                #{{ channel.channelName }}
              </div>
            </div>
            <div
                class="mini_element_icons"
                @click="DELETE_CHANNEL(index)"
            >
              <img src="../../assets/icons/cross.svg" alt="">
            </div>
        </div>
      </div>
      <div class="work_space_element_title">
        Delay
      </div>
      <div class="text-field">
        <input
            class="text-field__input input_element"
            v-model="delay"
            autocomplete="off"
            placeholder="Enter delay"
            type="search"
            name="search">
      </div>
    </div>
    <div class="work_space column">
      <div class="work_space_element_title">
        <div class="row_position work_space_element_advent">
          <div>Delete messages</div>
          <input type="checkbox"
                 class="switch_1"
                 v-model="deleteMessagesFlag"
                 @click="CHANGE_DELETE_MESSAGE_FLAG"
          >
        </div>
      </div>
      <div class="text-field"
        v-if="deleteMessagesFlag"
      >
        <input class="text-field__input input_element"
               v-model="deleteMassages"
               autocomplete="off"
               placeholder="30 (sec)"
               type="search"
               name="search"
        >
      </div>
    </div>
    <div class="work_space column">
      <div class="work_space_element_title">
        <div class="row_position work_space_element_advent">
          <div>Messages loop</div>
          <input type="checkbox"
                 class="switch_1"
                 v-model="deleteMessagesLoop"
                 @click="CHANGE_LOOP_MESSAGE_FLAG"
          >
        </div>
      </div>
      <div class="text-field"
           v-if="deleteMessagesLoop"
      >
        <input class="text-field__input input_element"
               v-model="massagesLoop"
               autocomplete="off"
               placeholder="30 (sec)"
               type="search"
               name="search"
        >
      </div>
    </div>
    <message-list/>
    <div class="row_position row_position_btn">
      <div class="row_position row_position_btn_form"
        @click="CREATE_TASK_MESSAGE_BUMPER_AND_CLEAR()"
           v-if="taskName !== '' && channelList.length !== 0 && token !== 0"
      >
        Create task
      </div>
      <div class="row_position row_position_btn_form noActive"
           v-else
      >
        Create task
      </div>
    </div>
  </div>


</template>

<script>
import messageList from "./messageList";
import modalPage from "../modalPage/modalPage";
import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  name: "taskManagerBumper",
  components: {
    messageList,
    modalPage
  },
  data() {
    return {
      token: "",
      delay: '',
      deleteMassages: '',
      channel: '',
      taskName: '',
      massagesLoop: ''
    }
  },
  computed: {
    ...mapGetters('messageBumperStore/messageBumper',
        [
          'channelList',
          'dropDownFlagForAccountListMBumper',
          'deleteMessagesFlag',
          'singleToken',
          'deleteMessagesLoop'
        ]),
  },
  methods: {
    ...mapMutations('messageBumperStore/messageBumper',
        [
          'ADD_CHANNEL_TO_LISTS',
          'DELETE_CHANNEL',
          'CHANGE_FLAG',
          'CHANGE_DELETE_MESSAGE_FLAG',
          'CHANGE_LOOP_MESSAGE_FLAG'
        ]),
    ...mapActions('messageBumperStore/messageBumper',['CREATE_TASK_MESSAGE_BUMPER', 'GET_CHANNEL_INFO', 'VALIDATE_SINGLE_TOKEN_FOR_MANAGER_BUMPER']),
    ...mapMutations('popUpStore/popUp',['POPUP_DISPLAY']),
    ...mapActions('discordJoinerStore/discordJoiner', ['VALIDATE_SINGLE_TOKEN']),

    ADD_CHANNEL_TO_LISTS_WITH_CLEAR_UP(channel) {
      this.GET_CHANNEL_INFO({channelId: channel, token: this.singleToken.token})
      this.channel = ''
    },

    CREATE_TASK_MESSAGE_BUMPER_AND_CLEAR() {
      this.CREATE_TASK_MESSAGE_BUMPER(
          {
            taskName: this.taskName,
            delay: this.delay,
            deleteMassages: this.deleteMassages,
            token: this.singleToken.token,
            channelList: this.channelList,
            messagesLoop: this.massagesLoop
          }
      );
      this.delay = ''
      this.deleteMassages = ''
      this.token = ''
      this.taskName = ''
      this.massagesLoop = ''
    },
    async VALIDATE_TOKEN  (token) {
      await this.VALIDATE_SINGLE_TOKEN_FOR_MANAGER_BUMPER(token)
      this.token = this.singleToken.username
    }
  }
}
</script>

<style scoped>
.work_space{
  background: rgba(16,23,34,0.6);
  border-radius: 5px;
  padding: 0 3% 2% 3%;
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
.space_element{
  padding: 2%;
  flex-wrap: wrap;
}
.mini_element_icons{
  margin-left: 4px;
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
.noActive{
  background-color: rgba(22, 30, 41, 0.6);
  border: 2px solid rgba(24, 33, 44, 0.96);
}
.noActive:active{
  background-color: rgba(24, 33, 44, 0.96);
}
.mini_element{
  background: #272D36;
  border-radius: 3px;
  padding: 1.2% 2.5%;
  margin: 1% 1.75%;
  justify-content: space-between;
  align-items: center;
}
.mini_element:hover{
  text-decoration: none;
  color: #fff;
  background: #161e29;
}
.row_rotate{
  transform: rotate(180deg);
}
.drop_down_element{
  background: rgba(22,30,41,0.6);
  padding: 4% 3%;
  justify-content: space-between;
  align-items: center;
}
.drop_down_element:hover{
  text-decoration: none;
  background: #161e29;
}
.cross_icon{
   margin: 0 4.5%;
 }
.scroll_horizontal_limit{
  max-width: 150px;
}
.row_position_btn_form:active{
  background: #2BD6A2;
}
.channelIcon{
  height: 18px;
  width: 18px;
  border-radius: 50%;
}
</style>
