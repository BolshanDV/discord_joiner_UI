<template>
  <div class="column">
    <div>
      <p class="title">Task Manager</p>
    </div>

    <div class="work_space column first_element">
      <div class="work_space_element_title">
        Invite code
      </div>
        <div class="text-field">
          <input class="text-field__input input_element" v-model="taskName" autocomplete="off" placeholder="Enter invite code" type="search" name="search">
        </div>
      <div class="work_space_element_title">
        Accounts tokens list
      </div>
      <div class="row_position ">
        <div class=" input_element_item">
          <div class="text-field__icon">
            <input class="text-field__input input_element" v-model="token" type="search" name="search"  autocomplete="off" placeholder="Enter tokens list">
            <div
                class="text-field__aicon"
                @click="DROP_DOWN_LIST_WITH_TOKEN"
            ><img src="../../../assets/icons/row.svg" alt="" :class="{row_rotate: dropDownMenuFlagForToken}">
            </div>
          </div>
        </div>
        <div class="additional_functional work_space_element item"
             @click="POPUP_DISPLAY('Accounts tokens list Discord Joiner')"
        >
          <img src="../../../assets/icons/download.svg" alt="icon" class="">
        </div>
        <div class="additional_functional work_space_element"
             @click="ADD_TOKEN_WITH_CLEAR"
        >
          <img src="../../../assets/icons/add.svg" alt="icon" class="">
        </div>
      </div>
      <div>
        <div class="scroll column"
             v-if="dropDownMenuFlagForToken && (tokens.length !== 0)"
        >
          <div
              class="row_position mini_element scroll_item"
              v-for="(token, index) in tokens"
              :key="index"
          >
            <div class="scroll_horizontal row_position">
              <div class="scroll_item">{{token}}</div>
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
            <input class="text-field__input input_element" v-model="proxy" type="search" name="search"  autocomplete="off" placeholder="Enter proxy">
            <div
                class="text-field__aicon"
                @click="DROP_DOWN_LIST_WITH_PROXY"
            ><img src="../../../assets/icons/row.svg" alt="" :class="{row_rotate: dropDownMenuFlagForProxy}">
            </div>
          </div>
        </div>
        <div class="additional_functional work_space_element item"
             @click="POPUP_DISPLAY('Proxy list')"
        >
          <img src="../../../assets/icons/download.svg" alt="icon" class="">
        </div>
        <div class="additional_functional work_space_element"
             @click="ADD_PROXY_WITH_CLEAR(proxy)"
        >
          <img src="../../../assets/icons/add.svg" alt="icon" class="">
        </div>
      </div>
      <div>
        <div class="scroll column"
             v-if="dropDownMenuFlagForProxy && (proxyLists.length !== 0)"
        >
          <div
              class="row_position mini_element scroll_item"
              v-for="(proxy, index) in proxyLists"
              :key="index"
          >
            <div class="scroll_horizontal row_position">
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
              <input class="text-field__input input_element"  v-model="delay" autocomplete="off" placeholder="delay" type="search" name="search">
          </div>
        </div>
        <div>
          <div class="work_space_element_title">
            Invites per task
          </div>
          <div class="work_space_element row_position">
            <input class="text-field__input input_element" v-model="invitesPerTask" autocomplete="off" placeholder="Invites per task" type="search" name="search">
          </div>
        </div>
      </div>

    </div>
    <div class="work_space">
      <div class="row_position work_space_element_advent">
        <div>Reaction clicker</div>
        <div>
            <input type="checkbox" class="switch_1" v-model='selectedReactionClicker'>
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
      proxy: '',
      delay: '',
      invitesPerTask: ''

    }
  },
  computed: {
    ...mapGetters('discordJoinerStore/discordJoiner', ['tokens', 'dropDownMenuFlagForToken', 'proxyLists', 'dropDownMenuFlagForProxy'])
  },
  methods: {
    ...mapActions('discordJoinerStore/discordJoiner', ['CREATE_TASK', 'VALIDATE_SINGLE_TOKEN']),
    ...mapMutations('discordJoinerStore/discordJoiner', [ 'DROP_DOWN_LIST_WITH_TOKEN', 'DELETE_TOKEN_FROM_LIST', 'ADD_PROXY', 'DELETE_PROXY_FROM_LIST', 'DROP_DOWN_LIST_WITH_PROXY']),
    ...mapMutations('popUpStore/popUp', ['POPUP_DISPLAY']),
    ADD_TOKEN_WITH_CLEAR() {
      this.VALIDATE_SINGLE_TOKEN(this.token);
      this.token = ""
    },
    ADD_PROXY_WITH_CLEAR(proxy) {
      this.ADD_PROXY(proxy);
      this.proxy = ''
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
  align-items: center;
}
.scroll{
  position: absolute;
  width: 21%;
  padding: 0.5%;
  z-index: 2;
  background-color: #0D121A;
  border-radius: 5px;
}
.scroll_item{
  height: 20%;
}
.mini_element{
  background: #161e29;
  border-radius: 3px;
  padding: 2% 3%;
  margin: 1% 1.75%;
  justify-content: space-between;
  align-items: center;
}
.row_rotate{
  transform: rotate(180deg);
}
.cross_icon{
  margin-left: 4%;
}
.first_element{
  padding: 0 3% 3% 3%;
}
</style>
