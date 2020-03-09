<template>
  <div>
    <div class="form__group">
      <div class="mb-8">
        <label class="caption"> How do you feel today ? </label>
        <p class="mt-8 caption">{{ rating }}</p>
      </div>
    </div>
    <div class="form__group">
      <div class="mb-8">
        <label class="caption"> Your age </label>
        <p class="mt-8 caption">{{ age }}</p>
      </div>
    </div>
    <div class="form__group">
      <div class="mb-8">
        <label class="caption"> Your email address </label>
        <p class="mt-8 caption">{{ email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedOptions",
  computed: {
    rating() {
      return this.$store.getters.rating.value;
    },
    age() {
      return this.$store.getters.age.value;
    },
    email() {
      return this.$store.getters.email;
    }
  }
};
</script>

<style></style>
