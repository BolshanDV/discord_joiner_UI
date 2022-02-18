<template>
  <div class="main_section">
    <div class="main_block task_manager">
      <task-manager-bumper/>
    </div>
    <div class="main_block information_section">
      <taskStatusComponent/>
      <taskLogsComponent/>
    </div>
  </div>
</template>

<script>
import taskLogsComponent from "../components/discordJoinerModule/taskLogs";
import taskStatusComponent from "../components/discordJoinerModule/taskStatus";
import taskManagerBumper from "../components/messageBumperModule/taskManagerBumper";
export default {
  name: "home",
  components: {
    taskLogsComponent,
    taskStatusComponent,
    taskManagerBumper
  },
}
</script>

<style scoped>
.main_section{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0;
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
  background: rgba(8,13,22,0.6);
  padding: 1.5%;
}

</style>
