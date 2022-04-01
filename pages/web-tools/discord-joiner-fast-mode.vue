<template>
  <div class="main_section">
    <div class="main_block task_manager">
      <task-manager-fast-mode/>
    </div>
    <div class="main_block information_section">
      <task-status-fast-mode/>
      <task-logs
          name="fastMode"
      />
    </div>
  </div>
</template>

<script>
import taskLogs from "~/components/discordJoinerModule/taskLogs";
import taskManagerFastMode from "~/components/discordJoinerFastMode/taskManager/taskManagerFastMode";
import taskStatusFastMode from "~/components/discordJoinerFastMode/taskStatusFastMode";
import {mapGetters} from "vuex";
export default {
  name: "discord-joiner-fast-mode",
  components: {
    taskLogs,
    taskManagerFastMode,
    taskStatusFastMode
  },
}
</script>

<style scoped src="../../assets/style/components/mainPage.css">

</style>
