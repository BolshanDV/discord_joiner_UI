<template>
  <div class="work_space_token column">
    <div class="work_space_element_title row_position work_space_element_advent">
      <div>Accounts tokens list</div>
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
                @change="READ_FILE_TOKENS"
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
               v-model="tokenInput"
               @keyup.enter="EXTRACT_AND_VALIDATE"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter message"
               :class="{input_space: tokens.length !== 0}"
        >
      </div>
      <div
          v-if="tokens.length !== 0"
          class="work_space_element row_position scroll space_element"
      >
        <div
            class="row_position mini_element"
            v-for="(token, index) in tokens"
            :key="index"
        >
          <div class="scroll_horizontal row_position">
            <div>{{token.username}}</div>
          </div>
          <div class="mini_element_icons"
               @click="DELETE_TOKEN_FROM_LIST(index)"
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
  name: "accountTokens",
  data() {
    return {
      tokenInput: "",
    }
  },
  computed: {
    ...mapGetters('web-app/discordJoinerStore/discord-joiner', ['tokens'])
  },
  methods: {
    ...mapActions('ui/readFileStore/readFile', ['READ_FILE_TOKENS']),
    ...mapActions('web-app/discordJoinerStore/discord-joiner', ['EXTRACT_AND_VALIDATE_TOKENS_FOR_DISCORD_JOINER']),
    ...mapMutations('web-app/discordJoinerStore/discord-joiner', ['DELETE_TOKEN_FROM_LIST']),
    EXTRACT_AND_VALIDATE() {
      this.EXTRACT_AND_VALIDATE_TOKENS_FOR_DISCORD_JOINER(this.tokenInput)
      this.tokenInput = ""
    },
  }
}
</script>

<style scoped src="../../../assets/style/components/field.css">

</style>
