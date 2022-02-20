<template>
  <div>
    <div class="toasted">
      <transition-group
          class="error_block"
          name="slide-fade"
      >
        <div>
          scs
        </div>
<!--        <div class="toasted_element"-->
<!--             v-for="(arrayError, index) in arrayErrors"-->
<!--             :key="arrayError.id"-->
<!--             :class="arrayError.style"-->
<!--             @click="DELETE_PUSH_UP(index)"-->
<!--        >-->
<!--          <div class="content_text">{{arrayError.text}}</div>-->
<!--        </div>-->
      </transition-group>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
name: "toasted",

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
