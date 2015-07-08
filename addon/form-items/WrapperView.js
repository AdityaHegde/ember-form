import Ember from "ember";
import TypeToCellNameMap from "./TypeToCellNameMap";
import template from "../templates/views/wrapper";

/**
 * Extend this to add extra content before views like Form.MultiEntryView or Form.MultiInputView.
 *
 * @class EmberForm.WrapperView
 * @module ember-form
 * @submodule ember-form-items
 */
export default Ember.View.extend({
  childView : Ember.computed("view.columnData.childCol.type", {
    get : function() {
      var columnData = this.get("columnData");
      return TypeToCellNameMap[columnData.get("childCol").type];
    },
  }),

  template : template,
});
