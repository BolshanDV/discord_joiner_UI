<template>
  <div class="column">
    <div>
      <p class="title">Task Manager</p>
    </div>
    <div class="work_space column first_element">
      <div class="work_space_element_title">
        Task name
      </div>
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model="taskName"
               autocomplete="off"
               placeholder="Enter task name"
               type="search"
               name="search">
      </div>
      <div class="work_space_element_title">
        Invite code
      </div>
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model="inviteCode"
               autocomplete="off"
               placeholder="Enter invite code"
               type="search"
               name="search">
      </div>

      <account-tokens/>

      <proxy-list/>

      <div class="row_position work_space_element_advent row_position_input">
        <div class="delay">
          <div class="work_space_element_title">
            Delay
          </div>
          <div class="work_space_element row_position">
              <input class="text-field__input input_element"
                     v-model.number="delay"
                     autocomplete="off"
                     placeholder="delay"
                     type="search"
                     name="search">
          </div>
        </div>
        <div>
          <div class="work_space_element_title">
            Invites per task
          </div>
          <div class="work_space_element row_position">
            <input
                class="text-field__input input_element"
                v-model.number="invitesPerTask"
                autocomplete="off"
                placeholder="Invites per task"
                type="search"
                name="search">
          </div>
        </div>
      </div>
    </div>
    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Accept rules</div>
        <div >
          <input
              type="checkbox"
              class="switch_1"
              @click="CHANGE_CHECKBOX_ACCEPT_RULES"
          >
        </div>
      </div>
      <div v-if="accept_rules">
        <div class="work_space_element_title">
          Guild Id
        </div>
        <div class="text-field">
          <input class="text-field__input input_element"
                 v-model.number="guildId"
                 autocomplete="off"
                 placeholder="Enter guild id"
                 type="search"
                 name="search">
        </div>
      </div>
    </div>
    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Reaction clicker</div>
        <div>
            <input
                type="checkbox"
                class="switch_1"
                v-model="selectedReactionClicker"
                @click="CHANGE_CHECKBOX_REACTION_CLICKER"
            >
        </div>
      </div>

      <reaction-clicker
          v-if="selectedReactionClicker"
      />

    </div>
    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Send Command</div>
        <div >
          <input
              type="checkbox"
              class="switch_1"
              v-model="selectedSendCommand"
              @click="CHANGE_CHECKBOX_SEND_COMMAND"
          >
        </div>
      </div>

      <send-command
          v-if="selectedSendCommand"
      />

    </div>
    <div class="row_position row_position_btn waves waves-effect">
      <div class="row_position row_position_btn_form"
           v-if="tokens.length !== 0 && taskName !== '' && inviteCode !== ''"
           @click="PRE_CREATE_TASK({inviteCode, tokens, delay, guildId, taskName})"
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
import reactionClicker from "./reactionClicker";
import accountTokens from "@/components/discordJoinerModule/taskManager/accountTokens";
import sendCommand from "./sendCommand";
import proxyList from "@/components/discordJoinerModule/taskManager/proxyList";
import {mapActions, mapMutations, mapGetters} from 'vuex'

export default {
name: "taskManager",
  components: {
    reactionClicker,
    sendCommand,
    accountTokens,
    proxyList
  },
  data() {
    return {
      inviteCode: '',
      token: '',
      proxy: '',
      delay: '',
      invitesPerTask: '',
      guildId: '',
      taskName: ''
    }
  },
  computed: {
    ...mapGetters('discordJoinerStore/discordJoiner',
        [
          'selectedSendCommand',
          'selectedReactionClicker',
          'tokens',
          'proxyLists',
          'accept_rules'
        ]
    )
  },
  methods: {
    ...mapActions('discordJoinerStore/discordJoiner', ['CREATE_TASK', 'VALIDATE_SINGLE_TOKEN']),
    ...mapMutations('discordJoinerStore/discordJoiner',
        [
          'CHANGE_CHECKBOX_REACTION_CLICKER',
          'CHANGE_CHECKBOX_SEND_COMMAND',
          'CHANGE_CHECKBOX_ACCEPT_RULES',
        ]
    ),
    ...mapMutations('popUpStore/popUp', ['POPUP_DISPLAY']),
    PRE_CREATE_TASK({inviteCode, tokens, delay, guildId, taskName}) {
      this.CREATE_TASK({inviteCode, tokens, delay, guildId, taskName})
      this.taskName = ''
    }

  }
}
</script>

<style scoped>
.work_space{
  background: #101722;
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
.input_element{
  background: #161E29;
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
  margin-right: 4.5%;
}
.row_position_input{
  margin-top: 2%;
  align-items: center;
}
.scroll{
  border-radius: 0 0 6px 6px;
  width: 16vw;
}
.scroll_item{
  height: 20%;
}
.mini_element{
  background: rgba(22,30,41,0.6);
  padding: 4% 3%;
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
.cross_icon{
  margin: 0 4.5%;
}
.first_element{
  padding: 0 3% 3% 3%;
}
.short_input{
  width: 16vw;
}
.click:active{
  background-color: rgba(53, 60, 73, 0.6);
}
.file_btn{
  display: none;
}
label{
  margin: 0;
}
</style>
