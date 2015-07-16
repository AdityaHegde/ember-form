import Ember from "ember";
import EmberObjectUtils from "ember-object-utils";
import EmberColumnData from "ember-column-data";
import HideForColumn from "./HideForColumn";
import DisableForColumn from "./DisableForColumn";
import FormItemTypesMap from "./form-item-types-map";
import InputTypesMap from "./input-types-map";

/**
 * Column data for form module.
 *
 * @class EmberForm.FormColumnData
 * @module ember-form
 */
export default Ember.Object.extend({
  /**
   * Placeholder text for the inputs.
   *
   * @property placeholder
   * @type String
   * @default null
   */
  placeholder : null,

  /**
   * Actual placeholder used. It takes the placeholder if specified else defaults to ColumnData's label.
   *
   * @property placeholderActual
   * @type String
   * @readonly
   */
  placeholderActual : Ember.computed("parentObj.label", "placeholder", {
    get : function() {
      var placeholder = this.get("placeholder"), label = this.get("parentObj.label");
      if(placeholder) {
        return placeholder;
      }
      return label;
    },
  }),

  /**
   * Form module type to use for this column.
   *
   * @property moduleType
   * @type String
   * @default "textInput"
   */
  moduleType : "textInput",

  /**
   * The view lookup string for the for module.
   *
   * @property formItemComponent
   * @type String
   * @readonly
   */
  formItemComponent : Ember.computed("moduleType", {
    get : function() {
      return FormItemTypesMap[this.get("moduleType")];
    },
  }),

  /**
   * The view lookup string for the for module.
   *
   * @property inputComponent
   * @type String
   * @readonly
   */
  inputComponent : Ember.computed("moduleType", {
    get : function() {
      return InputTypesMap[this.get("moduleType")];
    },
  }),

  /**
   * Boolean to say whether the input is readonly or not. The input will be disabled but shown.
   *
   * @property readonly
   * @type Boolean
   * @default false
   */
  readonly : false,

  /**
   * Boolean to say whether the input is mandatory or not. A star will be shown beside the label.
   * Making this true will also add a not empty entry in validations in the ColumnData.
   *
   * @property mandatory
   * @type Boolean
   * @default false
   */
  mandatory : false,

  /**
   * A question mark icon is shown beside the form input which will show helpText on hover.
   *
   * @property helpText
   * @type String
   * @default null
   */
  helpText : null,

  fieldDescription : null,

  options : EmberObjectUtils.hasMany(),
  data : [],
  dataValueKey : "value",
  dataLabelKey : "label",
  bubbleValues : false,
  cantBeNull : false,
  canManipulateEntries : true,

  multiEntryContainerClass : "multi-entry-container",
  eachMultiEntryClass : "each-multi-entry",
  multiEntryClass : "multi-entry",
  arrayType : Ember.Object,
  showChildrenLabel : false,
  childrenLabelWidthClass : "",
  childrenInputWidthClass : "col-md-12",

  fileValidation : EmberObjectUtils.belongsTo(EmberColumnData.ColumnDataValidation),

  hideForColumns : EmberObjectUtils.hasMany(HideForColumn),
  disableForColumns : EmberObjectUtils.hasMany(DisableForColumn),
});
