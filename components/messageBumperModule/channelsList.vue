<template>
  <div class="work_space_token column">
    <div class="work_space_element_title row_position work_space_element_advent">
      <div>Channels list</div>
    </div>
    <div tabindex="3"
         class="space"
    >
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model="channel"
               @keyup.enter="ADD_CHANNEL_TO_LISTS_WITH_CLEAR_UP"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter message"
               :class="{input_space: channelList.length !== 0}"
        >
      </div>
      <div
          v-if="channelList.length !== 0"
          class="work_space_element row_position scroll space_element"
      >
        <div
            class="row_position mini_element"
            v-for="(channel, index) in channelList"
            :key="index"
        >
          <div><img :src='channel.iconUrl' alt="" class="channel_icon"></div>
          <div class="mini_element_icons">
            <div class="scroll_horizontal scroll_horizontal_limit">
              #{{ channel.channelName }}
            </div>
          </div>
          <div class="mini_element_icons"
               @click="DELETE_CHANNEL(index)"
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
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "channelsList",
  data() {
    return {
      channel: '',
    }
  },
  computed:{
    ...mapGetters('messageBumperStore/messageBumper', ['channelList', 'singleToken'])
  },
  methods: {
    ...mapMutations('messageBumperStore/messageBumper', ['DELETE_CHANNEL']),
    ...mapActions('messageBumperStore/messageBumper', ['GET_CHANNEL_INFO']),
    ADD_CHANNEL_TO_LISTS_WITH_CLEAR_UP() {
      this.GET_CHANNEL_INFO({channelId: this.channel, token: this.singleToken.token})
      this.channel = ''
    },
  }
}
</script>

<style scoped src="assets/style/field.css">
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
.mini_element{
  background: #272D36;
  border-radius: 3px;
  padding: 1.2% 2.5%;
  margin: 1% 1.75%;
  justify-content: space-between;
  align-items: center;
  height: 20px;
}
</style>
