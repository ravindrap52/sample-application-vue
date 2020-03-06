<template>
  <footer class="footer--container justify--content caption">
    &copy; Copyright 2020
  </footer>
</template>

<style lang="scss" scoped>
.footer--container {
  @include display(flex);
  align-items: center;
  padding: 1rem;
}
.justify--content {
  @include justifyContent(center);
}
</style>
