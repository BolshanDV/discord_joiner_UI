<template>
  <div class="work_space_token column">
    <div class="work_space_element_title row_position work_space_element_advent">
      <div>Message list</div>
      <div class="row_position">
        <div>
          <label>
            <img src="../../assets/icons/download.svg"
                 alt=""
                 class="icons_svg"
            >
            <input
                type="file"
                class="file_btn"
                accept=".txt"
                @change="FILE_READ_MESSAGES"
            >
          </label>
        </div>

      </div>
    </div>
    <div tabindex="3"
         class="space"
    >
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model="message"
               @keyup.enter="ADD_MESSAGE_TO_LISTS_WITH_CLEAN_UP"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter message"
               :class="{input_space: messageList.length !== 0}"
        >
      </div>
      <div
          v-if="messageList.length !== 0"
          class="work_space_element row_position scroll space_element"
      >
        <div
            class="row_position mini_element"
            v-for="(message, index) in messageList"
            :key="index"
        >
          <div class="scroll_horizontal row_position">
            <div>{{message}}</div>
          </div>
          <div class="mini_element_icons"
               @click="DELETE_MESSAGE(index)"
          >
            <img src="../../assets/icons/cross.svg" alt=""
                 class="icons_svg_cross"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import modalPage from "../modalPage/modalPage";
import {converter} from "@/store/web-app/discordJoinerStore/services/joinerServices/text-converter";
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
    ...mapGetters('web-app/messageBumperStore/message-bumper', ['messageList']),
  },
  methods: {
    ...mapMutations('web-app/messageBumperStore/message-bumper',['ADD_MESSAGE_TO_LISTS', 'DELETE_MESSAGE']),
    ...mapMutations('ui/popUpStore/popUp', ['POPUP_DISPLAY']),
    ...mapActions('web-app/messageBumperStore/message-bumper', ['DOWNLOADING_FILE']),
    ...mapActions('ui/readFileStore/readFile', ['FILE_READ_MESSAGES']),
    ADD_MESSAGE_TO_LISTS_WITH_CLEAN_UP(){
      this.ADD_MESSAGE_TO_LISTS(converter(this.message));
      this.message = ''
    }
  }

}
</script>

<style scoped src="assets/style/field.css">

</style>
