<template>

    <div class="main_section">
      <modal-page v-if="popUpFlag"/>
      <div class="main_block task_manager">
        <task-manager/>
      </div>
      <div class="main_block information_section">
        <task-status/>
        <task-logs/>
      </div>
    </div>
</template>

<script>
import taskManager from "../components/discordJoinerModule/taskManager/taskManager";
import taskLogs from "../components/discordJoinerModule/taskLogs";
import taskStatus from "../components/discordJoinerModule/taskStatus";
import modalPage from "../components/discordJoinerModule/modalPage";
import {mapGetters} from 'vuex'
export default {
name: "home",
  components: {
    taskLogs,
    taskManager,
    taskStatus,
    modalPage
  },
  computed: {
    ...mapGetters('discordJoinerStore/discordJoiner', ['popUpFlag'])
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
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -75px;
  width: 100vh;
}

.modal_container {
  background-color: #fff;
  width: 200px;
  height: 150px;
}
</style>
