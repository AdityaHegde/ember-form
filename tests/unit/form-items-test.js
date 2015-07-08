import Ember from "ember";
import { moduleForComponent, test } from "ember-qunit";
import startApp from "../helpers/start-app";
import EmberColumnData from "ember-column-data";
import EmberFrom from "ember-form";
import getColumnSelector from "../helpers/getColumnSelector";

Ember.run(function() {
  window.GlobalData = Ember.Namespace.create();
});

moduleForComponent("ember-form", "Ember Form", {
  beforeEach : function(assert) {
    assert.application = startApp();
  },

  afterEach : function(assert) {
    Ember.run(assert.application, 'destroy');
  },

  needs : [
    "view:emberFormTextInput",
    "view:emberFormCheckBox",
    "view:emberFormStaticSelect",
    "view:emberFormDynamicSelect",
    "view:emberFormDynamicMultiSelect",
    "view:emberFormFileUpload",
    "view:emberFormRadioInput",
    "view:emberFormGroupRadioButton",
    "view:emberFormMultiEntry",
    "view:emberFormMultiInput",
  ],
});

test("Check propagation of text from text field to record", function(assert) {
  initForm(assert, this.subject(), Ember.Object.create({vara : "Init"}), EmberColumnData.ColumnDataGroup.create({
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
  }));

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), "Init", "Value of vara is 'Init' intially");

    fillFormElement("vara", "input", "From DOM");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), "From DOM", "Value of vara is 'From DOM' after the input was filled");
  });
});

test("Check that record becomes invalid if invalid text is entered", function(assert) {
  initForm(assert, this.subject(), Ember.Object.create({vara : "Init"}), EmberColumnData.ColumnDataGroup.create({
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
  }));

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.validationFailed"), false, "Record's 'validationFailed' is false intially");

    fillFormElement("vara", "input", "#invalid");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.validationFailed"), true, "Record's 'validationFailed' is true");

    fillFormElement("vara", "input", "valid");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.validationFailed"), false, "Record's 'validationFailed' is false");
  });
});

test("Test check box component", function(assert) {
  initForm(assert, this.subject(), Ember.Object.create({vara : true}), EmberColumnData.ColumnDataGroup.create({
    name : "formTest",
    columns : [{
      name : "vara",
      label : "Vara",
      form : {moduleType : "checkBox"},
    }],
    form : {},
  }));

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), true, "Value of vara is 'true' intially");

    clickFormElement("vara", "input", "");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), false, "Value of vara is 'false' after the input was filled");
  });
});

test("Test static select component", function(assert) {
  initForm(assert, this.subject(), Ember.Object.create({vara : ""}), EmberColumnData.ColumnDataGroup.create({
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
  }));

  wait();

  andThen(function() {
    fillFormElement("vara", "select", "v1");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), "v1", "Value of vara is 'v1', after selecting 'l1'");
  });
});

