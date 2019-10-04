import { storiesOf, addDecorator } from "@storybook/vue";
import { withKnobs, number, object } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import GaugeChart from "../src/components/GaugeChart/GaugeChart.vue";

addDecorator(withA11y);

storiesOf("GaugeChart", module)
  .addDecorator(withKnobs)
  .add("configurable via prop options", () => ({
    components: { GaugeChart },
    props: {
      facetModel: {
        type: Object,
        default: object("model", {
          id: "gauge-id"
        })
      },
      data: {
        type: Object,
        default: object("data", {
          label: "Test Gauge",
          min: 0,
          value: 12000,
          max: 252334
        })
      },
      height: {
        type: Number,
        default: number("height", 400)
      },
      width: {
        type: Number,
        default: number("width", 400)
      }
    },
    template: `<gauge-chart
    :data="data"
    :width="width"
    :height="height" />
  `
  }));
