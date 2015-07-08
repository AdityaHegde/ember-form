import Ember from "ember";
import EmberObjectUtils from "ember-object-utils";
import MultipleValue from "./MultipleValue";
import copyValuesToObject from "./copyValuesToObject";
import copyValuesToRecord from "./copyValuesToRecord";

/**
 * Mixin which enables views to have multiple values.
 *
 * @class EmberForm.MultipleValueMixin
 * @module ember-form
 * @submodule ember-form-items
 */
export default Ember.Mixin.create({
  init : function() {
    this._super();
    var values = this.get("values");
    this.set("values", Ember.isEmpty(values) ? Ember.A() : values);
    if(this.get("value")) {
      this.valArrayDidChange();
    }
    else {
      this.valuesArrayDidChange();
    }
  },

  values : EmberObjectUtils.hasMany(MultipleValue),

  valuesCount : Ember.computed("values.@each", {
    get : function() {
      return this.get("values.length") || 0;
    },
  }),

  createNewRecordAndAddToValue : function(data) {
    this.get("value").pushObject(this.get("columnData.form.arrayType").create(data));
  },

  valuesArrayDidChange : Ember.observer("values.@each.value", "view.values.@each.value", function() {
    if(!this.get("values") || this.get("lock")) {
      return;
    }
    var value = this.get("value"), values = this.get("values"),
        valLength = value && value.get("length"), valuesLength = values.get("length"),
        columnData = this.get("columnData"), record = this.get("record");
    if(value) {
      this.set("lock", true);
      values.forEach(function(val, idx) {
        var valObj = value.objectAt(idx);
        if(valObj) {
          valObj.set(columnData.get("form.arrayCol"), val.get("value"));
          copyValuesToRecord(valObj, columnData, record, val);
        }
        else {
          var data = { /*id : columnData.get("name")+"__"+csvid++*/ };
          data[columnData.get("form.arrayCol")] = val.get("value");
          copyValuesToObject(data, columnData, record, val);
          this.createNewRecordAndAddToValue(data);
        }
      }, this);
      if(valLength > valuesLength) {
        for(var i = valuesLength; i < valLength; i++) {
          value.popObject();
        }
      }
      this.set("lock", false);
    }
  }),

  valArrayDidChange : Ember.observer("value.@each", "view.value.@each", function() {
    if(this.get("lock")) {
      return;
    }
    var value = this.get("value");
    if(value) {
      var values;
      values = this.valuesMultiCreateHook(value);
      this.set("lock", true);
      this.set("values", values);
      this.set("lock", false);
    }
  }),

  valuesMultiCreateHook : function(value) {
    if(value.map) {
      return Ember.A(value.map(function(e) {
        return this.valuesElementCreateHook(e);
      }, this));
    }
    return Ember.A();
  },

  valuesElementCreateHook : function(element) {
    var columnData = this.get("columnData");
    return {val : element.get(columnData.get("form.arrayCol")), columnData : columnData};
  },

  lock : false,

  valuesWereInvalid : Ember.observer("values.@each.isInvalid", "view.values.@each.isInvalid", "disabled", "view.disabled", function() {
    //for now arrayCol is present for all multi value cols
    //change this check if there are exceptions
    if(!this.get("columnData.form.arrayCol")) {
      return;
    }
    var values = this.get("values"),
        isInvalid = !values || values.get("length") === 0 || values.anyBy("isInvalid", true),
        record = this.get("record"), columnData = this.get("columnData");
    if(!record) {
      return;
    }
    if(this.get("disabled")) {
      delete record._validation[columnData.get("name")];
    }
    else {
      this.set("invalid", isInvalid);
      record._validation = record._validation || {};
      if(isInvalid) {
        record._validation[columnData.get("name")] = 1;
      }
      else {
        delete record._validation[columnData.get("name")];
      }
    }
    this.validateValue();
  }),
});
