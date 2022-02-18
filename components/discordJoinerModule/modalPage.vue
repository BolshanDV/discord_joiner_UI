<template>
  <div class="popUp">
    <div class="popUp_delete">
      <div class="main_text"><div>Add discord target tokens list</div></div>
      <div class="column">
        <div>
          <b-form-textarea
              id="textarea"
              placeholder="Example:
  ODcwNTM4NzcxNTA0OTc1ODgy.YQOOqA.UhiVDRz_9o73bS6lcS5dW5YyPwQ
  ODcwNTM5MjQ5ODU2OTU4NDY1.YQOPGg.1_QVPO3dKWS4O7CUDQ7dIKi_RMc
  ODcwNTM5NTI3NjQxNTI2Mjcz.YQOPXA.yaopn1QmVG-8YxD5EY23FA9P8tc"
              rows="3"
              v-model="text"
              max-rows="6"
              class="text-area"
          >
          </b-form-textarea>
        </div>
        <div class="button_popUp">

          <b-button
              tag="div"
              variant="outline-info"
              class="row_position_btn_form btn_color"
              @click="POPUP_DISPLAY"
          >
            Close
          </b-button>
          <b-button
              tag="div"
              variant="outline-info"
              class="row_position_btn_form btn_color btn_stop"
              @click="ADD_TOKENS(text)"
          >
            Add
          </b-button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
export default {
  name: "popUp",
  data(){
    return{
      text: ""
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations('discordJoinerStore/discordJoiner', ['POPUP_DISPLAY']),
    ...mapActions('discordJoinerStore/discordJoiner', ['ADD_TOKENS'])
  }

}
</script>

<style scoped>
.popUp{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;
  z-index: 100;
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
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
}
.popUp_delete{
  padding: 3%;
  /*height: 50%;*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(22,30,41,0.96);
  /*margin:0 25% 0 25%;*/
  width: 60%;
  box-shadow: 20px 30px 30px 35px rgba(0, 0, 0, .5);
  border-radius: 5px;
}
.item{
  margin-right: 20px;
}
.main_text {
  font-size: 25px;
  line-height: 31px;
  text-align: center;
  margin-bottom: 2%;
}
.text-area{
  background-color: rgba(22,30,41,0.6);
  color: #CCCCCC;
  height: 120%;
}
.row_position_btn_form{
  background: rgba(43, 214, 162, 0.2);
  border: 1px solid #2BD6A2;
  box-sizing: border-box;
  border-radius: 4px;
  color: #CCCCCC;
  width: 25%;

}
.btn_stop{
  background: rgba(170, 26, 23, 0.2);
  border: 1px solid #AA1A17;
  margin-left: 20px;
}
</style>
