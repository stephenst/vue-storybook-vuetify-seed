import Vue from "vue";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import DialogLoader from "@/components/DialogLoader/DialogLoader.vue";
const localVue = createLocalVue();
describe("DialogLoader.vue", () => {
  let wrapper;
  let vuetify;

  // Default Options
  let defaultSnackbarOptions = {
    enabled: false,
    color: "success",
    mode: "multi-line",
    timeout: 4000,
    message: "Success!",
    callback: null,
    location: "top",
    close: {
      text: "Close",
      color: "",
    }
  };

  // PRE TEST
  beforeEach(() => {
    Vue.use(Vuetify);
    vuetify = new Vuetify();
    
    // Need to have root v-app for Dialogs for Vuetify
    const App = localVue.component("App", {
      components: { DialogLoader },
      template: `
        <v-app light>
          <DialogLoader />
        </v-app>
      `
    });
    // Attach it
    const mountedApp = mount(App, {
      localVue,
      vuetify,
      attachToDocument: true
    });
    // The actual normal Jest 'wrapper'
    wrapper = mountedApp.find(DialogLoader);
  });

  // TESTS HERE
  it("should load", () => {
    expect(wrapper.contains("div")).toBe(true);
    expect(wrapper.find(".v-dialog--persistent").isVisible()).toBe(false);
  });
  it("should open Dialog", () => {
    wrapper.vm.show( "Doing some action...", { color: "primary" } );
    expect(wrapper.find(".v-dialog--persistent").isVisible()).toBe(true);
  });
  it("should start Dialog", () => {
    wrapper.vm.start( "Removing Someting...", { color: "purple" }, {}, true );
    expect(wrapper.find(".v-dialog--persistent").isVisible()).toBe(true);
    expect(wrapper.find(".v-card__text").text()).toBe("Removing Someting...");
    wrapper.vm.stop( "stopping", defaultSnackbarOptions, (() => { return true; }), true );
  });
  it("should stop Dialog with options/callback", () => {
    wrapper.vm.start( "Removing Someting...", { color: "purple" }, {}, true );
    // stop(message, snackbarOptions, callback) {
    defaultSnackbarOptions.enabled = false;
    wrapper.vm.stop( "stopping", defaultSnackbarOptions, () => { return true; }, true );
  });

  it("should close Dialog", () => {
    wrapper.vm.show( "Doing some action...", { color: "primary", showSnackbar: false, snackbar: { enabled: false, }});
    expect(wrapper.find(".v-dialog--persistent").isVisible()).toBe(true);
    wrapper.vm.hide();
    wrapper.vm.start( "Doing some action...", { color: "primary", showSnackbar: false, snackbar: { enabled: false, }});
    wrapper.vm.hide();
    expect(wrapper.find(".v-dialog--persistent").isVisible()).toBe(false);
  });
  it("should show the Snack Bar", () => {
    let rendered;
    wrapper.vm.showSnackbar( "Action failed! Oh no!", { color: "error" } );
    rendered = wrapper.find(".v-snack--active").text().replace(/\s/g, '');
    expect(wrapper.find(".v-snack--active").isVisible()).toBe(true);
    expect(rendered).toBe("Actionfailed!Ohno!Close");
    wrapper.vm.hideSnackbar();
  });
})
