import Ember from "ember";
import layout from "../templates/components/radio-group-input";

export default Ember.TextField.extend({
  layout : layout,

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