test("Test dynamic select component", function(assert) {
  Ember.run(function() {
    window.GlobalData.set("data", Ember.A([
      Ember.Object.create({data_val : "v0", data_label : "l0"}),
    ]));
  });
  initForm(assert, this.subject(), Ember.Object.create({vara : ""}), EmberColumnData.ColumnDataGroup.create({
    name : "formTest",
    columns : [{
      name : "vara",
      label : "Vara",
      form : {
        moduleType : "dynamicSelect",
        dataPath : "GlobalData.data",
        dataValCol : "data_val",
        dataLabelCol : "data_label",
        prompt : "Select",
      },
    }],
    form : {},
  }));

  wait();

  andThen(function() {
    fillFormElement("vara", "select", "v0");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), "v0", "Value of vara is 'v0', after selecting 'l0'");

    window.GlobalData.get("data").pushObject(Ember.Object.create({data_val : "v1", data_label : "l1"}));
  });

  wait();

  andThen(function() {
    fillFormElement("vara", "select", "v1");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), "v1", "Value of vara is 'v1', after selecting 'l1'");

    assert.form.set("record", Ember.Object.create({vara : "v0"}));
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("childViews.0.value"), "v0", "'value' of form is 'v0' after changing record directly");
    assert.equal(assert.form.get("record.vara"), "v0", "Value of vara is 'v0' after modifying record directly");

    window.GlobalData.set("data", Ember.A([
      Ember.Object.create({data_val : "v0", data_label : "l0"}),
      Ember.Object.create({data_val : "v1", data_label : "l1"}),
      Ember.Object.create({data_val : "v2", data_label : "l2"}),
    ]));
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("childViews.0.value"), "v0", "'value' of form is 'v0' after changing options directly");
    assert.equal(assert.form.get("record.vara"), "v0", "Value of vara is 'v0' after modifying options directly");

    window.GlobalData.set("data", Ember.A([
      Ember.Object.create({data_val : "v1", data_label : "l1"}),
      Ember.Object.create({data_val : "v2", data_label : "l2"}),
    ]));
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("childViews.0.value"), undefined, "'value' of form is 'undefined' after changing options directly without the previously selected value");
    assert.equal(assert.form.get("record.vara"), undefined, "Value of vara is 'undefined' after modifying options directly without the previously selected value");
  });
});

test("Test dynamic select component with registry", function(assert) {
  Ember.run(function() {
    window.GlobalData.set("data", Ember.A([
      Ember.Object.create({data_val : "v0", data_label : "l0"}),
    ]));
    window.GlobalData.set("dataRegistry", {
      v0 : {
        values : Ember.A([
          Ember.Object.create({data_val : "v00", data_label : "l00"}),
          Ember.Object.create({data_val : "v01", data_label : "l01"}),
        ]),
        "default" : "v00",
      },
      v1 : {
        values : Ember.A([
          Ember.Object.create({data_val : "v10", data_label : "l10"}),
          Ember.Object.create({data_val : "v11", data_label : "l11"}),
        ]),
        "default" : "v10",
      },
      v2 : {
        values : Ember.A([
          Ember.Object.create({data_val : "v20", data_label : "l20"}),
          Ember.Object.create({data_val : "v21", data_label : "l21"}),
          Ember.Object.create({data_val : "v22", data_label : "l22"}),
        ]),
      },
    });
  });
  initForm(assert, this.subject(), Ember.Object.create({vara : ""}), EmberColumnData.ColumnDataGroup.create({
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
      label : "Varb",
      form : {
        moduleType : "dynamicSelect",
        dataPath : "record.vara",
        dataValCol : "data_val",
        dataLabelCol : "data_label",
        dataRegPath : "GlobalData.dataRegistry",
        prompt : "Select",
      },
    }],
    form : {},
  }));

  wait();

  andThen(function() {
    fillFormElement("vara", "select", "v0");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.varb"), "v00", "Value of vara is set to default 'v00' for 'v0'");

    fillFormElement("vara", "select", "v2");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.varb"), undefined, "Value of vara is undefined as default is not set for 'v2'");

    fillFormElement("varb", "select", "v21");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.varb"), "v21", "Value of vara is 'v21', after selecting 'l21'");
  });
});

