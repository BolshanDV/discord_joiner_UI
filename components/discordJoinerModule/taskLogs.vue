<template>
  <div class="column">
    <div>
      <p class="title">Tasks Logo</p>
    </div>
    <div class="work_space column">
      <div> 01
        03/22 08:51:01 INFO   :.main: *************** RSVP Agent started ***************
        02
        03/22 08:51:01 INFO   :...locate_configFile: Specified configuration file: /u/user10/rsvpd1.conf
        03/22 08:51:01 INFO   :.main: Using log level 511
        03/22 08:51:01 INFO   :..settcpimage: Get TCP images rc - EDC8112I Operation not supported on socket.
        03
        03/22 08:51:01 INFO   :..settcpimage: Associate with TCP/IP image name = TCPCS
        03/22 08:51:02 INFO   :..reg_process: registering process with the system
        03/22 08:51:02 INFO   :..reg_process: attempt OS/390 registration
        03/22 08:51:02 INFO   :..reg_process: return from registration rc=0
        04
        03/22 08:51:06 TRACE  :...read_physical_netif: Home list entries returned = 7
        03/22 08:51:06 INFO   :...read_physical_netif: index #0, interface VLINK1 has address 129.1.1.1, ifidx 0
        03/22 08:51:06 INFO   :...read_physical_netif: index #1, interface TR1 has address 9.37.65.139, ifidx 1
      </div>
    </div>
    <div class="row_position first_btn">
      <div class="row_position btn btn_clear">Clear logs</div>
      <div class="row_position second_btn_element">
        <div class="row_position btn btn_stop ">Stop All</div>
        <div class="row_position btn btn_start">Start all</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
name: "taskLogs"
}
</script>

<style scoped>
.work_space{
  background: rgba(16,23,34,0.6);
  border-radius: 5px;
  padding: 2%;
  margin-top: 1%;
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
  background: #1F2A39;
}
.btn_clear:active{
  background: #454c5f;
}
</style>
