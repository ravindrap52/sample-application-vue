<template>
  <form @submit.prevent="submitCustomerForm()" novalidate>
    <div class="form__group" v-for="item in data.formData" :key="item.id">
      <div class="pb-8">
        <p class="pb-8 caption">{{ item.id }}.</p>
        <label class="caption"> {{ item.label }} </label>
        <span class="caption">(required)</span>
      </div>
      <div class="rating--container cursor pb-8">
        <div
          class="caption"
          v-bind:class="[
            item.type === 'age' ? 'age--container' : 'rating mr-8'
          ]"
          v-for="option in item.options"
          :key="option"
        >
          {{ option }}
        </div>
      </div>
    </div>
    <div class="form__group">
      <div class="pb-8">
        <p class="pb-8 caption">3.</p>
        <label class="caption"> Your password </label>
      </div>
      <div class="pb-8">
        <input
          type="password"
          v-model.trim="$v.customerForm.password.$model"
          class="form__control"
        />
      </div>
    </div>
    <div class="form__group">
      <div class="pb-8">
        <p class="pb-8 caption">4.</p>
        <label class="caption"> Your email address </label>
      </div>
      <div class="pb-8">
        <input
          type="email"
          v-model.trim="$v.customerForm.email.$model"
          class="form__control"
        />
      </div>
    </div>
    <div class="form__group text-align">
      <div class="pb-8">
        <input type="submit" value="Submit" class="btn btn__primary" />
      </div>
    </div>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  props: ["formData"],
  data() {
    return {
      data: this.formData,
      customerForm: {
        password: "",
        email: ""
      },
      isFormSubmitted: null
    };
  },
  validations: {
    customerForm: {
      password: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    submitCustomerForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        console.log("submit error!");
      } else {
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
          console.log("submit success!");
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form__group {
  padding: 0.5rem 0 0.5rem 0;
}
.rating--container {
  display: flex;
  .rating {
    padding: 1rem;
    border-radius: 50%;
    border: 1px solid $border-color;
  }
}
.form__control {
  width: calc(100% - 32px);
  padding: 1rem;
  border: 1px solid $border-color;
  border-radius: 0.5rem;
}
.age--container {
  border: 1px solid $border-color;
  padding: 1rem;
  &:not(:last-child) {
    border-right: none;
  }
}
</style>
