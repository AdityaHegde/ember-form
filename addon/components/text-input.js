import Ember from "ember";

export default Ember.TextField.extend({
  columnData : null,
  attributeBindings : ["columnData.form.autofocus:autofocus", "columnData.form.placeholderActual:placeholder", "columnData.form.maxlength:maxlength"],
  classNames : ["form-control"],
});
