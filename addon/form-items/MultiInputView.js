import Ember from "ember";
import MultiColumnMixin from "../MultiColumnMixin";
import EmberColumnData from "ember-column-data";

/**
 * View for multiple form items.
 *
 * @class EmberForm.MultiInputView
 * @extends EmberForm.MultiColumnMixin
 * @module ember-form
 * @submodule ember-form-items
 */
export default Ember.View.extend(MultiColumnMixin, EmberColumnData.ColumnDataChangeCollectorMixin, {
  classNames : ['clearfix'],
  classNameBindings : ['columnData.form.additionalClass'],

  parentForRows : Ember.computed("columnData.form.propogateValChange", {
    get : function() {
      if(this.get("columnData.form.propogateValChange")) {
        return this.get("parentForm");
      }
      else {
        return this;
      }
    },
  }),

  columnDataGroup : Ember.computed.alias("columnData.childColGroup"),
});
