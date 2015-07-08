import TextInputView from "./TextInputView";
import template from "../templates/views/legend";

/**
 * View for legend tag.
 *
 * @class EmberForm.Legend
 * @extends EmberForm.TextInputView
 * @module ember-form
 * @submodule ember-form-items
 */
export default TextInputView.extend({
  template : template,
  columnData : null,
  record : null,
});
