import Ember from "ember";

export default Ember.Route.extend({
  model : function() {
    return Ember.Object.create({
      vara : "vara",
      varb : "v2",
      varc : true,
      vard : "v1",
      varh : Ember.A(),
    });
  },
});
