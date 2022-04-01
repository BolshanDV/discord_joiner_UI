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
                @change="READ_FILE_ACCOUNT_FAST_MODE"
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
               v-model="token"
               @keyup.enter="EXTRACT_AND_VALIDATE"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter message"
               :class="{input_space: accountToken.length !== 0}"

        >
      </div>
      <div
          v-if="accountToken.length !== 0"
          class="work_space_element row_position scroll space_element"
      >
        <div
            class="row_position mini_element"
            v-for="(tokenItem, index) in accountToken"
        >
          <div class="scroll_horizontal row_position">
            <div>{{tokenItem.username}}</div>
          </div>
          <div class="mini_element_icons"
               @click="DELETE_TOKEN(index)"
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
import {converter} from "@/store/web-app/discordJoinerStore/services/joinerServices/parser";

export default {
  name: "accountTokenFastMode",
  data() {
    return {
      token: "",
    }
  },
  computed: {
    ...mapGetters('web-app/discordJoinerFastModeStore/discord-joiner-fast-mode', ['accountToken'])
  },
  methods: {
    ...mapActions('ui/readFileStore/readFile', ['READ_FILE_ACCOUNT_FAST_MODE']),
    ...mapActions('web-app/discordJoinerFastModeStore/discord-joiner-fast-mode', ['EXTRACT_AND_VALIDATE_TOKENS']),
    ...mapMutations('web-app/discordJoinerFastModeStore/discord-joiner-fast-mode', ['DELETE_TOKEN']),

    EXTRACT_AND_VALIDATE() {
      this.EXTRACT_AND_VALIDATE_TOKENS(converter(this.token))
      this.token = ""
    }
  }
}
</script>

<style scoped src="../../../assets/style/components/field.css">

</style>
