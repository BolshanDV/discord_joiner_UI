<template>
  <div class="column">
    <div>
      <p class="title">Task Manager</p>
    </div>
    <div class="work_space column work_space_main">
      <div class="work_space_element_title">
        Invite code
      </div>
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model="inviteCode"
               @keyup.enter="CREATE_TASK"
               autocomplete="off"
               placeholder="Enter task name"
               type="search"
               name="search">
      </div>
      <account-token-fast-mode/>
      <proxy-fast-mode/>
      <div class="work_space_element_title">
        Delay
      </div>
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model="delay"
               autocomplete="off"
               placeholder="msec"
               type="search"
               name="search">
      </div>
    </div>
    <div class="row_position row_position_btn">
      <div class="row_position row_position_btn_form limit_btn"
           v-if="inviteCode !== '' && proxy.length !== 0 && accountToken.length !== 0"
           @click="CREATE_TASK"
      >
        Create and start task
      </div>
      <div class="row_position row_position_btn_form noActive limit_btn"
           v-else
      >
        Create and start task
      </div>
    </div>
  </div>
</template>

<script>
import accountTokenFastMode from "~/components/discordJoinerFastMode/taskManager/accountTokenFastMode";
import proxyFastMode from "~/components/discordJoinerFastMode/taskManager/proxyFastMode";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "taskManagerFastMode",
  components: {
    accountTokenFastMode,
    proxyFastMode
  },
  data() {
    return {
      inviteCode: '',
      delay: ''
    }
  },
  computed: {
    ...mapGetters('web-app/discordJoinerFastModeStore/discord-joiner-fast-mode', ['accountToken', 'proxy'])
  },
  methods: {
    ...mapActions('web-app/discordJoinerFastModeStore/discord-joiner-fast-mode', ['CREATE_TASK_AND_START']),
    CREATE_TASK() {
      if (this.inviteCode !== "" && this.accountToken.length !== 0 && this.proxy.length !== 0) {
        this.CREATE_TASK_AND_START({
          inviteCode: this.inviteCode,
          accountToken: this.accountToken,
          proxy: this.proxy,
          delay: this.delay
        }
        )
      }
      this.inviteCode = ''
    }
  }
}
</script>

<style scoped src="../../../assets/style/components/taskManger.css"></style>
<style>
.limit_btn{
  min-width: 200px;
}
</style>