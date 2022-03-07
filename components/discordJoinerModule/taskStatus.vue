<template>
  <div class="column">
    <div>
      <p class="title">Tasks Status</p>
    </div>
    <div class="work_space column">
      <div class="work_space_element_title row_position work_space_element_advent " >
        <div class="row_position item">Task name</div>
        <div class="row_position item">Task Status</div>
        <div class="row_position column_item">Actions</div>
      </div>
      <div class="work_space_element row_position work_space_element_advent">
        <div class="row_position item">{{mainData.taskName}}</div>
        <div class="row_position item">All accounts joined</div>
        <div class="row_position column_item">
          <div class="icon_element"><img src="../../assets/icons/copy.svg" alt=""></div>
          <div class="icon_element"><img src="../../assets/icons/delete.svg" alt="" ></div>
          <div class="icon_element"><img src="../../assets/icons/play.svg" alt="" ></div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import {mapGetters} from 'vuex'
export default {
name: "taskStatus",
  computed: {
  ...mapGetters('discordJoinerStore/discordJoiner', ['mainData'])
  }
}
</script>

<style scoped>
.work_space{
  background: rgba(16,23,34,0.6);
  border-radius: 5px;
  padding: 2%;
  margin: 1% 0 3% 0;
}
.work_space_element{
  background: rgba(22,30,41,0.6);
  border-radius: 3px;
  padding: 2%;
  margin-top: 1%;

}
.work_space_element_advent{
  justify-content: space-between;
}
.row_position_btn{
  justify-content: flex-end;
  margin-top: 5%;
}
.icon_element{
  margin-right: 15%;
}
.column_item{
  width: 15%;
}
.work_space_element_title{
  padding: 0 2%;
}
.item{
  width: 30%;
}
</style>
