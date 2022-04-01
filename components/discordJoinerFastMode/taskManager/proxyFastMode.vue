<template>
  <div class="work_space_token column">
    <div class="work_space_element_title row_position work_space_element_advent">
      <div>Proxy list</div>
      <div class="row_position">
        <div>
          <label>
            <img src="../../../assets/icons/download.svg"
                 alt=""
                 class="icons_svg"
            >
            <input
                type="file"
                class="file_btn"
                accept=".txt"
                @change="READ_FILE_PROXY_FAST_MODE"
            >
          </label>
        </div>

      </div>
    </div>
    <div tabindex="3"
         class="space"
    >
      <div class="text-field">
        <input class="text-field__input input_element"
               v-model="proxyInput"
               @keyup.enter="EXTRACT_AND_SAVE_PROXY"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter message"
               :class="{input_space: proxy.length !== 0}"

        >
      </div>
      <div
          v-if="proxy.length !== 0"
          class="work_space_element row_position scroll space_element"
      >
        <div
            class="row_position mini_element"
            v-for="(proxyItem, index) in proxy"
            :key="index"

        >
          <div class="scroll_horizontal row_position">
            <div>{{proxyItem}}</div>
          </div>
          <div class="mini_element_icons"
               @click="DELETE_PROXY(index)"
          >
            <img src="../../../assets/icons/cross.svg" alt=""
                 class="icons_svg_cross"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {converter} from "~/store/web-app/discordJoinerStore/services/joinerServices/text-converter";

export default {
  name: "proxyFastMode",
  data() {
    return {
      proxyInput: "",
    }
  },
  computed: {
    ...mapGetters('web-app/discordJoinerFastModeStore/discord-joiner-fast-mode', ['proxy'])
  },
  methods: {
    ...mapActions('ui/readFileStore/readFile', ['READ_FILE_PROXY_FAST_MODE']),
    ...mapActions('web-app/discordJoinerFastModeStore/discord-joiner-fast-mode', ['SAVE_PROXY']),
    ...mapMutations('web-app/discordJoinerFastModeStore/discord-joiner-fast-mode', ['DELETE_PROXY']),
    EXTRACT_AND_SAVE_PROXY() {
      this.SAVE_PROXY(converter(this.proxyInput))
      this.proxyInput = ""
    }
  }
}
</script>

<style scoped src="../../../assets/style/components/field.css">

</style>
