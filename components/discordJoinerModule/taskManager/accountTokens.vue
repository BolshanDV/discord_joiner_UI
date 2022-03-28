<template>
  <div class="work_space_token column">
    <div class="work_space_element_title row_position work_space_element_advent">
      <div>Accounts tokens list</div>
      <div class="row_position">
        <div>
          <img
              src="../../../assets/icons/add.svg" alt=""
              class="click"
              @click="POPUP_DISPLAY('Accounts tokens Discord Joiner')"
          >
          <label>
            <img src="../../../assets/icons/download.svg" alt=""
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
    <div class="text-field__icon">
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
          <img src="../../../assets/icons/cross.svg" alt="">
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

<style scoped>
.work_space_token{
  border-radius: 5px;
  /*padding: 0 3% 3% 3%;*/
  margin-top: 2%;
}
.work_space_element{
  background: rgba(22,30,41,0.6);
  border-radius: 3px;
  height: 6%;
}
.work_space_element_title{
  margin-top: 3.5%;
  margin-bottom: 2.5%;
}
.work_space_element_advent{
  justify-content: space-between;
  align-items: center;
}
.mini_element{
  background: #272D36;
  border-radius: 3px;
  padding: 1.2% 2.5%;
  margin: 1% 1.75%;
  justify-content: space-between;
  align-items: center;
}
.space_element{
  padding: 1%;
  flex-wrap: wrap;
  width: 100%;
}
.mini_element_icons{
  margin-left: 4px;
}
.mini_element:hover{
  text-decoration: none;
  background: #161e29;
}
.input_element{
  background-color: rgba(22,30,41,0.6);
  border: none;
}
.scroll_horizontal{
  max-width: 150px;
}
.file_btn{
  display: none;
}
label{
  margin: 0;
}
.text{
  color: rgba(94,97,103,0.81)	;
  padding: 1vh;
}
</style>
