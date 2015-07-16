import Ember from "ember";
import EmberColumnData from "ember-column-data";
/* jshint ignore:start */
import EmberForm from "ember-form";
/* jshint ignore:end */

export default Ember.Controller.extend({
  columnDataGroup : EmberColumnData.ColumnDataGroup.create({
    name : "formTest",
    columns : [{
      name : "vara",
      label : "VarA",
      form : {},
    }, {
      name : "varb",
      label : "VarB",
      form : {
        moduleType : "select",
        options : [
          {value : "v0", label : "l0"},
          {value : "v1", label : "l1"},
          {value : "v2", label : "l2"},
        ],
        prompt : "Select",
        //multiple : true,
      },
    }, {
      name : "varc",
      form : {
        moduleType : "checkbox",
        checkboxLabel : "VarB",
      },
    }, {
      name : "vard",
      label : "VarD",
      form : {
        moduleType : "radioGroup",
        options : [
          {value : "v0", label : "l0"},
          {value : "v1", label : "l1"},
          {value : "v2", label : "l2"},
        ],
      },
    }, {
      name : "vare",
      label : "VarE",
      form : {
        moduleType : "multiInput",
      },
      childColumnDataGroup : {
        name : "vareInputs",
        columns : [{
          name : "varf",
          label : "VarF",
          form : {},
        }, {
          name : "varg",
          form : {
            checkboxLabel : "VarG",
            moduleType : "checkbox",
          },
        }],
        form : {},
      },
    }, {
      name : "varh",
      label : "VarH",
      form : {
        moduleType : "multiEntry",
        canManipulateEntries : true,
      },
      childColumnData : {
        name : "vari",
        label : "VarI",
        form : {},
      },
    }, {
      name : "varj",
      label : "VarJ",
      form : {
        moduleType : "fileInput",
        btnLabel : "Upload",
        method : "ReadFileAsText",
        fileValidation : {
          validations : [
            {type : 6, maxSize : 1000, invalidMessage : "Max size exceeded"},
            {type : 7, typesMap : {}, invalidMessage : "Invalid type"},
          ],
        },
      },
    }],
    form : {},
  }),
});
