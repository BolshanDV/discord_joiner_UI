<template>
    <div class="main_section">
      <div class="main_block task_manager">
        <task-manager/>
      </div>
      <div class="main_block information_section">
        <task-status/>
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
    ...mapGetters('web-app/discordJoinerStore/discord-joiner', ['renderKey']),
    ...mapGetters('web-app/discordJoinerStore/task-status', ['date'])
  },
}
</script>

<style scoped src="../../assets/style/components/mainPage.css">
</style>
