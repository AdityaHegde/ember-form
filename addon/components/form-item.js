import Ember from "ember";
import EmberColumnData from "ember-column-data";
import layout from "../templates/components/form-item";

/**
 * Form item encapsulation.
 *
 * @class EmberForm.FormItemComponent
 * @module ember-form
 */
export default Ember.Component.extend(EmberColumnData.ColumnDataValueMixin, {
  layout : layout,

  parentForm : null,
  immediateParent : null,
  parentForBubbling : Ember.computed.alias("parentForm"),

  classNames : ["form-group"],
  classNameBindings : ["columnData.form.additionalClass", "columnData.validation.validations:has-validations", "invalid:has-error", ":has-feedback", "hidden:hidden"],
  attributeBindings : ["colName:data-column-name"],

  //attributeBindings doesnt support "." for getting value as of now (ember1.13)
  colName : Ember.computed.alias("columnData.name"),

  labelWidthClass : "col-full",
  inputWidthClass : "col-sm-8",
  showLabel : true,

  labelClass : Ember.computed("columnData", "labelWidthClass", {
    get : function() {
      var columnData = this.get("columnData"), labelWidthClass = this.get("labelWidthClass");
      return "control-label "+(columnData.labelWidthClass || labelWidthClass);
    },
  }),

  inputClass : Ember.computed("columnData", "inputWidthClass", {
    get : function() {
      var columnData = this.get("columnData"), inputWidthClass = this.get("inputWidthClass");
      return "control-input "+(columnData.inputWidthClass || inputWidthClass);
    },
  }),

  isDisabled : Ember.computed("columnData", "columnData.form.readonly", "columnData.form.readonlyOnEdit", "columnData.form.readonlyOnNew", {
    get : function() {
      var columnData = this.get("columnData"),record = this.get("record");
      this.notifyPropertyChange("value");
      return columnData.get("form.readonly") || 
             ((columnData.get("form.readonlyOnEdit") && record && !record.get("isNew")) || (columnData.get("form.readonlyOnNew") && record && record.get("isNew"))) ||
             this.get("disabled");
    },
  }),

  disabled : false,
  disableCheck : function(changedCol, changedValue) {
    var columnData = this.get("columnData"), record = this.get("record"),
        disableEntry = columnData.get("form.disableForColumns") && columnData.get("form.disableForColumns").findBy("name", changedCol.get("name"));
    changedValue = changedValue || record.get(changedCol.get("key"));
    if(disableEntry) {
      var eq = disableEntry.value === changedValue, dis = disableEntry.disable, en = disableEntry.enable;
      this.set("disabled", (dis && eq) || (en && !eq));
    }
  },
  disableCheckInit : function() {
    var disableForColumns = this.get("columnData.form.disableForColumns");
    if(disableForColumns) {
      for(var i = 0; i < disableForColumns.length; i++) {
        this.disableCheck(disableForColumns[i], this.get("record."+disableForColumns[i].get("key")));
      }
    }
  },

  showLabelComp : Ember.computed("showLabel", "columnData", {
    get : function() {
      var columnData = this.get("columnData");
      if(columnData.showLabel === undefined ) {
        return this.get("showLabel");
      }
      return this.get("showLabel") && columnData.showLabel;
    },
  }),

  invalid : false,
  invalidReason : false,

  hidden : false,
  hideCheck : function(changedCol, changedValue) {
    var columnData = this.get("columnData"), record = this.get("record"),
        hideEntry = columnData.get("form.hideForColumns") && columnData.get("form.hideForColumns").findBy("name", changedCol.get("name"));
    changedValue = changedValue || record.get(changedCol.get("key"));
    if(hideEntry) {
      var eq = hideEntry.value === changedValue, hide = hideEntry.hide, show = hideEntry.show;
      this.set("hidden", (hide && eq) || (show && !eq));
    }
  },
  hideCheckInit : function() {
    var hideForColumns = this.get("columnData.form.hideForColumns");
    if(hideForColumns) {
      for(var i = 0; i < hideForColumns.length; i++) {
        this.hideCheck(hideForColumns[i], this.get("record."+hideForColumns[i].get("key")));
      }
    }
  },
  disableValidation : Ember.computed.alias("hidden"),

  listenedColumnChangedHook : function(changedCol, changedValue/*, oldValue*/) {
    this.hideCheck(changedCol, changedValue);
    this.disableCheck(changedCol, changedValue);
  },

  valueDidChange : function(/*value*/) {
  },

  prevRecord : null,
  recordChangeHook : function() {
    this.notifyPropertyChange("isDisabled");
    this.hideCheckInit();
    this.disableCheckInit();
  },
  recordRemovedHook : function(){
  },
  title : "test",
});
