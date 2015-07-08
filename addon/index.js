/**
 * A module for a form.
 *
 * @module ember-form
 */

import Ember from "ember";
import MultiColumnMixin from "./MultiColumnMixin";
import FormColumnData from "./form-column-data/index";
import FormItems from "./form-items/index";

var
EmberForm = Ember.Namespace.create(),
formModules = [FormItems, FormColumnData];
window.EmberForm = EmberForm;

EmberForm.MultiColumnMixin = MultiColumnMixin;

for(var i = 0; i < formModules.length; i++) {
  for(var k in formModules[i]) {
    if(formModules[i].hasOwnProperty(k)) {
      EmberForm[k] = formModules[i][k];
    }
  }
}

Ember.View.reopen({
  attributeBindings: ["autofocus", "data-target", "data-toggle", "data-original-title", "data-column-name"]
});

export default EmberForm;
