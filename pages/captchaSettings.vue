<template>
  <div class="popUp_delete">
    <div>
      <div class="main_text row_position">
        <div>API Keys</div>
      </div>
      <div class="column">
        <div class="row_position between">
          <div class="work_space element">
            <div class="row_position work_space_element_advent">
              <div>CapMonster</div>
              <div >
                <input
                    v-model="capMonster"
                    type="checkbox"
                    class="switch_1"
                    @click="CHANGE_FLAG_CAPTCHA('capMonster')"
                >
              </div>
            </div>
          </div>
          <div class="work_space element">
            <div class="row_position work_space_element_advent">
              <div>2captcha</div>
              <div>
                <input
                    v-model="captcha2"
                    type="checkbox"
                    class="switch_1"
                    @click="CHANGE_FLAG_CAPTCHA('2captcha')"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="text-field">
          <input class="text-field__input input_element"
                 @keyup.enter="SAVE_KEY(key)"
                 autocomplete="off"
                 placeholder="Enter API Key"
                 type="search"
                 name="search"
                 v-model="key"
          >
        </div>
      </div>
      <div class="row_position button_popUp">
        <b-button
            tag="div"
            variant="outline-info"
            class="row_position_btn_form btn_color"
            @click="SAVE_KEY(key)"
        >
          Add
        </b-button>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "captchaSettings",
  data() {
    return {
      key: '',
    }
  },
  computed: {
    ...mapGetters('captchaSettingsStore/settings', ['capMonster', 'captcha2'])
  },
  methods: {
    ...mapMutations('captchaSettingsStore/settings', ['CHANGE_FLAG_CAPTCHA']),
    ...mapActions('captchaSettingsStore/settings', ['SAVE_KEY'])
  }
}
</script>

<style scoped>
.work_space{
  background-color: #101722;
  border-radius: 5px;
  padding: 1.5% 2%;
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
/*.column{*/
/*  background-color: #101722;*/
/*  padding: 2%;*/
/*  border-radius: 5px;*/
/*}*/
.element{
  width: 35%;
}
.between{
  justify-content: space-between;
}
</style>
