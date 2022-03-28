<template>
  <div class="work_space_token column">
    <div class="work_space_element_title row_position work_space_element_advent">
      <div>Accounts tokens list</div>
      <div class="row_position">
        <div>
          <img
              src="../../../assets/icons/add.svg" alt=""
              class="click icons_svg"
              @click="POPUP_DISPLAY('Accounts tokens Discord Joiner')"
          >
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
    <div
        v-if="tokens.length === 0"
        class="work_space_element row_position scroll space_element text"
    >
      Enter accounts tokens list
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
               class="icons_svg"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "accountTokens",
  computed: {
    ...mapGetters('discordJoinerStore/discordJoiner',
        [
          'tokens',
        ]
    )
  },
  methods: {
    ...mapActions('readFileStore/readFile', ['READ_FILE_TOKENS']),
    ...mapMutations('popUpStore/popUp', ['POPUP_DISPLAY']),
    ...mapMutations('discordJoinerStore/discordJoiner', ['DELETE_TOKEN_FROM_LIST'])
  }
}
</script>

<style scoped src="../../../assets/style/field.css">

</style>
