<template>
  <div class="popUp">
    <div class="popUp_delete">
      <div class="main_text row_position">
        <div>{{ namePopUp }}</div>
        <div
            @click="POPUP_DISPLAY('')"
        >
          <img src="../../assets/icons/cross.svg" alt="">
        </div>
      </div>
      <div class="column">
        <div>
          <b-form-textarea
              id="textarea"
              placeholder="Enter"
              rows="3"
              v-model="text"
              max-rows="6"
              class="text-area"
          >
          </b-form-textarea>
        </div>
        <div class="row_position button_popUp">
          <b-button
              tag="div"
              variant="outline-info"
              class="row_position_btn_form btn_color btn_stop"
              @click="POPUP_DISPLAY('')"
          >
            Clear all
          </b-button>
          <b-button
              tag="div"
              variant="outline-info"
              class="row_position_btn_form btn_color"
              @click="EXTRACT_AND_VALIDATE(text)"
          >
            Add
          </b-button>


        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from 'vuex'
export default {
  name: "popUp",
  data(){
    return{
      text: ""
    }
  },
  computed: {
    ...mapGetters('ui/popUpStore/popUp', ['namePopUp']),
  },
  methods: {
    ...mapMutations('ui/popUpStore/popUp', ['POPUP_DISPLAY']),
    ...mapActions('ui/popUpStore/popUp', ['EXTRACT_AND_VALIDATE']),
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
  justify-content: flex-end;
  margin-top: 1.5vh;
}
.popUp_delete{
  padding: 1%;
  background: #0D121A;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  box-shadow: 20px 30px 30px 35px rgba(0, 0, 0, .5);
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
.text-area{
  background-color: rgba(22,30,41,0.6);
  color: #CCCCCC;
  height: 40vh !important;
  border-color: rgba(22,30,41,0.6);
}
.row_position_btn_form{
  background: rgba(43, 214, 162, 0.2);
  border: 1px solid #2BD6A2;
  box-sizing: border-box;
  border-radius: 4px;
  color: #CCCCCC;
  width: 25%;
  margin-left: 20px;
}
.btn_stop{
  background: rgba(170, 26, 23, 0.2);
  border: 1px solid #AA1A17;
}
</style>
