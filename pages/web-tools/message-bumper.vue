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

<style scoped src="../../assets/style/components/mainPage.css">
</style>
