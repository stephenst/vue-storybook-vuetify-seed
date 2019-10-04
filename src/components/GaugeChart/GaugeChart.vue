<template>
  <svg id="gaugeWrapper" :width="width" :height="height" />
</template>

<script>
import * as d3 from "d3";

export default {
  name: "GaugeChart",
  props: {
    facetModel: {
      type: Object,
      default: () => ({})
    },
    /**
     * incoming Chart Data [{label: Number, value: Number}]
     */
    data: {
      type: Object,
      default: () => {}
    },
    /**
     * Pixel width of element.  Using pixel widths as props here to populate down from the grid-layout option.
     */
    width: {
      type: [String, Number],
      required: false,
      default: 100
    },
    /**
     * Pixel height of element.  Using pixel height as props here to populate down from the grid-layout option.
     */
    height: {
      type: [String, Number],
      required: false,
      default: 300
    },
    /**
     * Id of grid item.  Using id as props here to populate down to the basic charts.
     */
    facetId: {
      type: String,
      default: "170"
    }
  },
  data() {
    return {
      options: {
        gaugeHeight: 100,
        gaugeWidth: 200
      }
    };
  },
  watch: {
    data() {
      this.drawChart();
    },
    height() {
      this.drawChart();
    },
    width() {
      this.drawChart();
    }
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      d3.select("#gaugeWrapper").html("");
      this.gaugeChart({
        el: "#gaugeWrapper",
        label: this.data.label,
        value: this.data.value,
        min: this.data.min,
        max: this.data.max
      });
    },
    /**
     * gaugeChart creates chart.
     * @constructor
     * @param {Object} o - the options object.
     * @param {Number} o.min - the Mininum number for gauge
     * @param {Number} o.value - the current Active number; where the needle is.Symbol
     * @param {Number} o.max - the Maximum number for gauge
     */
    gaugeChart(o) {
      const chart = d3.select(o.el);
      const width = chart.attr("width");
      const center = width / 2;
      const outerBezelWidth = width * 0.009;
      const outerBezelRadius = center - outerBezelWidth;
      const innerBezelWidth = width * 0.072;
      const innerBezelRadius = outerBezelRadius - innerBezelWidth / 2;
      const tickHeight = outerBezelWidth + innerBezelWidth + width * 0.027;
      const tickWidth = width * 0.009;
      const tickHiderRadius = width * 0.345;
      const labelY = center / 1.3;
      const valueLabelY = width * 0.75;
      const labelFontSize = width * 0.13;
      const needleWidth = width * 0.054;
      const needleCapRadius = width * 0.059;
      const tickSpacing = 13.5;
      const lastTickAngle = 135;
      let angle = -135;

      const needleScale = d3
        .scaleLinear()
        .domain([o.min || 0, o.max || 100])
        .range([angle, lastTickAngle]);

      const needleAngle = needleScale(o.value);

      /* outer bezel */
      chart
        .append("circle")
        .attr("class", "gaugeChart-bezel-outer")
        .attr("cx", center)
        .attr("cy", center)
        .attr("stroke-width", outerBezelWidth)
        .attr("r", outerBezelRadius);

      /* face */
      chart
        .append("circle")
        .attr("class", "gaugeChart-face")
        .attr("cx", center)
        .attr("cy", center)
        .attr("r", outerBezelRadius - 1);

      let codedScore = (100 * o.value) / o.max;
      let newClass = "gaugeChart-bezel-inner";
      if (codedScore > 75) {
        newClass = "green gaugeChart-bezel-inner";
      } else if (codedScore > 40 && codedScore < 76) {
        newClass = "warning gaugeChart-bezel-inner";
      } else if (codedScore < 41) {
        newClass = "error gaugeChart-bezel-inner";
      }

      /* inner bezel */
      chart
        .append("circle")
        .attr("class", newClass)
        .attr("cx", center)
        .attr("cy", center)
        .attr("stroke-width", innerBezelWidth)
        .attr("r", innerBezelRadius);

      while (angle <= lastTickAngle) {
        chart
          .append("line")
          .attr("class", "gaugeChart-tick")
          .attr("x1", center)
          .attr("y1", center)
          .attr("x2", center)
          .attr("y2", tickHeight)
          .attr("stroke-width", tickWidth)
          .attr("transform", `rotate(${angle} ${center} ${center})`);

        angle += tickSpacing;
      }
      /* tick hider */
      chart
        .append("circle")
        .attr("class", "gaugeChart-tickHider")
        .attr("cx", center)
        .attr("cy", center)
        .attr("r", tickHiderRadius);

      /* label */
      chart
        .append("text")
        .attr("class", "gaugeChart-label")
        .attr("x", center)
        .attr("y", labelY)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", labelFontSize)
        .text(o.label);

      /* value label */
      chart
        .append("text")
        .attr("class", "gaugeChart-label-value")
        .attr("x", center)
        .attr("y", valueLabelY)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", labelFontSize)
        .text(((100 * o.value) / o.max).toFixed(2) + "%");

      /* needle */
      chart
        .append("path")
        .attr("class", "gaugeChart-needle")
        .attr("stroke-width", outerBezelWidth)
        .attr(
          "d",
          `M ${center - needleWidth / 2} ${center}
                    L ${center} ${tickHeight}
                    L ${center + needleWidth / 2} ${center} Z`
        )
        .attr("transform", `rotate(${needleAngle} ${center} ${center})`);

      /* needle cap */
      chart
        .append("circle")
        .attr("class", "gaugeChart-needle-cap")
        .attr("cx", center)
        .attr("cy", center)
        .attr("stroke-width", outerBezelWidth)
        .attr("r", needleCapRadius);
    }
  }
};
</script>

<style lang="scss">
.gaugeChart-bezel-outer {
  fill: none;
  stroke: black;
}

.gaugeChart-bezel-inner {
  fill: none;
  stroke: #ccc;

  &.green {
    stroke: #1e7717;
  }
  &.warning {
    stroke: #d4e310;
  }
  &.error {
    stroke: #ed295e;
  }
}

.gaugeChart-tick {
  fill: none;
  stroke: black;
}

.gaugeChart-face,
.gaugeChart-tickHider {
  stroke-width: 0;
  fill: white;
}

.gaugeChart-needle {
  stroke: #cd4120;
  fill: #e57358;
  opacity: 0.8;
}

.gaugeChart-needle-cap {
  stroke: #666666;
  fill: #4684ee;
}

.gaugeChart-label-value {
  font-size: 12px;
}
</style>
