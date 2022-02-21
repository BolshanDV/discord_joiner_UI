<template>
  <div>
    <div class="toasted">
      <div
          class="error_block"
          name="slide-fade"
      >
        <div class="toasted_element error"
             v-for="(toastedItem, index) in toasted"
             :key="index"
             @click="DELETE_TOASTED(index)"
        >
          <div class="content_text">{{toastedItem}}</div>
        </div>
<!--      </transition-group>-->
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
name: "toasted",
  computed: {
    ...mapGetters('toastedStore/toasted', ['toasted'])
  },
  methods: {
    ...mapMutations('toastedStore/toasted', ['DELETE_TOASTED'])
  }

}
</script>

<style scoped >

.toasted{
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 10;
}
.toasted_element {
  padding: 16px;
  border-radius: 4px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  min-width: 200px;
  margin-bottom: 16px;
}
.content_text{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.error_block{
  display: flex;
  flex-direction: column-reverse;
}
.error{
  background-color: rgba(119,2,0,0.82);
}
.success{
  background-color: rgba(26,120,91,0.83);
}
</style>
