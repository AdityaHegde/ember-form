import Ember from "ember";
import TextInputView from "./TextInputView";
import EmberFile from "./EmberFile";
import hashHasKeys from "../hashHasKeys";
import template from "../templates/views/file-upload";

/**
 * Form item for a file upload input.
 *
 * @class EmberForm.FileUploadView
 * @extends EmberForm.TextInputView
 * @module ember-form
 * @submodule ember-form-items
 */
export default TextInputView.extend({
  template : template,

  disableBtn : false,
  fileName : "",

  btnLabel : Ember.computed("columnData.form.btnLabel", "view.columnData.form.btnLabel", {
    get : function() {
      return this.get('uploadBtnLabel') || this.get('columnData').get('form.btnLabel');
    },
  }),

  postRead : function(data) {
    this.set("value", data);
  },

  postFail : function(/*message*/) {
    this.set("value", null);
  },

  change : function(event) {
    var
    files = event.originalEvent && event.originalEvent.target.files, that = this,
    columnData = this.get("columnData"),
    record = this.get("record");
    if(files && files.length > 0 && !Ember.isEmpty(files[0])) {
      record._validation = record._validation || {};
      if(columnData.get("form.maxSize") && files[0].size > columnData.get("form.maxSize")) {
        record._validation[columnData.name] = 1;
      }
      else {
        delete record._validation[columnData.name];
        this.set("disableBtn", "disabled");
        this.set("fileName", files[0].name);
        EmberFile[columnData.get("form.method")](files[0]).then(function(data) {
          Ember.run(function() {
            that.postRead(data);
            that.set("disableBtn", false);
          });
        }, function(message) {
          Ember.run(function() {
            that.postFail(message);
            that.set("disableBtn", false);
          });
        });
      }
      this.set("invalid", hashHasKeys(record._validation));
      record.set("validationFailed", hashHasKeys(record._validation));

      this.$().find("input[type='file']")[0].value = "";
    }
  },

  actions : {
    loadFile : function() {
      var fileInput = this.$().find("input[type='file']");
      fileInput.click();
    },
  },
});
