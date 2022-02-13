<template>
  <div class="column">
    <div class="work_space_element_title">Channel id</div>
    <div class="work_space_element row_position">
      939163056561348638
    </div>
    <div class="work_space_element_title">Message id</div>
    <div class="work_space_element row_position">
      941771715887919134
    </div>
    <div class="work_space_element_title">Reaction id</div>
    <div class="work_space_element row_position">
      941771715887919134
    </div>
    <div class="work_space_element_title">Reaction click delay</div>
    <div class="work_space_element row_position">
      5555
    </div>
    <div class="row_position work_space_element_advent">
      <div>Reaction clicker only mode</div>
      <div>
        <b-form-checkbox name="check-button" switch></b-form-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "reactionClicker"
}
</script>

<style scoped>
.work_space{
  background: rgba(16,23,34,0.6);
  border-radius: 5px;
  padding: 3%;
  margin-top: 2%;
  /*width: 100%;*/
}
.work_space_element{
  background: rgba(22,30,41,0.6);
  border-radius: 3px;
  height: 6%;
  padding: 2%;
  margin-top: 2.75%;

}
.work_space_element_title{
  margin-top: 3.75%;
}
.work_space_element_advent{
  justify-content: space-between;
  margin-top: 3.75%;
}

</style>
