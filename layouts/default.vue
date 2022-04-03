<template>
    <div class="body">
      <div class="sidebar">
        <Sidebar/>
      </div>
      <div class="main">
        <div class="navbar">
          <navbar/>
        </div>
        <div class="main_section scroll">
          <Nuxt/>
        </div>
      </div>
    </div>
</template>

<script>
import Sidebar from "../components/barElement/sidebar";
import navbar from "../components/barElement/navbar";
import {mapActions, mapGetters, mapMutations} from "vuex"
export default {
  name: "default",
  components: {
    Sidebar,
    navbar,
  },
  beforeMount() {
    this.PROCESS_LOGS()
    this.GET_DATA_FROM_LOCAL_STORAGE_DISCORD_JOINER()
    this.GET_DATA_FROM_LOCAL_STORAGE_MB()

  },
  computed: {
    ...mapGetters('ui/popUpStore/popUp', ['popUpFlag'])
  },
  methods: {
    ...mapActions('web-app/discordJoinerStore/task-status', ['PROCESS_LOGS']),
    ...mapMutations('web-app/discordJoinerStore/discord-joiner', ['GET_DATA_FROM_LOCAL_STORAGE_DISCORD_JOINER']),
    ...mapMutations('web-app/messageBumperStore/message-bumper', ['GET_DATA_FROM_LOCAL_STORAGE_MB'])
  }

}
</script>

<style scoped>
.body{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #161E29;
  min-height: 100vh;
}
.sidebar{
  background: #0D121A;
  width: 20%;
}
.main{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 80%;
  background: url("../assets/images/waveBackground.svg") 20% 50%/100% 100% no-repeat;
}
.main_section{
  padding: 3%;
}
.navbar{
  background-color: #080D16;
  height: 11vh;
}
.scroll{
  max-height: 90vh;
  scrollbar-width: none;
}
</style>
