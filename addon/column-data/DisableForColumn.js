import Ember from "ember";

/**
 * Entry to disable/enable column based on value of another.
 *
 * @class EmberForm.DisableForColumn
 * @module ember-form
 */
export default Ember.Object.extend({
  /**
   * Unique identification of the column to enable/disable
   *
   * @property name
   * @type String
   * @required
   */
  name : "",

  /**
   * Value of the column for which to enable/disable.
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
   * Boolean to disable when value of listened column == value
   *
   * @property disable
   * @type Boolean
   * @default false
   */
  disable : false,

  /**
   * Boolean to enable when value of listened column == value
   *
   * @property enable
   * @type Boolean
   * @default false
   */
  enable : false,
});