test("Test dynamic multi select component", function(assert) {
  Ember.run(function() {
    window.GlobalData.set("data", Ember.A([
      Ember.Object.create({data_val : "v0", data_label : "l0"}),
      Ember.Object.create({data_val : "v1", data_label : "l1"}),
      Ember.Object.create({data_val : "v2", data_label : "l2"}),
    ]));
  });
  initForm(assert, this.subject(), Ember.Object.create({vara : "test", varb : "test_varb", varc : Ember.A()}), EmberColumnData.ColumnDataGroup.create({
    name : "formTest",
    columns : [{
      name : "varc",
      label : "VarC",
      form : {
        moduleType : "dynamicMultiSelect",
        dataPath : "GlobalData.data",
        dataValCol : "data_val",
        dataLabelCol : "data_label",
        arrayCol : "vara",
        arrayType : Ember.Object,
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
  }));

  wait();

  andThen(function() {
    fillFormElement("varc", "select", ["v0", "v1"]);
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.varc.0.vara"), "v0",          "'vara' of 1st element is 'v0'");
    assert.equal(assert.form.get("record.varc.0.varb"), "test_varb",   "'varb' of 1st element is 'test_varb' copied from 'record'");
    assert.equal(assert.form.get("record.varc.0.varc"), "varc_static", "'varc' of 1st element is 'varc_static' assigned a static value");
    assert.equal(assert.form.get("record.varc.0.vard"), "l0",          "'vard' of 1st element is 'l0' copied from 'label' of selected value from dynamic select");
    assert.equal(assert.form.get("record.varc.1.vara"), "v1",          "'vara' of 2nd element is 'v1'");
    assert.equal(assert.form.get("record.varc.1.varb"), "test_varb",   "'varb' of 2nd element is 'test_varb' copied from 'record'");
    assert.equal(assert.form.get("record.varc.1.varc"), "varc_static", "'varc' of 2nd element is 'varc_static' assigned a static value");
    assert.equal(assert.form.get("record.varc.1.vard"), "l1",          "'vard' of 2nd element is 'l1' copied from 'label' of selected value from dynamic select");

    assert.form.get("record.varc").popObject();
  });

  wait();

  andThen(function() {
    assert.deepEqual(assert.form.get("childViews.0.selection.length"), 1, "selection was updated when value associated was directly updated");
    assert.deepEqual(assert.form.get("childViews.0.selection.0.val"), "v0", "selection was updated when value associated was directly updated");

    window.GlobalData.set("data", Ember.A([
      Ember.Object.create({data_val : "v0", data_label : "l0"}),
    ]));
  });

  wait();

  andThen(function() {
    assert.deepEqual(assert.form.get("childViews.0.selection.length"), 1, "selection was retained when options was updated");
    assert.deepEqual(assert.form.get("childViews.0.selection.0.val"), "v0", "selection was updated when value associated was directly updated");
    assert.equal(assert.form.get("record.varc.length"), 1, "record value was retained when options was updated");

    window.GlobalData.set("data", Ember.A([
      Ember.Object.create({data_val : "v1", data_label : "l1"}),
    ]));
  });

  wait();

  andThen(function() {
    assert.deepEqual(assert.form.get("childViews.0.selection.length"), 0, "selection was emptied when options without the selected was updated");
    assert.equal(assert.form.get("record.varc.length"), 0, "record value was emptied when options without the selected was updated");
  });
});

test("Test file upload", function(assert) {
  initForm(assert, this.subject(), Ember.Object.create(), EmberColumnData.ColumnDataGroup.create({
    name : "formTest",
    columns : [{
      name : "vara",
      label : "Vara",
      form : {
        moduleType : "fileUpload",
        accept : ".csv, .txt, text/csv, text/plain",
        method : "ReadFileAsText",
        maxSize : 15,
      },
      validation : {
        validations : Ember.A(),
      },
    }],
    form : {},
  }));

  wait();
  shimReader(assert);

  andThen(function() {
    raiseFileUploadEvent(assert.form, "test", "text/plain", "file data");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), "file data", "File data was loaded");

    raiseFileUploadEvent(assert.form, "test", "text/plain", "file data longer that maxSize");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), "file data", "File data was not loaded");
    assert.equal(assert.form.get("record.validationFailed"), true, "Validation failed as maxSize exceeded");

    restoreReader(assert);
  });
});

