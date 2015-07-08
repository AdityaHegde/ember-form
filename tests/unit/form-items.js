/* jshint ignore:start */
define([
  "ember",
  "ember_data",
  "ember_test_utils",
  "source/ember-utils",
], function(Ember, DS, EmberTests, EmberUtils) {

return function() {

EmberTests.TestCase.EmberTestSuit.create({
  suitName : "form-items", 
  param : "view:form/form", 
  moduleOpts : {
    setup : function() {
      TestApp.advanceReadiness();
    },
    teardown : function() {
      //TestApp.reset();
    },
    needs : [
      'model:test',
      'model:testp',
      'view:form/textInput',
      'view:form/checkBox',
      'view:form/staticSelect',
      'view:form/dynamicSelect',
      'view:form/dynamicMultiSelect',
      'view:form/fileUpload',
      'view:form/cSVDataInput',
      'view:lazyDisplay/lazyDisplay',
      'view:form/multiInput',
      'view:form/multiEntry',
      'view:form/radioInput',
      'view:form/groupRadioButton',
    ],
  },

  testCases : [{
    title : "Check propagation of text from text field to record",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "record", Ember.Object.create({vara : "Init"})],
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "vara",
            label : "Vara",
            validation : {
              validations : [
                {type : 0},
                {type : 1, regex : "^[0-9a-zA-Z \\.\\-_]{1,50}$", negate : true, invalidMessage : "Vara cannot have special Characters"},
              ],
            },
            form : {moduleType : "textInput"},
          }],
          form : {},
        })],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.vara", "Init", "Value of vara is 'Init' intially"],
        ]],
        ["fillFormElement", "vara", "input", "From DOM"],
      ]],
      ["checkValues", [
        //"type", "path", "value", "message"
        ["base", "record.vara", "From DOM", "Value of vara is 'From DOM' after the input was filled"],
      ]],
      ["destroyForm"],
    ],
  }, {
    title : "Check that record becomes invalid if invalid text is entered",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "record", Ember.Object.create({vara : "Init"})],
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "vara",
            label : "Vara",
            validation : {
              validations : [
                {type : 0},
                {type : 1, regex : "^[0-9a-zA-Z \\.\\-_]{1,50}$", negate : true, invalidMessage : "Vara cannot have special Characters"},
              ],
            },
            form : {moduleType : "textInput"},
          }],
          form : {},
        })],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["fillFormElement", "vara", "input", "Invalid#"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.validationFailed", true, "Record's 'validationFailed' is true"],
        ]],
        ["fillFormElement", "vara", "input", "Valid"],
      ]],
      ["checkValues", [
        //"type", "path", "value", "message"
        ["base", "record.validationFailed", false, "Record's 'validationFailed' is false"],
      ]],
      ["destroyForm"],
    ],
  }, {
    title : "Test check box component",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "record", Ember.Object.create({vara : true})],
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "vara",
            label : "Vara",
            form : {moduleType : "checkBox"},
          }],
          form : {},
        })],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.vara", true, "Value of vara is 'true' intially"],
        ]],
        ["clickFormElement", "vara", "input"],
      ]],
      ["checkValues", [
        //"type", "path", "value", "message"
        ["base", "record.vara", false, "Value of vara is 'false' after the input was filled"],
      ]],
      ["destroyForm"],
    ],
  }, {
    title : "Test static select component",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "record", Ember.Object.create({vara : "Init"})],
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "vara",
            label : "Vara",
            form : {
              moduleType : "staticSelect",
              options : [
                {val : "v0", label : "l0"},
                {val : "v1", label : "l1"},
                {val : "v2", label : "l2"},
              ],
              prompt : "Select",
            },
          }],
          form : {},
        })],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["fillFormElement", "vara", "select", "v1"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.vara", "v1", "Value of vara is 'v1', after selecting 'l1'"],
        ]],
        ["destroyForm"],
      ]],
    ],
  }, {
    title : "Test dynamic select component",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "GlobalData", EmberUtils.CrudAdapter.GlobalData],
        ["base", "GlobalData", "data", [
          Ember.Object.create({data_val : "v0", data_label : "l0"}),
        ]],
        ["base", "", "record", Ember.Object.create({vara : "Init"})],
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "vara",
            label : "Vara",
            form : {
              moduleType : "dynamicSelect",
              dataPath : "EmberUtils.CrudAdapter.GlobalData.data",
              dataValCol : "data_val",
              dataLabelCol : "data_label",
              prompt : "Select",
            },
          }],
          form : {},
        })],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["fillFormElement", "vara", "select", "v0"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.vara", "v0", "Value of vara is 'v0', after selecting 'l0'"],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "GlobalData.data", "", Ember.Object.create({data_val : "v1", data_label : "l1"}), "push"],
        ]],
      ]],
      ["baseTestBlock", [
        ["fillFormElement", "vara", "select", "v1"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.vara", "v1", "Value of vara is 'v1', after selecting 'l1'"],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "form", "record", Ember.Object.create({vara : "v0"})],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "form.childViews.0.value", "v0", "'value' of form is 'v0' after changing record directly"],
          ["base", "form.record.vara",        "v0", "Value of vara is 'v0' after modifying record directly"],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "GlobalData", "data", [
            Ember.Object.create({data_val : "v0", data_label : "l0"}),
            Ember.Object.create({data_val : "v1", data_label : "l1"}),
            Ember.Object.create({data_val : "v2", data_label : "l2"}),
          ]],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "form.childViews.0.value", "v0", "'value' of form is 'v0' after changing options directly"],
          ["base", "form.record.vara",        "v0", "Value of vara is 'v0' after modifying options directly"],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "GlobalData", "data", [
            Ember.Object.create({data_val : "v1", data_label : "l1"}),
            Ember.Object.create({data_val : "v2", data_label : "l2"}),
          ]],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "form.childViews.0.value", undefined, "'value' of form is 'undefined' after changing options directly without the previously selected value"],
          ["base", "form.record.vara",        undefined, "Value of vara is 'undefined' after modifying options directly without the previously selected value"],
        ]],
        ["destroyForm"],
      ]],
    ],
  }, {
    title : "Test dynamic select component with registry",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "GlobalData", EmberUtils.CrudAdapter.GlobalData],
        ["base", "GlobalData", "data", [
          Ember.Object.create({data_val : "v0", data_label : "l0"}),
        ]],
        ["base", "", "record", Ember.Object.create({vara : "Init"})],
        ["base", "record", "dataRegistry", {
          v0 : {
            values : [
              {v : "v00", l : "l00"},
              {v : "v01", l : "l01"},
            ],
            "default" : "v00",
          },
          v1 : {
            values : [
              {v : "v10", l : "l10"},
              {v : "v11", l : "l11"},
            ],
            "default" : "v10",
          },
          v2 : {
            values : [
              {v : "v20", l : "l20"},
              {v : "v21", l : "l21"},
              {v : "v22", l : "l22"},
            ],
          },
        }],
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "vara",
            label : "Vara",
            form : {
              moduleType : "staticSelect",
              options : [
                {val : "v0", label : "l0"},
                {val : "v1", label : "l1"},
                {val : "v2", label : "l2"},
              ],
              prompt : "Select",
            },
          }, {
            name : "varb",
            label : "VarB",
            form : {
              moduleType : "dynamicSelect",
              dataPath : "record.vara",
              dataValCol : "v",
              dataLabelCol : "l",
              dataRegPath : "record.dataRegistry",
              prompt : "Select",
            },
          }],
          form : {},
        })],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["fillFormElement", "vara", "select", "v0"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.varb", "v00", "Value of vara is set to default 'v00'"],
        ]],
      ]],
      ["baseTestBlock", [
        ["fillFormElement", "vara", "select", "v2"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          //TODO : fix this failure
          //["base", "record.varb", undefined, "Value of vara is undefined as default is not set"],
        ]],
        ["fillFormElement", "varb", "select", "v21"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.varb", "v21", "Value of vara is 'v21', after selecting 'l21'"],
        ]],
        ["destroyForm"],
      ]],
    ],
  }, {
    title : "Test dynamic multi select component",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "GlobalData", EmberUtils.CrudAdapter.GlobalData],
        ["base", "GlobalData", "data", [
          Ember.Object.create({data_val : "v0", data_label : "l0"}),
          Ember.Object.create({data_val : "v1", data_label : "l1"}),
          Ember.Object.create({data_val : "v2", data_label : "l2"}),
        ]],
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "tests",
            label : "Tests",
            form : {
              moduleType : "dynamicMultiSelect",
              dataPath : "EmberUtils.CrudAdapter.GlobalData.data",
              dataValCol : "data_val",
              dataLabelCol : "data_label",
              arrayCol : "vara",
              arrayType : "test",
              copyAttrs : {
                varb : "varb",
              },
              staticAttrs : {
                varc : "varc_static",
              },
              valAttrs : {
                label : "vard",
                val : "vara",
              },
              eachValidations : [
                {type : 0},
              ],
            },
          }],
          form : {},
        })],
        ["base", "", "ApplicationAdapter",    EmberUtils.CrudAdapter.ApplicationAdapter],
        ["base", "", "ApplicationSerializer", EmberUtils.CrudAdapter.ApplicationSerializer],
      ]],
      ["setupStore"],
      ["baseTestBlock", [
        ["createRecord", "testp", {vara : "test", varb : "test_varb"}],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["fillFormElement", "tests", "select", ["v0", "v1"]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.tests.0.vara", "v0",          "'vara' of 1st element is 'v0'"                                               ],
          ["base", "record.tests.0.varb", "test_varb",   "'varb' of 1st element is 'test_varb' copied from 'record'"                   ],
          ["base", "record.tests.0.varc", "varc_static", "'varc' of 1st element is 'varc_static' assigned a static value"              ],
          ["base", "record.tests.0.vard", "l0",          "'vard' of 1st element is 'l0' copied from selected value from dynamic select"],
          ["base", "record.tests.1.vara", "v1",          "'vara' of 2nd element is 'v1'"                                               ],
          ["base", "record.tests.1.varb", "test_varb",   "'varb' of 2nd element is 'test_varb' copied from 'record'"                   ],
          ["base", "record.tests.1.varc", "varc_static", "'varc' of 2nd element is 'varc_static' assigned a static value"              ],
          ["base", "record.tests.1.vard", "l1",          "'vard' of 2nd element is 'l1' copied from selected value from dynamic select"],
        ]],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "record.tests.@", "", "", "pop"],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "form.childViews.0.selection.@.val", ["v0"], "selection was updated when value associated was directly updated"],
        ]],

        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "GlobalData", "data", [
            Ember.Object.create({data_val : "v0", data_label : "l0"}),
          ]],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "form.childViews.0.selection.@.val", ["v0"], "selection was retained when options was updated"],
          ["base", "record.tests.@.vara",               ["v0"], "record value was retained when options was updated"],
        ]],

        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "GlobalData", "data", [
            Ember.Object.create({data_val : "v1", data_label : "l1"}),
          ]],
        ]],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "form.childViews.0.selection.length", 0, "selection was emptied when options without the selected was updated"],
          ["base", "record.tests.length",                0, "record value was emptied when options without the selected was updated"],
        ]],
        ["destroyForm"],
      ]],
    ],
  }, {
    title : "Test file upload",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["shimReader"],
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "vara",
            label : "VarA",
            form : {
              moduleType : "fileUpload",
              accept : ".csv, .txt, text/csv, text/plain",
              method : "ReadFileAsText",
              maxSize : 15,
            },
            validation : {
              validations : [],
            },
          }],
          form : {},
        })],
        ["base", "", "record", Ember.Object.create()],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["raiseFileUploadEvent", "test", "text/plain", "file data"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.vara", "file data", "File data was loaded"],
        ]],
        ["raiseFileUploadEvent", "test", "text/plain", "file data longer that maxSize"],
      ]],
      ["checkValues", [
        //"type", "path", "value", "message"
        ["base", "record.vara",             "file data", "File data was not loaded"             ],
        ["base", "record.validationFailed", true,        "Validation failed as maxSize exceeded"],
      ]],
      ["destroyForm"],
      ["restoreReader"],
    ],
  }, {
    title : "Test csv data",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["shimReader"],
      ["initLazyDisplay"],
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "tests",
            label : "Tests",
            form : {
              moduleType : "csvData",
              arrayCol : "vara",
              arrayType : "test",
              btnLabel : "Upload File",
              splitRegex : "\\s*[,\\n\\r]\\s*",
              accept : ".csv, .txt, text/csv, text/plain",
              rows : "5",
              cols : "100",
              method : "ReadFileAsText",
              copyAttrs : {
                varb : "varb",
              },
              staticAttrs : {
                varc : "varc_static",
              },
              valAttrs : {
                label : "vard",
              },
              eachValidations : [
                {type : 0},
              ],
            },
            validation : {
              validations : [],
            },
            childColGroup : {
              name : "csvLazyDisplay",
              lazyDisplay : {
                rowDelay : 50,
                rowHeight : 30,
                lazyDisplayMainClass : "Form.CSVDataValues",
              },
            },
          }],
          form : {},
        })],
        ["base", "", "ApplicationAdapter",    EmberUtils.CrudAdapter.ApplicationAdapter],
        ["base", "", "ApplicationSerializer", EmberUtils.CrudAdapter.ApplicationSerializer],
      ]],
      ["setupStore"],
      ["baseTestBlock", [
        ["createRecord", "testp", {vara : "test", varb : "test_varb"}],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["fillFormElement", "tests", "textarea", "test1, test2, test3, test4, test5"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.tests.@.vara", ["test1", "test2", "test3", "test4", "test5"], "Right 'vara' values were assigned"],
        ]],
        ["fillFormElement", "tests", "textarea", "test6, test7, test8, test9, test10"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.tests.@.vara", ["test6", "test7", "test8", "test9", "test10"],                              "Right 'vara' values were assigned"],
          ["base", "record.tests.@.varb", ["test_varb", "test_varb", "test_varb", "test_varb", "test_varb"],           "Right 'varb' values were assigned"],
          ["base", "record.tests.@.varc", ["varc_static", "varc_static", "varc_static", "varc_static", "varc_static"], "Right 'varc' values were assigned"],
        ]],
        ["raiseFileUploadEvent", "test", "text/plain", "test11, test12"],
      ]],
      ["checkValues", [
        //"type", "path", "value", "message"
        ["base", "record.tests.@.vara", ["test11", "test12"], "Right 'vara' values were assigned"],
      ]],
      ["destroyForm"],
      ["restoreReader"],
    ],
  }, {
    title : "Test radio buttons component",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "vara",
            label : "VarA",
            form : {
              moduleType : "groupRadioButton",
              options : [
                {val : "v0", label : "l0"},
                {val : "v1", label : "l1"},
                {val : "v2", label : "l2"},
              ],
            },
            validation : {
              validations : [],
            },
          }],
          form : {},
        })],
        ["base", "", "record", Ember.Object.create({})],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["clickFormElement", "vara", "input", "[value='v1']"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.vara", "v1", "Value of vara is 'v1', after clicking 'l1' radio button"],
        ]],
        ["clickFormElement", "vara", "input", "[value='v2']"],
      ]],
      ["checkValues", [
        //"type", "path", "value", "message"
        ["base", "record.vara", "v2", "Value of vara is 'v2', after clicking 'l2' radio button"],
      ]],
      ["destroyForm"],
    ],
  }, {
    title : "Multi entry with Multi input",
    type : "crudTestCase",
    testData : {},
    testBlocks : [
      ["setupStore"],
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "tests",
            label : "Tests",
            form : {
              moduleType : "multiEntry",
              arrayType : "test",
              copyAttrs : {
                varb : "varb",
              },
              staticAttrs : {
                varc : "varc_static",
              },
              valAttrs : {
                label : "vard",
              },
            },
            childCol : {
              name : "test",
              form : {
                moduleType : "multiInput",
              },
              childColGroup : {
                name : "test",
                columns : [{
                  name : "vara",
                  label : "VarA",
                  form : {
                    moduleType : "textInput",
                  },
                  bubbleValues : true,
                  columnListenerEntries : [{name : 'vara'}],
                  validation : {
                    validations : [
                      {type : 4, duplicateCheckPath : "testp.tests", duplicateCheckKey : "vara"},
                    ],
                  },
                }, {
                  name : "varb",
                  label : "VarB",
                  form : {
                    moduleType : "staticSelect",
                    options : [
                      {val : "vb0", label : "lb0"},
                      {val : "vb1", label : "lb1"},
                      {val : "vb2", label : "lb2"},
                    ],
                  },
                }],
                form : {},
              },
            },
            validation : {
              validations : [],
            },
          }],
          form : {},
        })],
      ]],
      ["findRecord", "testp", "test1"],
      ["baseTestBlock", [
        ["correctRecord"],
        ["initForm"],
      ]],
      ["baseTestBlock", [
        ["clickFormElement", "tests", ".each-multi-entry", ":nth(1) .add-entry .glyphicon"],
      ]],
      ["baseTestBlock", [
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "record.tests.3", "vara", "test14_new"],
        ]],
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.tests.@.vara", ["test11", "test12", "test13", "test14_new"], "Records has right vara values"],
        ]],
      ]],
      ["baseTestBlock", [
        ["clickFormElement", "tests", ".each-multi-entry", ":nth(1) .remove-entry .glyphicon"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "record.tests.@.vara", ["test11", "test13", "test14_new"], "Records has right vara values"],
        ]],
      ]],
      ["destroyForm"],
    ],
  }, {
    title : "hideForColumns and disableForColumns",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["assignValues", [
        //"type", "path", "putPath", "value", "param", "valuePath"
        ["base", "", "columnDataGroup", EmberUtils.ColumnDataMod.ColumnDataGroup.create({
          name : "formTest",
          columns : [{
            name : "vara",
            label : "VarA",
            form : {
              moduleType : "staticSelect",
              options : [
                {val : "va0", label : "la0"},
                {val : "va1", label : "la1"},
                {val : "va2", label : "la2"},
              ],
            },
          }, {
            name : "varb",
            label : "VarB",
            form : {
              moduleType : "textInput",
              hideForColumns : [{name : 'vara', value : "va0", hide : true}],
            },
            bubbleValues : true,
            columnListenerEntries : [{name : 'vara'}],
          }, {
            name : "varc",
            label : "VarC",
            form : {
              moduleType : "textInput",
              disableForColumns : [{name : 'vara', value : "va1", enable : true}],
            },
            bubbleValues : true,
            columnListenerEntries : [{name : 'vara'}],
          }],
          form : {},
        })],
        ["base", "", "record", Ember.Object.create({vara : "va0"})],
      ]],
      ["initForm"],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "form.childViews.1.hidden",   true,  "VarB was hidden for vara value = 'va0'"],
          ["base", "form.childViews.2.hidden",   false, "VarC was not hidden for vara value = 'va0'"],
          ["base", "form.childViews.1.disabled", false, "VarB was not disabled for vara value = 'va0'"],
          ["base", "form.childViews.2.disabled", true,  "VarC was disabled for vara value = 'va0'"],
        ]],
        ["fillFormElement", "vara", "select", "va1"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "form.childViews.1.hidden",   false, "VarB was not hidden for vara value = 'va1'"],
          ["base", "form.childViews.2.hidden",   false, "VarC was not hidden for vara value = 'va1'"],
          ["base", "form.childViews.1.disabled", false, "VarB was not disabled for vara value = 'va1'"],
          ["base", "form.childViews.2.disabled", false, "VarC was not disabled for vara value = 'va1'"],
        ]],
        ["fillFormElement", "vara", "select", "va2"],
      ]],
      ["baseTestBlock", [
        ["checkValues", [
          //"type", "path", "value", "message"
          ["base", "form.childViews.1.hidden",   false, "VarB was not hidden for vara value = 'va2'"],
          ["base", "form.childViews.2.hidden",   false, "VarC was not hidden for vara value = 'va2'"],
          ["base", "form.childViews.1.disabled", false, "VarB was not disabled for vara value = 'va2'"],
          ["base", "form.childViews.2.disabled", true,  "VarC was disabled for vara value = 'va2'"],
        ]],
      ]],
      ["destroyForm"],
    ],
  }],
});

};

});
/* jshint ignore:end */
