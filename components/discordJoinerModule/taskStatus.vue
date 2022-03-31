<template>
  <div class="column">
    <div>
      <p class="title">Tasks Status</p>
    </div>
    <div class="work_space column">
      <div class="work_space_element_title row_position work_space_element_advent " >
        <div class="row_position item_name">Task name</div>
        <div class="row_position item account_column">Accounts</div>
        <div class="row_position item">Task Status</div>
        <div class="row_position column_item">Actions</div>
      </div>
      <div
          v-for="(taskStatusItem, index) in taskStatus"
          :key="index"
          class="work_space_element row_position work_space_element_advent"
      >
        <div class="row_position item_name">{{taskStatusItem.taskName}}</div>
        <div class="row_position item account_column scroll_horizontal">
          <div
              class="row_position mini_element"
              v-for="(token, j) in taskStatusItem.tokens"
              :key="j"
          >
            <div class="mini_element_icons">
              <div class="scroll_horizontal scroll_horizontal_limit">
                {{ token.username }}
              </div>
            </div>
          </div>
        </div>
        <div class="row_position item"
             v-if="taskStatusItem.processingTask === '' "
        >
          0/{{taskStatusItem.tokens.length}}

        </div>
        <div class="row_position item success"
             v-if="taskStatusItem.processingTask === 'startProcess' && successTokens[index] === undefined "
        >
          Processing...
        </div>
        <div class="row_position item process"
             v-if="taskStatusItem.processingTask === 'startProcess' && successTokens[index] >= 0"
        >
          Running ({{successTokens[index]}}/{{taskStatusItem.tokens.length}})
        </div>
        <div class="row_position item success"
             v-if="taskStatusItem.processingTask === 'done'"
        >
          {{successTokens[index]}}/{{taskStatusItem.tokens.length}}
        </div>

        <div class="row_position column_item">
<!--          <div class="icon_element"><img src="../../assets/icons/copy.svg" alt=""></div>-->
          <div class="icon_element delete"
               @click="DELETE_TASK_STATUS(index)"
          >
            <img src="../../assets/icons/delete.svg" alt="" >
          </div>
          <div class="icon_element play"
               @click="PLAY_TASK(taskStatusItem)"
          >
            <img src="../../assets/icons/play.svg" alt="" >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
name: "taskStatus",
  computed: {
  ...mapGetters('discordJoinerStore/discord-joiner.js', ['taskStatus', 'successTokens']),
    ...mapGetters('discordJoinerStore/task-status.js', ['playStopFlag'])
  },
  methods: {
  ...mapMutations('discordJoinerStore/discord-joiner.js', ['DELETE_TASK_STATUS', 'CHANGE_ICON_STOP_AND_PLAY']),
  ...mapActions('discordJoinerStore/discord-joiner.js', ['UPDATE_TOKENS', 'PLAY_TASK']),
    ...mapActions('discordJoinerStore/task-status.js', ['PAUSE_TASK', 'PLAY'])
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
  padding: 2%;
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
  width: 15%;
  justify-content: center;
}
.work_space_element_title{
  padding: 0 2%;
}
.item{
  width: 20%;
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
.delete:active{
  background-color: #7e2d2d;
  border-radius: 5px;
}
.play:active{
  background-color: #3b8069;
  border-radius: 5px;
}
.account_column{
  width: 45%;
  margin-right: 15px;
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
.item_name{
  width: 15%;
}
</style>
