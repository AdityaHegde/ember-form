import Ember from "ember";

/**
 * Base for multiple value object.
 *
 * @class EmberForm.MultipleValue
 * @module ember-form
 * @submodule ember-form-items
 */
export default Ember.Object.extend({
  value : Ember.computed("columnData", {
    get : function(key) {
      return this["__" + key];
    },

    set : function(key, value) {
      var columnData = this.get("columnData");
      if(!Ember.isNone(columnData)) {
        var validation = columnData.get("validation").validateValue(value, null, columnData.get("validation.eachValidations"));
        if(validation[0]) {
          this.set("isInvalid", true);
        }
        else {
          this.set("isInvalid", false);
        }
      }
      this["__" + key] = value;
      return value;
    },
  }),

  label : "",

  isInvalid : false,
});
