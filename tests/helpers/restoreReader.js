import Ember from "ember";

export default Ember.Test.registerHelper("restoreReader", function (app, assert) {
  window.FileReader = assert.ReaderBack;
});
