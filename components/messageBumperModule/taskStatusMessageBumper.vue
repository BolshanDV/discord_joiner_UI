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
export default {
  name: "taskStatusMessageBumper"
}
</script>

<style scoped>
/*@import url('../assets/style/taskStatus.css');*/
</style>
