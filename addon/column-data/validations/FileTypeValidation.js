import Ember from "ember";
import EmberColumnData from "ember-column-data";

var FileTypeValidation = EmberColumnData.ColumnDataValidation.ColumnDataValidationsMap[0].extend({
  typesMap : null,

  validateValue : function(file/*, record*/) {
    return [Ember.isEmpty(this.get("typesMap")[file.type]), this.get("invalidMessage")];
  },
});

EmberColumnData.ColumnDataValidation.ColumnDataValidationsMap[7] = FileTypeValidation;

export default FileTypeValidation;
