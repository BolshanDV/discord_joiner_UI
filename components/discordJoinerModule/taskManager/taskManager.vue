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
               placeholder="Enter invite code"
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
      <div class="work_space_element_title">
        Accounts tokens list
      </div>
      <div class="row_position ">
        <div class=" input_element_item">
          <div class="text-field__icon">
            <input class="text-field__input input_element short_input"
                   v-model="token"
                   type="search"
                   name="search"
                   autocomplete="off"
                   placeholder="Enter tokens list"
                   :class="{short_input_active: dropDownMenuFlagForToken}"
            >
            <div
                class="text-field__aicon"
                @click="DROP_DOWN_LIST_WITH_TOKEN"
            >
              <img src="../../../assets/icons/row.svg" alt=""
                  :class="{row_rotate: dropDownMenuFlagForToken}"
              >
            </div>
          </div>
        </div>
        <div class="additional_functional work_space_element item click"
             @click="POPUP_DISPLAY('Accounts tokens list Discord Joiner')"
        >
          <img src="../../../assets/icons/download.svg" alt="icon" class="">
        </div>
        <div class="additional_functional work_space_element click"
             @click="ADD_TOKEN_WITH_CLEAR"
        >
          <img src="../../../assets/icons/add.svg" alt="icon" class="">
        </div>
      </div>
      <div>
        <div class="scroll column short_input_drop_down_menu"
             v-if="dropDownMenuFlagForToken && (tokens.length !== 0)"
        >
          <div
              class="row_position mini_element scroll_item"
              v-for="(token, index) in tokens"
              :key="index"
          >
            <div class="scroll_horizontal row_position">
              <div class="scroll_item">{{token.username}}</div>
            </div>
              <div
                  class="cross_icon"
                  @click="DELETE_TOKEN_FROM_LIST(index)"
              >
                <img src="../../../assets/icons/cross.svg" alt="">
              </div>
          </div>
        </div>
      </div>
      <div class="work_space_element_title">
        Proxy list
      </div>
      <div class="row_position ">
        <div class="input_element_item">
          <div class="text-field__icon">
            <input class="text-field__input input_element short_input"
                   v-model="proxy"
                   type="search"
                   name="search"
                   autocomplete="off"
                   placeholder="Enter proxy"
                   :class="{short_input_active: dropDownMenuFlagForProxy}"
            >
            <div
                class="text-field__aicon"
                @click="DROP_DOWN_LIST_WITH_PROXY"
            ><img src="../../../assets/icons/row.svg" alt=""
                  :class="{row_rotate: dropDownMenuFlagForProxy && (proxyLists.length !== 0)}"
            >
            </div>
          </div>
        </div>
        <div class="additional_functional work_space_element item click"
             @click="POPUP_DISPLAY('Proxy list')"
        >
          <img src="../../../assets/icons/download.svg" alt="icon" class="">
        </div>
        <div class="additional_functional work_space_element click"
             @click="ADD_PROXY_WITH_CLEAR(proxy)"
        >
          <img src="../../../assets/icons/add.svg" alt="icon" class="">
        </div>
      </div>
      <div>
        <div class="scroll column short_input_drop_down_menu"
             v-if="dropDownMenuFlagForProxy && (proxyLists.length !== 0)"
        >
          <div
              class="row_position mini_element scroll_item"
              v-for="(proxy, index) in proxyLists"
              :key="index"
          >
            <div class="row_position scroll_horizontal">
              <div class="scroll_item">{{proxy}}</div>
            </div>

            <div
                class="cross_icon"
                @click="DELETE_PROXY_FROM_LIST(index)"
            >
              <img src="../../../assets/icons/cross.svg" alt="">
            </div>

          </div>
        </div>
      </div>

      <div class="row_position work_space_element_advent row_position_input">
        <div class="delay">
          <div class="work_space_element_title">
            Delay
          </div>
          <div class="work_space_element row_position">
              <input class="text-field__input input_element"
                     v-model="delay"
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
                v-model="invitesPerTask"
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
           @click="PRE_CREATE_TASK({inviteCode, tokens, delay, guildId, taskName})"
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
          'dropDownMenuFlagForToken',
          'proxyLists',
          'dropDownMenuFlagForProxy',
          'accept_rules'
        ]
    )
  },
  methods: {
    ...mapActions('discordJoinerStore/discordJoiner', ['CREATE_TASK', 'VALIDATE_SINGLE_TOKEN']),
    ...mapMutations('discordJoinerStore/discordJoiner',
        [
          'DROP_DOWN_LIST_WITH_TOKEN',
          'DELETE_TOKEN_FROM_LIST',
          'ADD_PROXY',
          'DELETE_PROXY_FROM_LIST',
          'DROP_DOWN_LIST_WITH_PROXY',
          'CHANGE_CHECKBOX_REACTION_CLICKER',
          'CHANGE_CHECKBOX_SEND_COMMAND',
          'CHANGE_CHECKBOX_ACCEPT_RULES',
        ]
    ),
    ...mapMutations('popUpStore/popUp', ['POPUP_DISPLAY']),
    ADD_TOKEN_WITH_CLEAR() {
      this.VALIDATE_SINGLE_TOKEN({token: this.token, name: 'discordJoiner'});
      this.token = ""
    },
    ADD_PROXY_WITH_CLEAR(proxy) {
      this.ADD_PROXY(proxy);
      this.proxy = ''
    },
    PRE_CREATE_TASK({inviteCode, tokens, delay, guildId, taskName}) {
      this.CREATE_TASK({inviteCode, tokens, delay, guildId, taskName})
      this.inviteCode = ''
      this.token = ''
      this.proxy = ''
      this.delay = ''
      this.invitesPerTask = ''
      this.guildId = ''
      this.taskName = ''
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
.row_position_btn_form:active{
  background: #2BD6A2;
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
</style>
