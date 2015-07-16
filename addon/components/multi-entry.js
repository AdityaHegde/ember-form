import Ember from "ember";
import EmberColumnData from "ember-column-data";
import FormItem from "./form-item";
import copyValuesToObject from "../copyValuesToObject";
import layout from "../templates/components/multi-entry";

export default FormItem.extend(EmberColumnData.ColumnDataChangeCollectorMixin, {
  layout : layout,

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
      copyValuesToObject(data, columnData, record);
      entry = this.createRecordForEntry(data);
      if(!value) {
        value = [];
        this.set("value", value);
      }
      value.pushObject(entry);
    },

    deleteEntry : function(entry) {
      var value = this.get("value");
      value.removeObject(entry);
    },
  },
});
