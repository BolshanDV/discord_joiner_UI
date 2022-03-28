<template>
  <div class="work_space_token column">
    <div class="work_space_element_title row_position work_space_element_advent">
      <div>Proxy list</div>
      <div class="row_position">
        <div>
          <img
              src="../../../assets/icons/add.svg" alt=""
              class="click icons_svg"
              @click="POPUP_DISPLAY('Proxy list')"
          >
          <label>
            <img src="../../../assets/icons/download.svg" alt=""
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

    <div
        v-if="proxyLists.length === 0"
        class="work_space_element row_position scroll space_element text"
    >
      Enter proxy list
    </div>
    <div
        v-else
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
          <img src="../../../assets/icons/cross.svg" alt="" class="icons_svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "proxyList",
  computed: {
    ...mapGetters('discordJoinerStore/discordJoiner',
        [
          'proxyLists',
        ]
    )
  },
  methods:{
    ...mapMutations('discordJoinerStore/discordJoiner', ['DELETE_PROXY_FROM_LIST']),
    ...mapMutations('popUpStore/popUp', ['POPUP_DISPLAY']),
    ...mapActions('readFileStore/readFile', ['READ_FILE_PROXY'])
  }
}
</script>

<style scoped src="../../../assets/style/field.css">

</style>
