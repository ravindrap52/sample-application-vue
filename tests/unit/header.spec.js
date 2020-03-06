import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe("Header.vue", () => {
  it("initialize header component", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
