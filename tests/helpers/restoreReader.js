import Ember from "ember";

export default Ember.Test.registerHelper("restoreReader", function (app, assert, context) {
  window.FileReader = assert.ReaderBack;
});
