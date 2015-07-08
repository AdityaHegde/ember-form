import Ember from "ember";
import DynamicSelectView from "./DynamicSelectView";
import MultipleValueMixin from "./MultipleValueMixin";
import template from "../templates/views/dynamic-multi-select";

/**
 * View for a select tag with dynamic options and multiple selections.
 *
 * @class EmberForm.DynamicMultiSelectView
 * @extends EmberForm.StaticSelectView
 * @module ember-form
 * @submodule ember-form-items
 */
export default DynamicSelectView.extend(MultipleValueMixin, {
  init : function() {
    this._super();
    this.set("selection", this.get("selection") || Ember.A());
    this.valuesArrayDidChange_Selection();
    this.selectionDidChange();
  },

  selectionLock : false,

  valuesArrayDidChange_Selection : Ember.observer("values.@each.value", "view.values.@each.value", function() {
    if(!this.get("selectionLock")) {
      var values = this.get("values");
      this.set("selectionLock", true);
      this.get("selection").replace(0, this.get("selection.length"), Ember.A(this.get("selectOptions").filter(function(sel) {
        return !Ember.isEmpty(values.findBy("val", sel.get("val")));
      })));
    }
    else {
      this.set("selectionLock", false);
    }
  }),

  selectionDidChange : Ember.observer("selection.@each", "view.selection.@each", "view.selectOptions.@each", "selectOptions.@each", function() {
    if(!this.get("selectionLock")) {
      var
      selection = this.get("selection"),
      selectOptions = this.get("selectOptions");
      this.set("selectionLock", true);
      selection.replace(0, selection.get("length"), Ember.A(selection.filter(function(sel) {
        return !Ember.isEmpty(selectOptions.findBy("val", sel.get("val")));
      })));
      this.set("values", Ember.A(selection.slice()));
    }
    else {
      this.set("selectionLock", false);
    }
  }),

  selection : null,

  template : template,
});
