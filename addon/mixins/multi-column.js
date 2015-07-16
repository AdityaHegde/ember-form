import Ember from "ember";
import layout from "../templates/mixins/multi-column";

/**
 * Mixin for views with multiple child view with column data.
 *
 * @class EmberForm.MultiColumnMixin
 */
export default Ember.Mixin.create({
  parentForRows : Ember.computed({
    get : function() {
      return this;
    },
  }),

  filteredCols : Ember.computed("columnDataGroup.columns.@each.form", "view.columnDataGroup.columns.@each.form", "record.isNew", "view.record.isNew", {
    get : function() {
      var cols = this.get("columnDataGroup.columns"), record = this.get("record"), that = this;
      if(cols) {
        return Ember.A(cols.filter(function(columnData) {
          return that.canAddColumnData(columnData, record);
        }));
      }
      return Ember.A([]);
    },
  }),

  canAddColumnData : function(columnData, record) {
    return columnData.get("form") && (!columnData.get("form.removeOnEdit") || !record || record.get("isNew")) && (!columnData.get("form.removeOnNew") || !record || !record.get("isNew"));
  },

  layout : layout,
});
