<template>
  <header class="header--container justify--content">
    <img
      src="https://www.customer-alliance.com/wp-content/themes/customer-alliance/images/logo-white.svg"
      alt=""
    />
  </header>
</template>

<style lang="scss" scoped>
.header--container {
  background: $primary-color;
  @include display(flex);
  align-items: center;
  padding: 1rem;
}
.justify--content {
  @include justifyContent(flex-start);
}
</style>
