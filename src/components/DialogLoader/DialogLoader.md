# Vuetify DialogLoader Component (with SnackBar)

```js https://codesandbox.io/s/1v4mo4j1zl?module=%2Fsrc%2Fcomponents%2FDialogLoader.vue

This component use the Vuetify Dialog Loader to show loading dialog, with optional SnackBar notifications (snackbar disabled by default)

Based off eolant"s Vuetify Confirm Dialog (https://gist.github.com/eolant/ba0f8a5c9135d1a146e1db575276177d)

Insert component where you want to use it:
<dialog-loader ref="dialogLoader"></dialog-loader>

Alternatively you can place it in main App component and access it globally via this.$root.$confirm
<template>
  <v-app>
    ...
    <dialog-loader ref="dialogLoader"></dialog-loader>
  </v-app>
</template>

mounted() {
  this.$root.$dialogLoader = this.$refs.dialogLoader
}


Standard Usage Without Callback:
----
this.$root.$dialogLoader.show( "Doing some action...", { color: "primary" } )
this.$root.$dialogLoader.hide()

this.$root.$dialogLoader.showSnackbar( "Action failed! Oh no!", { color: "error" } ) --- snackbar will hide after timeout value
this.$root.$dialogLoader.hideSnackbar() -- only necessary if timeout is set to 0 or need to hide snackbar for some other reason

Advanced Usage (with optional callback that returns a promise)
----
 -- Start Action Loader
this.$root.$dialogLoader.start(message, options, callback, snackbar)

Argument 3 (callback) should be a function that returns a Promise (optional)
Argument 4 (snackbar) can be a boolean (true/false) or object (snackbar options) to enable showing snackbar when promise is resolved/rejected ptional)

Example:
this.$root.$dialogLoader.start( "Removing Someting...", { color: "purple" }, promiseBasedFn, true )

 -- Stop Action Loader (and show Snackbar)
this.$root.$dialogLoader.stop(message, snackbarOptions, callback)

this.$root.$dialogLoader.stop("I completed some action! Yay!", { timeout: 5000, location: "top" }, () => { console.log( "Callback after ackbar hidden" ) })

 EXAMPLE METHODS TO CALL/USE
  async deleteSuccess() {
    if (
      await this.$root.$confirm(
        'Delete?',
        'Are you sure you want to delete with success?',
        { color: 'red' }
      )
    ) {
      this.$root.$dialogLoader.start(
        'Deleting...',
        {},
        () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
              // reject( 'Unable to remove client!' )
            }, 3000);
          });
        },
        true
      );
    }
  },
  async deleteError() {
    if (
      await this.$root.$confirm(
        'Delete?',
        'Are you sure you want to delete with error?',
        { color: 'red' }
      )
    ) {
      this.$root.$dialogLoader.start(
        'Deleting...',
        {},
        () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              //resolve()
              reject('Error deleting!');
            }, 3000);
          });
        },
        true
      );
    }
  },
  deleteNoSnack() {
    this.$root.$dialogLoader.start('Deleting...no snacks 4 u...', {}, () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //resolve()
          reject('Error deleting!');
        }, 3000);
      });
    });
  }