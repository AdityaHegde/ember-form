import Ember from "ember";

/**
 * Column data group for form.
 *
 * @class EmberForm.FormColumnDataGroup
 * @module ember-form
 */
export default Ember.Object.extend({
  /**
   * Label width class default for all child columns.
   *
   * @property labelWidthClass
   * @type String
   * @default "col-sm-4"
   */
  labelWidthClass : "col-sm-4",

  /**
   * Input width class default for all child columns.
   *
   * @property inputWidthClass
   * @type String
   * @default "col-sm-8"
   */
  inputWidthClass : "col-sm-8",

  /**
   * @property showLabel
   * @type Boolean
   * @default true
   */
  showLabel : true,
});
