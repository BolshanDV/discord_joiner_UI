export { default as BarElementNavbar } from '../../components/barElement/navbar.vue'
export { default as BarElementSidebar } from '../../components/barElement/sidebar.vue'
export { default as ModalPage } from '../../components/modalPage/modalPage.vue'
export { default as Toasted } from '../../components/toastedPart/toasted.vue'
export { default as MessageList } from '../../components/messageBumperModule/messageList.vue'
export { default as MessageBumperModuleTaskManageBumper } from '../../components/messageBumperModule/taskManageBumper.vue'
export { default as MessageBumperModuleTaskStatusMessageBumper } from '../../components/messageBumperModule/taskStatusMessageBumper.vue'
export { default as DiscordJoinerModuleTaskLogs } from '../../components/discordJoinerModule/taskLogs.vue'
export { default as DiscordJoinerModuleTaskStatus } from '../../components/discordJoinerModule/taskStatus.vue'
export { default as DiscordJoinerModuleTaskManagerReactionClicker } from '../../components/discordJoinerModule/taskManager/reactionClicker.vue'
export { default as DiscordJoinerModuleTaskManagerSendCommand } from '../../components/discordJoinerModule/taskManager/sendCommand.vue'
export { default as DiscordJoinerModuleTaskManager } from '../../components/discordJoinerModule/taskManager/taskManager.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
