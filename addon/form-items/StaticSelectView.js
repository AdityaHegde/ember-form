import TextInputView from "./TextInputView";
import template from "../templates/views/static-select";

/**
 * View for select tag with static options.
 *
 * @class EmberForm.StaticSelectView
 * @extends EmberForm.TextInputView
 * @module ember-form
 * @submodule ember-form-items
 */
//TODO : support multiple on static select (no requirement for now)
export default TextInputView.extend({
  template : template,

  helpblock : "",
});
