<template>
  <div class="work_space column">
    <div class="work_space_element_title row_position work_space_element_advent">
      <div>Message list</div>
      <div>
        <img src="../../assets/icons/download.svg" alt=""
             @click="POPUP_DISPLAY('Message list 2')"
        >
        <img src="../../assets/icons/download.svg" alt=""
             @click="DOWNLOADING_FILE"
             class="mini_element_icons"
             style="transform: rotate(180deg)"
        >
      </div>
    </div>
    <div class="text-field__icon">
      <input class="text-field__input input_element" v-model="message" type="search" name="search"  autocomplete="off" placeholder="Enter tokens list">
      <div
          class="text-field__aicon"
          @click="ADD_MESSAGE_TO_LISTS_WITH_CLEAN_UP(message)"
      ><img src="../../assets/icons/add.svg" alt="">
      </div>

    </div>
    <div
        class="work_space_element row_position space_element"
        v-if="messageList.length !== 0"
    >
      <div
          class="row_position mini_element"
          v-for="(message, index) in messageList"
          :key="index"
      >
        <div>#{{ message }}</div>
        <div class="mini_element_icons"
             @click="DELETE_MESSAGE(index)"
        >
          <img src="../../assets/icons/cross.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import modalPage from "../modalPage";
export default {
name: "messageList",
  components: {
    modalPage
  },
  data() {
    return {
      message: '',
    }
  },
  computed: {
    ...mapGetters('messageBumperStore/messageBumper', ['messageList']),
  },
  methods: {
    ...mapMutations('messageBumperStore/messageBumper',['ADD_MESSAGE_TO_LISTS', 'DELETE_MESSAGE']),
    ...mapMutations('popUpStore/popUp', ['POPUP_DISPLAY']),
    ...mapActions('messageBumperStore/messageBumper', ['DOWNLOADING_FILE']),
    ADD_MESSAGE_TO_LISTS_WITH_CLEAN_UP(message){
      this.ADD_MESSAGE_TO_LISTS(message);
      this.message = ''
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
.mini_element{
  background: #272D36;
  border-radius: 3px;
  padding: 1.2% 2.5%;
  margin: 1% 1.75%;
  justify-content: space-between;
  align-items: center;
}
.space_element{
  padding: 2%;
  flex-wrap: wrap;
}
.mini_element_icons{
  margin-left: 4px;
}
</style>
