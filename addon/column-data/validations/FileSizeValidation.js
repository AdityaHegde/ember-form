import EmberColumnData from "ember-column-data";

var FileSizeValidation = EmberColumnData.ColumnDataValidation.ColumnDataValidationsMap[0].extend({
  maxSize : 0,

  validateValue : function(file/*, record*/) {
    return [file.size > this.get("maxSize"), this.get("invalidMessage")];
  },
});

EmberColumnData.ColumnDataValidation.ColumnDataValidationsMap[6] = FileSizeValidation;

export default FileSizeValidation;
