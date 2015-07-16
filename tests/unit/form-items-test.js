import Ember from "ember";
import { moduleForComponent, test } from "ember-qunit";
import startApp from "../helpers/start-app";
import EmberColumnData from "ember-column-data";
import EmberFrom from "ember-form";
import getColumnSelector from "../helpers/getColumnSelector";

Ember.run(function() {
  window.GlobalData = Ember.Namespace.create();
  EmberFrom.get("EmberForm");
});

moduleForComponent("ember-form", "Ember Form", {
  beforeEach : function(assert) {
    assert.application = startApp();
  },

  afterEach : function(assert) {
    Ember.run(assert.application, 'destroy');
  },

  needs : [
    "component:ember-form-checkbox-input",
    "component:ember-form-item",
    "component:ember-form-legend",
    "component:ember-form-multi-input",
    "component:ember-form-radio-input",
    "component:ember-form-text-input",
    "component:ember-form-file-input",
    "component:ember-form-label",
    "component:ember-form-multi-entry",
    "component:ember-form-radio-group-input",
    "component:ember-form-select-input",
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
      form : {moduleType : "checkbox"},
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
        moduleType : "select",
        options : [
          {value : "v0", label : "l0"},
          {value : "v1", label : "l1"},
          {value : "v2", label : "l2"},
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
      Ember.Object.create({data_value : "v0", data_label : "l0"}),
    ]));
  });
  initForm(assert, this.subject(), Ember.Object.create({vara : ""}), EmberColumnData.ColumnDataGroup.create({
    name : "formTest",
    columns : [{
      name : "vara",
      label : "Vara",
      form : {
        moduleType : "select",
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

    window.GlobalData.get("data").pushObject(Ember.Object.create({data_value : "v1", data_label : "l1"}));
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
      Ember.Object.create({data_value : "v0", data_label : "l0"}),
      Ember.Object.create({data_value : "v1", data_label : "l1"}),
      Ember.Object.create({data_value : "v2", data_label : "l2"}),
    ]));
  });

  wait();

  andThen(function() {
    assert.equal(assert.form.get("childViews.0.value"), "v0", "'value' of form is 'v0' after changing options directly");
    assert.equal(assert.form.get("record.vara"), "v0", "Value of vara is 'v0' after modifying options directly");

    window.GlobalData.set("data", Ember.A([
      Ember.Object.create({data_value : "v1", data_label : "l1"}),
      Ember.Object.create({data_value : "v2", data_label : "l2"}),
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
      Ember.Object.create({data_value : "v0", data_label : "l0"}),
    ]));
    window.GlobalData.set("dataRegistry", {
      v0 : {
        values : Ember.A([
          Ember.Object.create({data_value : "v00", data_label : "l00"}),
          Ember.Object.create({data_value : "v01", data_label : "l01"}),
        ]),
        "default" : "v00",
      },
      v1 : {
        values : Ember.A([
          Ember.Object.create({data_value : "v10", data_label : "l10"}),
          Ember.Object.create({data_value : "v11", data_label : "l11"}),
        ]),
        "default" : "v10",
      },
      v2 : {
        values : Ember.A([
          Ember.Object.create({data_value : "v20", data_label : "l20"}),
          Ember.Object.create({data_value : "v21", data_label : "l21"}),
          Ember.Object.create({data_value : "v22", data_label : "l22"}),
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
        moduleType : "select",
        options : [
          {value : "v0", label : "l0"},
          {value : "v1", label : "l1"},
          {value : "v2", label : "l2"},
        ],
        prompt : "Select",
      },
    }, {
      name : "varb",
      label : "Varb",
      form : {
        moduleType : "select",
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

test("Test file upload", function(assert) {
  initForm(assert, this.subject(), Ember.Object.create(), EmberColumnData.ColumnDataGroup.create({
    name : "formTest",
    columns : [{
      name : "vara",
      label : "Vara",
      form : {
        moduleType : "fileInput",
        accept : ".csv, .txt, text/csv, text/plain",
        method : "ReadFileAsText",
        fileValidation : {
          validations : [
            {type : 6, maxSize : 15},
            {type : 7, typesMap : { "text/plain" : 1 } },
          ],
        },
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
        moduleType : "radioGroup",
        options : [
          {value : "v0", label : "l0"},
          {value : "v1", label : "l1"},
          {value : "v2", label : "l2"},
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
      childColumnData : {
        name : "test",
        form : {
          moduleType : "multiInput",
        },
        childColumnDataGroup : {
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
              moduleType : "select",
              options : [
                {value : "vb0", label : "lb0"},
                {value : "vb1", label : "lb1"},
                {value : "vb2", label : "lb2"},
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
        moduleType : "select",
        options : [
          {value : "va0", label : "la0"},
          {value : "va1", label : "la1"},
          {value : "va2", label : "la2"},
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
