/* eslint-disable import/no-extraneous-dependencies */
import Vue from "vue";
import { storiesOf, addDecorator } from "@storybook/vue";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, boolean, number, object, select, text } from "@storybook/addon-knobs";
import { withNotes } from "@storybook/addon-notes";

import DialogLoader from "../src/components/DialogLoader/DialogLoader.vue";
import DialogLoaderReadMe from "../src/components/DialogLoader/DialogLoader.md";

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withNotes);

storiesOf("DialogLoader", module)
  .addDecorator(withNotes)
  .add(
    "configurable",
    () => ({
      components: { DialogLoader },
      props: {
        color: {
          type: String,
          default: text("color", "orange", "Dialog Loader")
        },
        dialogMessage: {
          type: String,
          default: text("dialogMessage", "CONFIRM TITLE", "Dialog Loader")
        },
        dialogTimeout: {
          type: Number,
          default: text("dialogTimeout (in milliseconds, 1000 = 1sec)", 3000,"Dialog Loader")
        },
        hideOveraly: {
          type: Boolean,
          default: boolean("hideOveraly", false, "Dialog Loader")
        },
        snackbarCloseText: {
          type: String,
          default: text("Snackbar Close Text", "close", "Dialog Loader")
        },
        snackbarLocation: {
          type: String,
          default: select("snackbarLocation", {
            Top: "top",
            Right: "right",
            Bottom: "bottom",
            Left: "left",
          }, "snackbarLocation", "Dialog Loader")
        },
        snackbarMode: {
          type: String,
          default: select("gradientDirection", {
            Multi: "multi-line",
            Vertical: "vertical",
            Single: "single",
          }, "single", "Dialog Loader")
        },
      },
      mounted() {
        this.$root.$dialogLoader = this.$refs.dialogLoader
      },
      methods: {
        openDialog() {
          this.$refs.dialogLoader.start(
            this.dialogMessage,
            { 
              timeout: parseFloat(this.dialogTimeout),
              location: this.snackbarLocation,
              hideOverlay: this.hideOveraly,
              color: this.color,
              width: 290,
              progressVisible: true,
              snackbarVisible: true,
            },
            () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve("Deleted");
                  // reject( 'Unable to remove client!' )
                }, 3000);
              });
            }, { 
              message: this.dialogMessage,
              timeout: parseFloat(this.dialogTimeout),
              location: this.snackbarLocation,
              hideOverlay: this.hideOveraly,
              color: this.color,
              width: 290,
              progressVisible: true,
              mode: this.snackbarMode,
              snackbarVisible: true,
              close: {
                text: this.snackbarCloseText
              }
            }
          );
        }
      },
      template: `
      <v-app light>
        <v-sheet
          height="400"
          class="overflow-hidden"
          style="position: relative;"
        >
        <v-container class="fill-height">
          <v-row
            align="center"
            justify="center"
          >
            <v-card max-height>
              <v-btn
                @click="openDialog()">
                Open Dialog
              </v-btn>
              <dialog-loader ref="dialogLoader" />
            </v-card>
          </v-row>
        </v-container>
        </v-sheet>
      </v-app>
      `
    })
  );


/* eslint-enable import/no-extraneous-dependencies */
