import { shallowMount, createLocalVue } from "@vue/test-utils";
import Form from "@/components/Form.vue";
import formData from "@/components/formData.json";
import Vuelidate from "vuelidate";

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe("Form.vue", () => {
  const wrapper = shallowMount(Form, {
    propsData: formData,
    localVue
  });
  it("initialize Form component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("it should accept props", () => {
    expect(wrapper.props(formData));
  });
});
