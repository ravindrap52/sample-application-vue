<template>
  <form @click.prevent="submitCustomerForm()" novalidate>
    <div class="form__group" v-for="item in data.formData" :key="item.id">
      <div class="mb-8">
        <p class="mb-8 caption">{{ item.id }}.</p>
        <label class="caption"> {{ item.label }} </label>
        <span class="caption">(required)</span>
      </div>
      <div class="rating--container cursor mb-8">
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
      <div class="mb-8">
        <p class="mb-8 caption">3.</p>
        <label class="caption"> Your password </label>
      </div>
      <div class="mb-8">
        <input
          type="password"
          v-model.trim="$v.customerForm.password.$model"
          class="form__control"
          :class="{
            'form__control--error': $v.customerForm.password.$error
          }"
        />
        <div v-if="errors">
          <p
            class="caption error mt-8"
            v-if="!$v.customerForm.password.required"
          >
            Password is required
          </p>
          <p
            class="caption error mt-8"
            v-if="!$v.customerForm.password.validatePassword"
          >
            Password should contain atleast 1 small letter and 1 number
          </p>
        </div>
      </div>
    </div>
    <div class="form__group">
      <div class="mb-8">
        <p class="mb-8 caption">4.</p>
        <label class="caption"> Your email address </label>
      </div>
      <div class="mb-8">
        <input
          type="email"
          v-model.trim="$v.customerForm.email.$model"
          class="form__control"
          :class="{
            'form__control--error': $v.customerForm.email.$error
          }"
        />
        <p class="caption error mt-8" v-if="$v.customerForm.email.$error">
          Email format is not correct
        </p>
      </div>
    </div>
    <div class="form__group text-align">
      <div class="mb-8">
        <button type="submit" class="btn btn__primary">Submit</button>
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
      errors: false,
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
        required,
        validatePassword(password1) {
          return (
            /[a-z]/.test(password1) && /[0-9]/.test(password1) //checks for a-z //checks for 0-9
          );
        }
      },
      email: {
        email
      }
    }
  },
  methods: {
    submitCustomerForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.errors = this.$v.customerForm.$anyError;
        console.log("submit error!");
      } else {
        this.submitStatus = "OK";
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
  &--error {
    border: 1px solid $error-color;
  }
}
.error {
  color: $error-color;
}
.age--container {
  border: 1px solid $border-color;
  padding: 1rem;
  &:not(:last-child) {
    border-right: none;
  }
}
</style>
