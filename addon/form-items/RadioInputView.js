import Ember from "ember";

/**
 * Basic radio button view.
 *
 * @class EmberForm.RadioInputView
 * @module ember-form
 * @submodule ember-form-items
 */
export default Ember.View.extend({
  tagName : "input",

  type : "radio",

  attributeBindings : [ "name", "type", "value", "checked:checked" ],

  click : function() {
    this.set("selection", this.$().val());
  },

  checked : Ember.computed("selection", {
    get : function() {
      /* jshint ignore:start */
      return this.get("value") == this.get("selection");
      /* jshint ignore:end */
    },
  }),
});
