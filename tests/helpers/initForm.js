import Ember from "ember";

export default Ember.Test.registerAsyncHelper("initForm", function(app, assert, form, record, columnDataGroup) {
  form.set("record", record);
  form.set("columnDataGroup", columnDataGroup);
  form.appendTo("#ember-testing");
  assert.form = form;

  //return wait(app);
});
