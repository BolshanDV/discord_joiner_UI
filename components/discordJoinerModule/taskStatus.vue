<template>
  <div class="column">
    <div>
      <p class="title">Tasks Status</p>
    </div>
    <div class="work_space column">
      <div class="work_space_element_title row_position work_space_element_advent " >
        <div class="row_position item">Task name</div>
        <div class="row_position item">Task Status</div>
        <div class="row_position column_item">Actions</div>
      </div>
      <div
          v-for="(taskStatusItem, index) in taskStatus"
          :key="index"
          class="work_space_element row_position work_space_element_advent"
      >
        <div class="row_position item">{{taskStatusItem.taskName}}</div>
        <div class="row_position item"
             v-if="taskStatusItem.processingTask === '' "
        >
          0/{{taskStatusItem.tokens.length}}
        </div>
        <div class="row_position item success"
             v-if="taskStatusItem.processingTask === 'startProcess' && successTokens[index] === null"
        >
          Processing...
        </div>
        <div class="row_position item process"
             v-if="taskStatusItem.processingTask === 'startProcess' && successTokens[index] > 0"
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
          <div class="icon_element"
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
  ...mapGetters('discordJoinerStore/discordJoiner', ['taskStatus', 'successTokens']),
    ...mapGetters('discordJoinerStore/taskStatus', ['playStopFlag'])
  },
  methods: {
  ...mapMutations('discordJoinerStore/discordJoiner', ['DELETE_TASK_STATUS', 'CHANGE_ICON_STOP_AND_PLAY']),
  ...mapActions('discordJoinerStore/discordJoiner', ['UPDATE_TOKENS', 'PLAY_TASK']),
    ...mapActions('discordJoinerStore/taskStatus', ['PAUSE_TASK', 'PLAY'])
  }
}
</script>

<style scoped>
.work_space{
  background: rgba(16,23,34,0.6);
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
  width: 20%;
}
.work_space_element_title{
  padding: 0 2%;
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
</style>
