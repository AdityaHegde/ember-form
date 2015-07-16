import Ember from "ember";

var FileReader = function() {
};
FileReader.prototype.readAsText = function(file) {
  var that = this;
  Ember.run.later(function() {
    that.onload({
      target : {
        result : file.data,
      }
    });
  }, 100);
};
FileReader.prototype.readAsDataURL = function(file) {
  var that = this;
  Ember.run.later(function() {
    that.onload({
      target : {
        result : file.data,
      }
    });
  }, 100);
};

export default Ember.Test.registerHelper("shimReader", function (app, assert) {
  assert.ReaderBack = window.FileReader;
  window.FileReader = FileReader;
});
