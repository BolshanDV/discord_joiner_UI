<template>
  <div class="popUp_delete">
      <div class="main_text row_position">
        <div class="title">API Keys</div>
      </div>
      <div class="column">
        <div class="work_space">
          <div>CapMonster API Key</div>
          <div class="text-field">
            <input class="text-field__input input_element"
                   @keyup.enter="SAVE_KEY(key)"
                   autocomplete="off"
                   type="search"
                   name="search"
                   value="key"
                   v-model="key"
            >
          </div>
        </div>

      </div>
      <div class="row_position button_popUp">
        <b-button
            tag="div"
            variant="outline-info"
            class="row_position_btn_form btn_color"
            @click="SAVE_KEY(key)"
        >
          Save
        </b-button>
      </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import authCheck from "../../middleware/authCheck";

export default {
  name: "captchaSettings",
  middleware: ['authCheck'],
  data() {
    return {
      key: localStorage['capMonster'] ? localStorage['capMonster'] : ''
    }
  },
  beforeMount() {
    this.SAVE_KEY(this.key)
  },
  methods: {
    ...mapActions('web-app/captchaSettingsStore/settings', ['SAVE_KEY'])
  }
}
</script>

<style scoped>
.work_space{
  background-color: #101722;
  border-radius: 5px;
  padding: 2% 3%;
  margin-bottom: 1%;
}
.work_space_element_advent{
  justify-content: space-between;
  align-items: center;
}

.btn_color{
  color: #C4C4C4;
  background-color: #1f2a39;
  padding: 5px;
  width: 170px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
.button_popUp{
  justify-content: flex-end;
  margin-top: 1.5vh;
}
.popUp_delete{
  padding: 1.75%;
  background: #0D121A;
  margin-left: 0.6%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
}
.item{
  margin-right: 20px;
}
.main_text {
  text-align: center;
  margin-bottom: 2%;
  justify-content: space-between;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
}
.row_position_btn_form{
  background: rgba(43, 214, 162, 0.2);
  border: 1px solid #2BD6A2;
  box-sizing: border-box;
  border-radius: 4px;
  color: #CCCCCC;
  width: 20%;
  margin-left: 20px;
}
.input_element{
  margin-top: 1.75%;
}
</style>
