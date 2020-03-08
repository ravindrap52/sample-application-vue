<template>
  <main>
    <div class="card">
      <h4 class="subHeading title--primary--color">Customer Alliance Form</h4>
      <Form :formData="data"></Form>
    </div>
    <div class="card align-self">
      <SelectedOptions />
    </div>
  </main>
</template>
<script>
import formData from "./formData.json";
import Form from "./Form.vue";
import SelectedOptions from "./SelectedOptions.vue";

export default {
  name: "Main",
  data() {
    return {
      data: formData
    };
  },
  components: {
    Form,
    SelectedOptions
  }
};
</script>
<style lang="scss" scoped>
main {
  padding: 1rem;
  @include display(flex);
  justify-content: space-between;
}
.card {
  padding: 1rem;
  background: $white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
</style>
