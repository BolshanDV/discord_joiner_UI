<template>
  <div class="work_space_token column">
    <div class="work_space_element_title row_position work_space_element_advent">
      <div>Accounts tokens list</div>
      <div class="row_position">
        <div>
          <label>
            <img src="../../../assets/icons/download.svg"
                 alt=""
                 class="icons_svg"
            >
            <input
                type="file"
                class="file_btn"
                accept=".txt"
                @change=""
            >
          </label>
        </div>

      </div>
    </div>
    <div tabindex="3"
         class="space"
    >
      <div class="text-field">
        <input class="text-field__input input_element"
               type="search"
               name="search"
               autocomplete="off"
               placeholder="Enter message"
        >
      </div>
      <div
          class="work_space_element row_position scroll space_element"
      >
        <div
            class="row_position mini_element"

        >
          <div class="scroll_horizontal row_position">
            <div></div>
          </div>
          <div class="mini_element_icons"
          >
            <img src="../../../assets/icons/cross.svg" alt=""
                 class="icons_svg_cross"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "accountTokenFastMode"
}
</script>

<style scoped src="../../../assets/style/components/field.css">

</style>