test("Test radio buttons component", function(assert) {
  initForm(assert, this.subject(), Ember.Object.create(), EmberColumnData.ColumnDataGroup.create({
    name : "formTest",
    columns : [{
      name : "vara",
      label : "Vara",
      form : {
        moduleType : "groupRadioButton",
        options : [
          {val : "v0", label : "l0"},
          {val : "v1", label : "l1"},
          {val : "v2", label : "l2"},
        ],
      },
      validation : {
        validations : Ember.A(),
      },
    }],
    form : {},
  }));

  wait();

  andThen(function() {
    clickFormElement("vara", "input", "[value='v1']");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), "v1", "Value of vara is 'v1', after clicking 'l1' radio button");

    clickFormElement("vara", "input", "[value='v2']");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("record.vara"), "v2", "Value of vara is 'v2', after clicking 'l2' radio button");

    assert.form.set("record.vara", "v0");
  });

  wait();

  andThen(function() {
    assert.equal($(getColumnSelector("vara", "input") + "[value='v2']")[0].checked, false, "'v2' was unchecked after chaning record value directly to 'v0'");
    assert.equal($(getColumnSelector("vara", "input") + "[value='v0']")[0].checked, true, "'v0' was checked after chaning record value directly to 'v0'");
  });
});

test("Multi entry with Multi input", function(assert) {
  initForm(assert, this.subject(), Ember.Object.create({
    tests : Ember.A([
      Ember.Object.create({vara : "test11"}),
      Ember.Object.create({vara : "test12"}),
      Ember.Object.create({vara : "test13"}),
    ]),
  }), EmberColumnData.ColumnDataGroup.create({
    name : "formTest",
    columns : [{
      name : "tests",
      label : "Tests",
      form : {
        moduleType : "multiEntry",
        arrayType : Ember.Object,
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
        validations : Ember.A(),
      },
    }],
    form : {},
  }));

  wait();

  andThen(function() {
    clickFormElement("tests", ".each-multi-entry", ":nth(2) .add-entry .glyphicon");
  });

  wait();

  andThen(function() {
    assert.form.set("record.tests.3.vara", "test14_new");
  });

  wait();

  andThen(function() {
    assert.deepEqual(assert.form.get("record.tests").mapBy("vara"), ["test11", "test12", "test13", "test14_new"], "Records has right vara values");

    clickFormElement("tests", ".each-multi-entry", ":nth(1) .remove-entry .glyphicon");
  });

  wait();

  andThen(function() {
    assert.deepEqual(assert.form.get("record.tests").mapBy("vara"), ["test11", "test13", "test14_new"], "Records has right vara values");
  });
});

test("hideForColumns and disableForColumns", function(assert) {
  initForm(assert, this.subject(), Ember.Object.create({vara : "va0"}), EmberColumnData.ColumnDataGroup.create({
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
  }));

  wait();

  andThen(function() {
    assert.equal(assert.form.get("childViews.1.hidden"),   true,  "VarB was hidden for vara value = 'va0'");
    assert.equal(assert.form.get("childViews.1.disabled"), false, "VarB was not disabled for vara value = 'va0'");
    assert.equal(assert.form.get("childViews.2.hidden"),   false, "VarC was not hidden for vara value = 'va0'");
    assert.equal(assert.form.get("childViews.2.disabled"), true,  "VarC was disabled for vara value = 'va0'");

    fillFormElement("vara", "select", "va1");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("childViews.1.hidden"),   false, "VarB was not hidden for vara value = 'va1'");
    assert.equal(assert.form.get("childViews.1.disabled"), false, "VarB was not disabled for vara value = 'va1'");
    assert.equal(assert.form.get("childViews.2.hidden"),   false, "VarC was not hidden for vara value = 'va1'");
    assert.equal(assert.form.get("childViews.2.disabled"), false, "VarC was not disabled for vara value = 'va1'");

    fillFormElement("vara", "select", "va2");
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("childViews.1.hidden"),   false, "VarB was not hidden for vara value = 'va2'");
    assert.equal(assert.form.get("childViews.1.disabled"), false, "VarB was not disabled for vara value = 'va2'");
    assert.equal(assert.form.get("childViews.2.hidden"),   false, "VarC was not hidden for vara value = 'va2'");
    assert.equal(assert.form.get("childViews.2.disabled"), true,  "VarC was disabled for vara value = 'va2'");
  });
});
