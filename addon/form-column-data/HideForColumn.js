import Ember from "ember";

/**
 * Entry to show/hide column based on value of another.
 *
 * @class EmberForm.HideForColumn
 * @submodule ember-form-column-data
 * @module ember-form
 */
export default Ember.Object.extend({
  /**
   * Unique identification of the column to show/hide
   *
   * @property name
   * @type String
   * @required
   */
  name : "",

  /**
   * Value of the column for which to show/hide.
   *
   * @property value
   * @type String
   * @required
   */
  value : "",

  /**
   * Key Name in the record which returns the value. Used when multiple column refer to same key.
   *
   * @property keyName
   * @type String
   * @optional
   */
  keyName : "",

  /**
   * Actual key to use in the record. Takes keyName if present. Defaults to name.
   *
   * @property keyName
   * @type String
   * @readonly
   */
  //used when you need different entries for the same attr in the record
  key : Ember.computed("keyName", "name", {
    get : function() {
      return this.get("keyName") || this.get("name");
    },
  }),

  /**
   * Boolean to hide when value of listened column == value
   *
   * @property hide
   * @type Boolean
   * @default false
   */
  hide : false,

  /**
   * Boolean to show when value of listened column == value
   *
   * @property show
   * @type Boolean
   * @default false
   */
  show : false,
});
