<template>
  <div class="column">
    <div>
      <p class="title">Tasks Status</p>
    </div>
    <div class="work_space column">
      <div class="work_space_element_title row_position work_space_element_advent " >
        <div class="row_position item column_name">Task name</div>
        <div class="row_position item channel_column">Channel</div>
        <div class="row_position item column_status">Task Status</div>
        <div class="row_position column_item">Actions</div>
      </div>
      <div
          v-for="(taskStatusItem, index) in tasksStatusMessageBumper"
          :key="index"
          class="work_space_element row_position work_space_element_advent"
      >
        <div class="row_position item column_name">{{taskStatusItem.taskName}}</div>
        <div class="row_position item channel_column scroll_horizontal">
          <div
              class="row_position mini_element"
              v-for="(channel, j) in taskStatusItem.channelList"
              :key="j"
          >
            <div><img :src='channel.iconUrl' alt="" class="channelIcon"></div>
            <div class="mini_element_icons">
              <div class="scroll_horizontal scroll_horizontal_limit">
                #{{ channel.channelName }}
              </div>
            </div>
          </div>
        </div>
        <div class="row_position item column_status success"
             v-if="taskStatusItem.loopMessageObj.active"
        >
          loop {{taskStatusItem.loopMessageObj.loopIteration}}
        </div>
        <div class="row_position item column_status"
             :class="taskStatusItem.processingTaskObj.style"
             v-else
        >
          {{taskStatusItem.processingTaskObj.text}}
        </div>
        <div class="row_position column_item">
          <div class="icon_element delete"
               @click="DELETE_TASK_MESSAGE_BUMPER(index)"
          >
            <img src="../../assets/icons/delete.svg" alt="" >
          </div>
          <div class="icon_element play"
               @click="PlAY_TASK_MESSAGE_BUMPER(taskStatusItem)"
          >
            <img src="../../assets/icons/play.svg" alt="" >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from "vuex";
export default {
  name: "taskStatusMessageBumper",
  computed: {
    ...mapGetters('messageBumperStore/messageBumper', ['tasksStatusMessageBumper'])
  },
  methods: {
    ...mapActions('messageBumperStore/messageBumper', ['PlAY_TASK_MESSAGE_BUMPER']),
    ...mapMutations('messageBumperStore/messageBumper', ['DELETE_TASK_MESSAGE_BUMPER'])
  }
}
</script>

<style scoped>
.work_space{
  background: #101722;
  border-radius: 5px;
  padding: 2%;
  margin: 1% 0 3% 0;
}
.work_space_element{
  background: rgba(22,30,41,0.6);
  border-radius: 3px;
  padding: 1%;
  margin-top: 1%;
}
.work_space_element_advent{
  justify-content: space-between;
}
.row_position_btn{
  justify-content: flex-end;
  margin-top: 5%;
}
.icon_element{
  margin-right: 8%;
}
.column_item{
  width: 17%;
  justify-content: center;
}
.work_space_element_title{
  padding: 0 1%;
}
.item{
  width: 30%;
}
.play{
  margin-right: 5%;
}
.success{
  color: #2BD6A2;
}
.process{
  color: rgba(255,203,89,0.81);
}
.failed{
  color: #FF0300;
}
.delete:active{
  background-color: #7e2d2d;
  border-radius: 5px;
}
.play:active{
  background-color: #3b8069;
  border-radius: 5px;
}
.channel_column{
  width: 45%;
  margin-right: 15px;
}
.channelIcon{
  height: 18px;
  width: 18px;
  border-radius: 50%;
}
.mini_element_icons{
  margin-left: 4px;
}
.mini_element{
  background: #272D36;
  border-radius: 3px;
  padding: 1.2% 2.5%;
  margin: 0 1.75% 0 0;
  justify-content: space-between;
  align-items: center;
}
.column_name{
  width: 20%;
}
.column_status{
  width: 18%;
}
.default{
  color: #494950;
}
</style>
