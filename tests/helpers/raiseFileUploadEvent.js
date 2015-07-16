import Ember from "ember";

export default Ember.Test.registerHelper("raiseFileUploadEvent", function (app, form, fileName, fileType, content) {
  var
  files = [{
    name : fileName,
    type : fileType,
    size : content.length,
    data : content,
  }];

  form.get("childViews.0.childViews.0").change({
    originalEvent : {
      target : {
        files : files,
      },
    },
  });
});
