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
               autocomplete="off"
               placeholder="Enter task name"
               type="search"
               name="search">
      </div>
      <account-token-fast-mode/>
      <proxy-fast-mode/>
    </div>
  </div>
</template>

<script>
import accountTokenFastMode from "~/components/discordJoinerFastMode/taskManager/accountTokenFastMode";
import proxyFastMode from "~/components/discordJoinerFastMode/taskManager/proxyFastMode";
export default {
  name: "taskManagerFastMode",
  components: {
    accountTokenFastMode,
    proxyFastMode
  },
  data() {
    return {
      inviteCode: '',
    }
  },
}
</script>

<style scoped src="../../../assets/style/components/taskManger.css">

</style>
