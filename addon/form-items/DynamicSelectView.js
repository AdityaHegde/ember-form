import Ember from "ember";
import StaticSelectView from "./StaticSelectView";
import template from "../templates/views/dynamic-select";

/**
 * View for a select tag with dynamic options.
 *
 * @class EmberForm.DynamicSelectView
 * @extends EmberForm.StaticSelectView
 * @module ember-form
 * @submodule ember-form-items
 */
export default StaticSelectView.extend({
  init : function() {
    this._super();
    Ember.addObserver(this, this.get("dataListenPath"), this, "dataDidChange");
  },

  dataListenPath : Ember.computed("columnData.form.dataPath", "columnData.form.dataRegPath", {
    get : function() {
      var
      dataPath = this.get("columnData.form.dataPath"),
      dataRegPath = this.get("columnData.form.dataRegPath");
      return dataPath + (Ember.isNone(dataRegPath) ? ".@each" : "");
    },
  }),

  classNameBindings : ['hideOnEmpty:hidden'],
  hideOnEmpty : false,

  selectOptions : Ember.computed("view.columnData", {
    get : function() {
      var
      columnData = this.get("columnData.form"), data = Ember.A(), opts = Ember.A(),
      dataPath = columnData.get("dataPath"),
      dataRegPath = columnData.get("dataRegPath");
      if(dataRegPath) {
        var
        reg = Ember.get(dataRegPath) || this.get(dataRegPath),
        depVal = this.get(dataPath),
        regEntry = reg && reg[depVal];
        if(regEntry) {
          data = regEntry.values;
          if(!Ember.isNone(regEntry["default"])) {
            var that = this;
            Ember.run.later(function() {
              that.set("value", regEntry["default"]);
            }, 0);
          }
        }
      }
      else if(dataPath) {
        data = Ember.get(dataPath) || this.get(dataPath);
      }
      else {
        data = columnData.data || Ember.A();
      }
      if(data) {
        data.forEach(function(item) {
          var
          val = item.get ? item.get(columnData.get("dataValCol")) : item[columnData.get("dataValCol")],
          label = item.get ? item.get(columnData.get("dataLabelCol")) : item[columnData.get("dataLabelCol")];
          opts.pushObject(Ember.Object.create({ val : val, label : label }));
        }, this);
      }
      if(columnData.get("hideOnEmpty") && opts.length - columnData.get("hideEmptyBuffer") <= 0) {
        this.set("hideOnEmpty", true);
      }
      else {
        this.set("hideOnEmpty", false);
      }
      return opts;
    },
  }),

  dataDidChange : function(){
    this.notifyPropertyChange("selectOptions");
    this.rerender();
  },

  recordChangeHook : function() {
    this._super();
    this.notifyPropertyChange("selection");
  },

  valueDidChange : function() {
    this.notifyPropertyChange("selection");
  },

  selection : Ember.computed("selectOptions.@each", {
    get : function() {
      var
      columnData = this.get("columnData.form"),
      selection = columnData && this.get("selectOptions").findBy("val", this.get("value"));
      if(!selection) {
        this.set("value", null);
      }
      return selection;
    },
    
    set : function(key, value) {
      var columnData = this.get("columnData.form");
      this.set("value", value && columnData && value.get("val"));
      return value;
    },
  }),

  template : template,
});
