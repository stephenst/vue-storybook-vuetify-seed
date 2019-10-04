import { storiesOf, addDecorator } from "@storybook/vue";
import { withKnobs, number, object, array, boolean, select } from "@storybook/addon-knobs";
import Vue from "vue";
import Vuetify from "vuetify";

addDecorator(withKnobs);
storiesOf("Drawers", module)
  .addDecorator(withKnobs)
  .add("baseline", () => ({
  data: () => ({
    drawer: null,
    items: [
      { 
        title: 'Home', 
        icon: 'dashboard' 
      },
      { 
        title: 'About',
        icon: 'question_answer'
      },
    ],
  }),
  props: {
    autoLineWidth: {
      type: Boolean,
      default: boolean("autoLineWidth", true, "Sparklines")
    },
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
          <v-btn
            color="pink"
            @click.stop="drawer = !drawer"
          >
            Toggle
          </v-btn>
        </v-row>
      </v-container>

      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              <h1 class="heading">USER NAME</h1>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <p>
                  {{ item.title }}
                </p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </v-app>
    `
}));
