import Vue from "vue";
import Vuetify, {
  VApp,
  VBtn,
  VCard,
  VCardText,
  VCol,
  VContainer,
  VContent,
  VDialog,
  VDivider,
  VIcon,
  VImg,
  VList,
  VListItem,
  VListItemAvatar,
  VListItemContent,
  VListItemIcon,
  VListItemTitle,
  VNavigationDrawer,
  VRow,
  VSheet,
  VSnackbar,
  VSparkline,
  VToolbar,
  VLayout,
} from 'vuetify/lib';
import { Ripple } from 'vuetify/lib/directives'
import "vuetify/src/styles/main.sass";
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader


Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VCardText,
    VCol,
    VContainer,
    VContent,
    VDialog,
    VDivider,
    VIcon,
    VImg,
    VList,
    VListItem,
    VListItemAvatar,
    VListItemContent,
    VListItemIcon,
    VListItemTitle,
    VNavigationDrawer,
    VRow,
    VSheet,
    VSnackbar,
    VSparkline,
    VToolbar,
    VLayout,
  },
  directives: {
    Ripple,
  },
});

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#42a5f5"
      },
      dark: {
        primary: "#2196F3"
      },
    },
    options: {
      customProperties: true,
    },
    icons: {
      iconfont: "mdi" // default is 'mdi'
    },
    breakpoint: {
      thresholds: {
        xs: 340,
        sm: 540,
        md: 800,
        lg: 1280,
      },
      scrollBarWidth: 24,
      width: 800,
    },
  },
});
