import { storiesOf, addDecorator } from "@storybook/vue";
import { withKnobs, number, object, array, boolean, select } from "@storybook/addon-knobs";

addDecorator(withKnobs);
storiesOf("Sparklines", module)
  .addDecorator(withKnobs)
  .add("baseline", () => ({
  data: () => ({
    lineCap: 'round',
    gradients: [
      ["#222"],
      ["#42b3f4"],
      ["red", "orange", "yellow"],
      ["purple", "violet"],
      ["#00c6ff", "#F0F", "#FF0"],
      ["#f72047", "#ffd200", "#1feaea"],
    ],
  }),
  props: {
    autoLineWidth: {
      type: Boolean,
      default: boolean("autoLineWidth", true, "Sparklines")
    },
    lineWidth: {
      type: Number,
      default: number("lineWidth", 2, "Sparklines")
    },
    fill: {
      type: Boolean,
      default: boolean("fill", false, "Sparklines")
    },
    gradient: {
      type: Array,
      default: () => array("gradient", ["red", "orange", "yellow"], ",", "Sparklines")
    },
    gradientDirection: {
      type: String,
      default: select("gradientDirection", {
        Top: "top",
        Right: "right",
        Bottom: "bottom",
        Left: "left",
      }, "top", "Sparklines")
    },
    labelSize: {
      type: Number,
      default: number("labelSize", 4, "Sparklines")
    },
    padding: {
      type: Number,
      default: number("padding", 8, "Sparklines")
    },
    radius: {
      type: Number,
      default: number("radius", 10, "Sparklines")
    },
    showLabels: {
      type: Boolean,
      default: boolean("showLabels", true, "Sparklines")
    },
    smooth: {
      type: Number,
      default: number("smooth", 8, "Sparklines")
    },
    type: {
      type: String,
      default: select("lineCap", {
        Trendline: 'trend',
        Bars: 'bars',
      }, "trend", "Sparklines")
    },
    value: {
      type: Array,
      default: () => array("value", [0, 2, 5, 9, 5, 10, 3, 5, -4, -10, 1, 8, 2, 9, 0], ",", "Sparklines")
    },
    width: {
      type: Number,
      default: number("width", 300, "Sparklines")
    },
  },
  computed: {

    arrayToNums() {
      let newArray = [];
      this.value.forEach((val, i) => {
        let newVal = parseFloat(val);
        newArray.push(newVal);
      });
      return newArray;
    }
  },
  template: `
    <v-sparkline
      :value="arrayToNums"
      :smooth="radius || false"
      :padding="padding"
      :line-width="lineWidth"
      :stroke-linecap="lineCap"
      :gradient="gradient"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
      :show-labels="showLabels"
      :label-size="labelSize"
      :width="width" />
    `
}));
