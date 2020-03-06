import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/Footer.vue";

describe("Footer.vue", () => {
  it("initialize footer component", () => {
    const wrapper = shallowMount(Footer);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
