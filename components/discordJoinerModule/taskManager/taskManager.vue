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

        <div class="work_space_element_title">
          Delay
        </div>
        <div class="text-field">
          <input class="text-field__input input_element"
                 v-model="delay"
                 autocomplete="off"
                 placeholder="msec"
                 type="search"
                 name="search">
        </div>
    </div>
    <div class="work_space column">
      <div class="row_position work_space_element_advent ">
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
                 v-model="guildId"
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
      inviteCode: localStorage['inviteCode'] ? localStorage['inviteCode'] : '',
      token: '',
      proxy: '',
      delay: localStorage['delay'] ? localStorage['delay'] : '',
      guildId: localStorage['guildId'] ? localStorage['guildId'] : '',
      taskName: ''
    }
  },
  computed: {
    ...mapGetters('web-app/discordJoinerStore/discord-joiner',
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
    ...mapActions('web-app/discordJoinerStore/discord-joiner', ['CREATE_TASK', 'VALIDATE_SINGLE_TOKEN']),
    ...mapMutations('web-app/discordJoinerStore/discord-joiner',
        [
          'CHANGE_CHECKBOX_REACTION_CLICKER',
          'CHANGE_CHECKBOX_SEND_COMMAND',
          'CHANGE_CHECKBOX_ACCEPT_RULES',
        ]
    ),
    ...mapMutations('ui/popUpStore/popUp', ['POPUP_DISPLAY']),
    PRE_CREATE_TASK({inviteCode, tokens, delay, guildId, taskName}) {
      this.CREATE_TASK({inviteCode, tokens, delay, guildId, taskName})
      this.taskName = ''
    }

  }
}
</script>

<style scoped src="../../../assets/style/components/taskManger.css">
</style>
