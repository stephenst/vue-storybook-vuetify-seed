import Vue from "vue";
import * as d3 from "d3";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import GaugeChart from "@/components/GaugeChart/GaugeChart.vue";

const localVue = createLocalVue();
describe("GaugeChart.vue", () => {
  let wrapper;
  let vuetify;
  let data = {
    label: "Test Gauge",
    min: 0,
    value: 12000,
    max: 252334
  };
  beforeEach(() => {
    Vue.use(Vuetify);
    vuetify = new Vuetify();
    wrapper = mount(GaugeChart, {
      localVue,
      vuetify,
      propsData: {
        data: data,
        width: 200,
        height: 100,
      }
    });
  });
  it("should load", () => {
    expect(wrapper.contains("svg#gaugeWrapper")).toBe(true);
  });
})
