<template>
  <div class="column">
    <div>
      <p class="title">Tasks Logo</p>
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
      <div class="row_position btn btn_clear"
           @click="CLEAR_LOGS"
      >
        Clear logs
      </div>
      <div class="row_position second_btn_element">
        <div class="row_position btn btn_stop"
             @click="STOP_ALL_TASKS"
        >
          Stop All
        </div>
        <div class="row_position btn btn_start"
             @click="START_ALL_TASKS"
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
  background: rgba(16,23,34,0.6);
  border-radius: 5px;
  padding: 2%;
  margin-top: 1%;
  min-height: 370px;
}
.btn{
  border-radius: 4px;
  color: #CCCCCC;
  font-size: 14px;
  line-height: 16px;
  width: 10vw;
  height: 5vh;
  justify-content: center;
}
.btn_start{
  background: rgba(43, 214, 162, 0.2);
  border: 1px solid #2BD6A2;
}
.btn_start:active{
  background: #2BD6A2;
}
.btn_stop{
  background: rgba(170, 26, 23, 0.2);
  border: 1px solid #AA1A17;
  margin-right: 20px;
}
.btn_stop:active{
  background: #AA1A17;

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
