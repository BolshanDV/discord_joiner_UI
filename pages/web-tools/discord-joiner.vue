<template>
    <div class="main_section">
      <div class="main_block task_manager">
        <task-manager/>
      </div>
      <div class="main_block information_section">
        <task-status

        />
        <task-logs
            name="discordJoiner"

        />
      </div>
    </div>
</template>

<script>
import taskManager from "../../components/discordJoinerModule/taskManager/taskManager";
import taskLogs from "../../components/discordJoinerModule/taskLogs";
import taskStatus from "../../components/discordJoinerModule/taskStatus";
import modalPage from "../../components/modalPage/modalPage";
import {mapGetters, mapActions} from 'vuex'
export default {
name: "home",
  middleware: ['authCheck'],
  components: {
    taskLogs,
    taskManager,
    taskStatus,
    modalPage
  },
  computed: {
    ...mapGetters('discordJoinerStore/discord-joiner.js', ['renderKey']),
    ...mapGetters('discordJoinerStore/task-status.js', ['date'])
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
