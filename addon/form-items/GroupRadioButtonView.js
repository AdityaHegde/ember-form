import Ember from "ember";
import TextInputView from "./TextInputView";
import getEmberId from "../getEmberId";
import template from "../templates/views/group-radio-button";

/**
 * View for a group of radio buttons.
 *
 * @class EmberForm.GroupRadioButtonView
 * @extends EmberForm.TextInputView
 * @module ember-form
 * @submodule ember-form-items
 */
export default TextInputView.extend({
  template : template,

  groupName : Ember.computed({
    get : function() {
      return getEmberId(this);
    },
  }),
});
