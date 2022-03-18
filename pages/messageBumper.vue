<template>
  <div class="main_section">
    <div class="main_block task_manager">
      <task-manager-bumper/>
    </div>
    <div class="main_block information_section">
      <taskStatusMessageBumper/>
      <taskLogsComponent/>
    </div>
  </div>
</template>

<script>
import taskLogsComponent from "../components/discordJoinerModule/taskLogs";
import taskStatusMessageBumper from "../components/messageBumperModule/taskStatusMessageBumper";
import taskManagerBumper from "../components/messageBumperModule/taskManageBumper";
import modalPage from "../components/modalPage/modalPage";
import {mapGetters} from "vuex";
export default {
  name: "home",
  components: {
    taskLogsComponent,
    taskStatusMessageBumper,
    taskManagerBumper,
    modalPage
  },
  computed: {
  }
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
