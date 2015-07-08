import Ember from "ember";
import EmberColumnData from "ember-column-data";
import TextInputView from "./TextInputView";
import copyValuesToObject from "./copyValuesToObject";
import TypeToCellNameMap from "./TypeToCellNameMap";
import $ from "jquery";
import template from "../templates/views/multi-entry";

/**
 * View for multiple rows of items.
 *
 * @class EmberForm.MultiEntryView
 * @extends EmberForm.TextInputView
 * @module ember-form
 * @submodule ember-form-items
 */

export default TextInputView.extend(EmberColumnData.ColumnDataChangeCollectorMixin, {
  childView : Ember.computed("view.columnData.childCol.form.moduleType", {
    get : function() {
      var columnData = this.get("columnData");
      return TypeToCellNameMap[columnData.get("childCol.form.moduleType")];
    },
  }),

  template : template,

  valuesArrayDidChange : Ember.observer("value.@each", "view.value.@each", function() {
    if(this.get("record")) {
      this.validateValue(this.get("value"));
    }
  }),

  createRecordForEntry : function(data) {
    return this.get("columnData.form.arrayType").create(data);
  },

  actions : {
    addEntry : function() {
      var record = this.get("record"), columnData = this.get("columnData"),
          entry, value = this.get("value"), data = {};
      $('.tooltip').hide();
      copyValuesToObject(data, columnData, record);
      entry = this.createRecordForEntry(data);
      if(!value) {
        value = [];
        this.set("value", value);
      }
      value.pushObject(entry);
    },

    deleteEntry : function(entry) {
      $('.tooltip').hide();
      var value = this.get("value");
      value.removeObject(entry);
    },
  },
});
