<template>
  <div class="column">
    <div>
      <p class="title">Task Manager</p>
    </div>
    <div class="work_space column">
      <div class="work_space_element_title">
        Channels list
      </div>
      <div class="text-field__icon">
        <input class="text-field__input input_element" v-model="channelList" type="search" name="search"  autocomplete="off" placeholder="Enter tokens list">
        <div
            class="text-field__aicon"
            @click="ADD_CHANNEL_TO_LISTS_WITH_CLEAN_UP(channelList)"
        >
          <img src="../../assets/icons/add.svg" alt="">
        </div>

      </div>
      <div
          class="work_space_element row_position scroll space_element"
          v-if="channelLists.length !== 0"
      >
        <div
            class="row_position mini_element"
            v-for="(channel, index) in channelLists"
            :key="index"
        >
            <div><img src="../../assets/images/channelImage.svg" alt=""></div>
            <div class="mini_element_icons ">
              <div class="scroll_horizontal scroll_horizontal_limit">
                #{{ channel }}
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
        Accounts tokens list
      </div>
      <div class="row_position ">
        <div class=" input_element_item">
          <div class="text-field__icon">
            <input class="text-field__input input_element short_input"
                   v-model="tokenList"
                   type="search"
                   name="search"
                   autocomplete="off"
                   placeholder="Enter tokens list">
            <div
                class="text-field__aicon"
                @click="CHANGE_FLAG()"
            >
              <img src="../../assets/icons/row.svg" alt=""
                   :class="{ row_rotate: dropDownFlagForAccountListMBumper &&  tokensList.length !== 0}"
              >
            </div>

          </div>
        </div>
        <div class="additional_functional work_space_element item"
             @click="POPUP_DISPLAY('Accounts tokens list Message Bumper')"
        >
          <img src="../../assets/icons/download.svg" alt="">
        </div>
        <div
            @click="ADD_TOKENS_LIST_AND_CLEAR(tokenList)"
            class="additional_functional work_space_element"
        >
          <img src="../../assets/icons/add.svg" alt="">
        </div>
      </div>
      <div>
        <div class="scroll column short_input"
             v-if="dropDownFlagForAccountListMBumper && (tokensList.length !== 0)"
        >
          <div
              class="row_position drop_down_element scroll_item"
              v-for="(tokensListItem, index) in tokensList"
              :key="index"
          >
            <div class="scroll_horizontal row_position">
              <div>{{tokensListItem}}</div>
            </div>

            <div
                class="cross_icon"
                @click="DELETE_TOKEN_FROM_LIST(index)"
            >
              <img src="../../assets/icons/cross.svg" alt="">
            </div>

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
          <input type="checkbox" class="switch_1" >
        </div>
      </div>
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model="deleteMasses"
               autocomplete="off"
               placeholder="30 (sec)"
               type="search"
               name="search">
      </div>
    </div>
    <message-list/>
    <div class="row_position row_position_btn">
      <div class="row_position row_position_btn_form">
        Create task
      </div>
    </div>
  </div>


</template>

<script>
import messageList from "./messageList";
import modalPage from "../modalPage";
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: "taskManagerBumper",
  components: {
    messageList,
    modalPage
  },
  data() {
    return {
      tokenList: '',
      delay: '',
      deleteMasses: '',
      channelList: ''
    }
  },
  computed: {
    ...mapGetters('messageBumperStore/messageBumper',
        [
          'channelLists',
          'dropDownFlagForAccountListMBumper',
          'tokensList']),
  },
  methods: {
    ...mapMutations('messageBumperStore/messageBumper',
        [
          'ADD_CHANNEL_TO_LISTS',
          'DELETE_CHANNEL',
          'ADD_TOKENS_LIST',
          'DELETE_TOKEN_FROM_LIST',
          'CHANGE_FLAG'
        ]),

    ...mapMutations('popUpStore/popUp',['POPUP_DISPLAY']),

    ADD_CHANNEL_TO_LISTS_WITH_CLEAN_UP(channelItem) {
      this.ADD_CHANNEL_TO_LISTS(channelItem);
      this.channelList = ''
    },
    ADD_TOKENS_LIST_AND_CLEAR(tokenList) {
      this.ADD_TOKENS_LIST(tokenList);
      this.tokenList = ''
    }
  }
}
</script>

<style scoped>
.work_space{
  background: rgba(16,23,34,0.6);
  border-radius: 5px;
  padding: 0 3% 3% 3%;
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
.short_input{
  width: 16vw;
  border-radius: 0 0 6px 6px;
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
</style>
