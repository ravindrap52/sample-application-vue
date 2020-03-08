<template>
  <div>
    <h4 v-if="submitStatus" class="subHeading title--primary--color mb-8">
      Form Submitted Successfully
    </h4>
    <form @submit.prevent="submitCustomerForm($event)" novalidate>
      <div class="form__group" v-for="item in data.formData" :key="item.id">
        <div class="mb-8">
          <p class="mb-8 caption">{{ item.id }}.</p>
          <label class="caption"> {{ item.label }} </label>
          <span class="caption" v-if="item.type === 'rating'">(required)</span>
        </div>
        <div
          class="cursor mb-8"
          :class="
            item.type === 'rating' ? 'rating--container' : 'age--container'
          "
        >
          <div
            class="caption"
            v-for="(option, index) in item.options"
            :key="index"
            v-bind:class="[
              item.type === 'age' ? 'age' : 'rating mr-8',
              index === activeRatingItem && item.type === 'rating'
                ? 'rating--active'
                : '',
              index === activeAgeItem && item.type === 'age'
                ? 'age--active'
                : ''
            ]"
            @click="getSelectedType(item, option, index)"
          >
            {{ option.value }}
          </div>
        </div>
        <p
          class="caption error mt-8"
          v-if="item.type === 'rating' && selctedRatingItem"
        >
          please select rating
        </p>
        <div
          v-if="item.sub_questions.length > 0 && rating.length > 0"
          class="mt-8"
        >
          <textarea
            id="subQuestion"
            rows="5"
            class="form__control"
            v-model="message"
          ></textarea>
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
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Form",
  props: ["formData"],
  data() {
    return {
      data: this.formData,
      age: [],
      selctedRatingItem: false,
      activeRatingItem: null,
      activeAgeItem: null,
      rating: [],
      errors: false,
      customerForm: {
        password: "",
        email: ""
      },
      submitStatus: false,
      message: ""
    };
  },
  validations: {
    customerForm: {
      password: {
        required,
        validatePassword(password1) {
          return /[a-z]/.test(password1) && /[0-9]/.test(password1);
        }
      },
      email: {
        email
      }
    }
  },
  methods: {
    submitCustomerForm(event) {
      this.$v.$touch();
      const customValidation = this.validateCustomProperties();
      this.rating.length
        ? (this.selctedRatingItem = false)
        : (this.selctedRatingItem = true);
      if (this.$v.$invalid) {
        this.submitStatus = false;
        this.errors = this.$v.customerForm.$anyError;
      } else {
        if (customValidation && !this.selctedRatingItem) {
          this.submitStatus = true;
          this.resetFormFields(event);
        }
      }
    },
    getSelectedType(item, value, index) {
      if (item.type === "rating") {
        this.rating = [];
        this.rating.push(value);
        this.activeRatingItem = index;
        this.rating.length
          ? (this.selctedRatingItem = false)
          : (this.selctedRatingItem = true);
        if (item.sub_questions && item.sub_questions.length) {
          for (const question of item.sub_questions) {
            const isValueAvailable = question.values.includes(value.value);
            if (isValueAvailable) {
              this.message = question.questions[0].label;
            }
          }
        }
      } else if (item.type === "age") {
        this.age = [];
        this.age.push(value);
        this.activeAgeItem = index;
      }
    },
    validateCustomProperties() {
      let validationStatus;
      let ageValidationStatus;
      let ratingValidationStatus;
      if (Array.isArray(this.age) && this.age.length) {
        ageValidationStatus = true;
      }
      if (Array.isArray(this.rating) && this.rating.length) {
        ratingValidationStatus = true;
      }
      if (ageValidationStatus && ratingValidationStatus) {
        validationStatus = true;
      } else {
        validationStatus = false;
      }
      return validationStatus;
    },
    resetFormFields(event) {
      this.customerForm.password = "";
      this.customerForm.email = "";
      this.rating = [];
      this.age = [];
      this.selctedRatingItem = false;
      this.activeRatingItem = null;
      this.activeAgeItem = null;
      this.errors = false;
      event.preventDefault();
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
    background: #d1d1d1;
    padding: 1rem;
    border-radius: 50%;
    border: 1px solid $border-color;
    &--active {
      background: $primary-color;
      color: $white;
    }
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
  display: flex;
  .age {
    border: 1px solid $border-color;
    padding: 1rem;
    &--active {
      background: $primary-color;
      color: $white;
    }
    &:not(:last-child) {
      border-right: none;
    }
  }
}
.active {
  background: $primary-color;
  color: $white;
}
@media (min-width: 350px) and (max-width: 950px) {
  .age--container {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 0.5rem;
    .age {
      border: 1px solid $border-color;
      padding: 1rem;
      &--active {
        background: $primary-color;
        color: $white;
      }
      &:not(:last-child) {
        border-right: 1px solid $border-color;
      }
    }
  }
}
</style>
