<template>
  <div class="main_section">
    <div class="main_block task_manager">
      <task-manager-bumper/>
    </div>
    <div class="main_block information_section">
      <taskStatusMessageBumper/>
      <taskLogsComponent
          name="messageBumper"
      />
    </div>
  </div>
</template>

<script>
import taskLogsComponent from "../../components/discordJoinerModule/taskLogs";
import taskStatusMessageBumper from "../../components/messageBumperModule/taskStatusMessageBumper";
import taskManagerBumper from "../../components/messageBumperModule/taskManageBumper";
export default {
  name: "home",
  middleware: ['authCheck'],
  components: {
    taskLogsComponent,
    taskStatusMessageBumper,
    taskManagerBumper,
  },
}
</script>

<style scoped>
.main_section{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0;
  align-items: flex-start;
}
.task_manager{
  width: 35%;
}
.information_section{
  width: 63%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.main_block{
  border-radius: 5px;
  background: #0D121A;
  padding: 1.5%;
}

</style>
