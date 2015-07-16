import Ember from "ember";
import EmberFile from "../EmberFile";
import layout from "../templates/components/file-input";

export default Ember.Component.extend({
  layout : layout,

  disableBtn : false,
  fileName : "",

  uploadBtnLabel : "",
  btnLabel : Ember.computed("columnData.form.btnLabel", {
    get : function() {
      return this.get("uploadBtnLabel") || this.get("columnData.form.btnLabel");
    },
  }),

  postRead : function(data) {
    this.set("value", data);
  },

  postFail : function(message) {
    this.set("value", null);
    this.set("invalidMessage", message);
  },

  change : function(event) {
    var
    files = event.originalEvent && event.originalEvent.target.files, that = this,
    columnData = this.get("columnData");
    if(files && files.length > 0 && !Ember.isEmpty(files[0])) {
      this.get("formItem").validateValue(files && files[0], this.get("columnData.form.fileValidation"));

      this.set("disableBtn", true);
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
