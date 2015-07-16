import Ember from "ember";

export default Ember.Test.registerAsyncHelper("scrollHelper",
  function(app, element, scrollVal) {
    Ember.run(function() {
      element.scrollTop(scrollVal).change();
    });
  }
);
