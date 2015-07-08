import Ember from "ember";

var EmberFile = Ember.Namespace.create();

EmberFile.ReadFileAsText = function(file) {
  return new Ember.RSVP.Promise(function(resolve/*, reject*/) {
    var reader = new FileReader();
    reader.onload = function(data) {
      resolve(data.target.result);
    };
    reader.readAsText(file);
  });
};

EmberFile.ReadAsDataURI = function(file) {
  return new Ember.RSVP.Promise(function(resolve/*, reject*/) {
    var reader = new FileReader();
    reader.onload = function(data) {
      resolve(data.target.result);
    };
    reader.readAsDataURL(file);
  });
};

export default EmberFile;
