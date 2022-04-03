<template>
  <div class="column">
    <div>
      <p class="title">Task Manager</p>
    </div>
    <div class="work_space column work_space_main">
      <div class="work_space_element_title">
        Task name
      </div>
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model = "taskName"
               autocomplete="off"
               placeholder="Enter task name"
               type="search"
               name="search">
      </div>
      <div class="work_space_element_title">
        Account token
      </div>
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model="token"
               value="token"
               @keyup.enter="VALIDATE_TOKEN(token)"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter token"
        >
      </div>

      <channels-list/>

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
        <div class="row_position work_space_element_advent">
          <div>Delete messages</div>
          <input type="checkbox"
                 class="switch_1"
                 v-model="deleteMessagesFlag"
                 @click="CHANGE_DELETE_MESSAGE_FLAG"
          >
        </div>
      <div class="text-field bumper_input"
        v-if="deleteMessagesFlag"
      >
        <input class="text-field__input input_element"
               v-model="deleteMassages"
               autocomplete="off"
               placeholder="msec"
               type="search"
               name="search"
        >
      </div>
    </div>
    <div class="work_space column">
        <div class="row_position work_space_element_advent">
          <div>Messages loop</div>
          <input type="checkbox"
                 class="switch_1"
                 v-model="deleteMessagesLoop"
                 @click="CHANGE_LOOP_MESSAGE_FLAG"
          >
        </div>
      <div class="text-field bumper_input"
           v-if="deleteMessagesLoop"
      >
        <input class="text-field__input input_element"
               v-model="massagesLoop"
               autocomplete="off"
               placeholder="msec"
               type="search"
               name="search"
        >
      </div>
    </div>
    <div class="message_container">
      <message-list/>
    </div>

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
import modalPage from "../../modalPage/modalPage";
import channelsList from "~/components/messageBumperModule/taskManager/channelsList";
import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
  name: "taskManagerBumper",
  components: {
    messageList,
    modalPage,
    channelsList
  },
  data() {
    return {
      token: localStorage['tokenMB']
          ? localStorage['tokenMB']
          : "",
      delay: localStorage['delayMB']
          ? localStorage['delayMB']
          : "",
      deleteMassages: localStorage['deleteMessageMB']
          ? JSON.parse(localStorage['deleteMessageMB']).deleteDelay
          : "",
      channel: '',
      taskName: '',
      massagesLoop: localStorage['loopMessageMB']
          ? JSON.parse(localStorage['loopMessageMB']).deleteDelay
          : "",
    }
  },
  computed: {
    ...mapGetters('web-app/messageBumperStore/message-bumper',
        [
          'channelList',
          'dropDownFlagForAccountListMBumper',
          'deleteMessagesFlag',
          'singleToken',
          'deleteMessagesLoop',
          'tasksStatusMessageBumper'
        ]),
  },
  methods: {
    ...mapMutations('web-app/messageBumperStore/message-bumper',
        [
          'ADD_CHANNEL_TO_LISTS',
          'DELETE_CHANNEL',
          'CHANGE_FLAG',
          'CHANGE_DELETE_MESSAGE_FLAG',
          'CHANGE_LOOP_MESSAGE_FLAG'
        ]),
    ...mapActions('web-app/messageBumperStore/message-bumper',['CREATE_TASK_MESSAGE_BUMPER', 'GET_CHANNEL_INFO', 'VALIDATE_SINGLE_TOKEN_FOR_MANAGER_BUMPER']),
    ...mapMutations('ui/popUpStore/popUp',['POPUP_DISPLAY']),
    ...mapActions('web-app/discordJoinerStore/discord-joiner', ['VALIDATE_SINGLE_TOKEN']),

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
      this.taskName = ''
    },
    async VALIDATE_TOKEN  (token) {
      await this.VALIDATE_SINGLE_TOKEN_FOR_MANAGER_BUMPER(token)
      this.token = this.singleToken.username
    }
  }
}
</script>

<style scoped src="../../../assets/style/components/taskManger.css">
</style>
