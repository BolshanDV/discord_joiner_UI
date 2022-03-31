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
                @change="READ_FILE_PROXY"
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
               @keyup.enter="EXTRACT_AND_VALIDATE"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter message"
               :class="{input_space: proxyLists.length !== 0}"
        >
      </div>
      <div
          v-if="proxyLists.length !== 0"
          class="work_space_element row_position scroll space_element"
      >
        <div
            class="row_position mini_element"
            v-for="(proxy, index) in proxyLists"
            :key="index"
        >
          <div class="scroll_horizontal row_position">
            <div>{{proxy}}</div>
          </div>
          <div class="mini_element_icons"
               @click="DELETE_PROXY_FROM_LIST(index)"
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

export default {
  name: "proxyList",
  data() {
    return {
      proxyInput: "",
    }
  },
  computed: {
    ...mapGetters('discordJoinerStore/discord-joiner.js', ['proxyLists',])
  },
  methods:{
    ...mapMutations('discordJoinerStore/discord-joiner.js', ['DELETE_PROXY_FROM_LIST']),
    ...mapMutations('popUpStore/popUp', ['POPUP_DISPLAY']),
    ...mapActions('readFileStore/readFile', ['READ_FILE_PROXY']),
    ...mapActions('discordJoinerStore/discord-joiner.js', ['EXTRACT_AND_VALIDATE_PROXY']),

    EXTRACT_AND_VALIDATE() {
      this.EXTRACT_AND_VALIDATE_PROXY(this.proxyInput)
      this.proxyInput = ""
    }
  }
}
</script>

<style scoped src="../../../assets/style/field.css">

</style>
