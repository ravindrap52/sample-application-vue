import { shallowMount } from "@vue/test-utils";
import Main from "@/components/Main.vue";

describe("Main.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Main);
  });
  it("initialize main component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("renders a Child component", () => {
    expect(wrapper.find({ name: "Form" }).exists()).toBe(true);
  });
  it("renders a Right Child component", () => {
    expect(wrapper.find({ name: "SelectedOptions" }).exists()).toBe(true);
  });
});
