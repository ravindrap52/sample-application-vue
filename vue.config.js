module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/abstracts/_variables.scss";
          @import "@/scss/abstracts/_mixins.scss";
          @import "@/scss/base/_reset.scss";
          @import "@/scss/base/_base.scss";
          @import "@/scss/base/_typography.scss";
          @import "@/scss/components/_button.scss";
          `
      }
    }
  }
};
