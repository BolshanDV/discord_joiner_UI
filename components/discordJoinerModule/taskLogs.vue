<template>
  <div class="column">
    <div>
      <p class="title">Tasks Logs</p>
    </div>
    <div
        class="work_space column scroll"
    >
      <div
          v-for="(logItem, index) in logs "
          :key="index"
          class="revers"
      >
        <div>
          <span>
            {{logItem.date.toLocaleString()}}\
          </span>
            <span>
            {{logItem.type}} \
          </span>
            <span :class="logItem.subtype">
            {{logItem.subtype}}
          </span>
            <span>
            \ {{logItem.logs}}
          </span>
        </div>

      </div>
    </div>

    <div class="row_position first_btn">
      <div class="row_position row_position_btn_form noActive"
           @click="CLEAR_LOGS"
      >
        Clear logs
      </div>
      <div class="row_position second_btn_element">
        <div class="row_position row_position_btn_form_error"
             @click="STOP_ALL_TASKS(name)"
        >
          Stop All
        </div>
        <div class="row_position row_position_btn_form"
             @click="START_ALL_TASKS(name)"
        >
          Start all
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: ['name'],
  name: "taskLogs",
  computed: {
    ...mapGetters('discordJoinerStore/taskStatus', ['logs', 'date'])
  },
  methods: {
    ...mapActions('discordJoinerStore/taskStatus', ['STOP_ALL_TASKS', 'CLEAR_LOGS']),
    ...mapActions('discordJoinerStore/discordJoiner', ['START_ALL_TASKS'])
  }
}
</script>

<style scoped>
.work_space{
  background: #101722;
  border-radius: 5px;
  padding: 2%;
  margin-top: 1%;
  min-height: 370px;
}
.first_btn{
  justify-content: space-between;
  margin-top: 2.75%;
}
.second_btn_element{
  width: 70%;
  justify-content: flex-end;
}
.btn_clear{
  background-color: rgba(22, 30, 41, 0.6);
  border: 2px solid rgba(24, 33, 44, 0.96);
}
.btn_clear:active{
  background: rgba(24, 33, 44, 0.96);
}
.INFO{
  color: #3b8069;
}
.ERROR{
  color: #7e2d2d;
}

</style>
