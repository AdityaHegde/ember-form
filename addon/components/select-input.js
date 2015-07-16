import Ember from "ember";
import layout from "../templates/components/select-input";

export default Ember.Component.extend({
  layout : layout,

  attributeBindings : ["value", "columnData.form.multiple:multiple", "columnData.form.autofocus:autofocus"],
  classNames : ["form-control"],
  columnData    : null,
  record        : null,

  dataPathDidChange : Ember.observer("columnData.form.dataPath", "columnData.form.dataRegistryPath", function() {
    var 
    columnData = this.get("columnData.form"),
    dataPath = columnData.get("dataPath"),
    dataRegistryPath = columnData.get("dataRegistryPath"),
    dataRegistryKey = columnData.get("dataRegistryKey"),
    dataObserverKey = dataRegistryPath && dataRegistryKey ? dataRegistryKey : dataPath;
    this.addObserver(dataObserverKey, this, "updateOptions");

    if(this._lastDataObserverKey) {
      this.removeObserver(this._lastDataObserverKey, this, "updateOptions");
    }
    this._lastDataObserverKey = dataObserverKey;
  }),

  updateOptions : function() {
    this.notifyPropertyChange("options");
  },

  options : Ember.computed("columnData.form.options.@each", "columnData.form.dataPath", "columnData.form.dataRegistryPath", {
    get : function() {
      var
      data, options = Ember.A(),
      columnData = this.get("columnData.form"),
      dataPath = columnData.get("dataPath"),
      dataRegistryPath = columnData.get("dataRegistryPath"),
      dataRegistryKey = columnData.get("dataRegistryKey"),
      value = this.get("value");

      //registry is not available for multiple selection as of now
      if(dataRegistryPath && dataRegistryKey) {
        var
        reg = this.get(dataRegistryPath),
        depVal = this.get(dataRegistryKey),
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
        data = this.get(columnData.get("dataPath"));
      }
      else {
        data = columnData.get("options");
      }

      if(data) {
        data.forEach(function(item) {
          var itemValue = item.get(columnData.get("dataValueKey"));
          options.pushObject(Ember.Object.create({
            value : itemValue,
            label : item.get(columnData.get("dataLabelKey")),
            //using this as jshint throws error for == which is needed
            /* jshint ignore:start */
            selected : itemValue == value,
            /* jshint ignore:end */
          }));
        });
      }
      if(columnData.get("prompt")) {
        options.unshiftObject(Ember.Object.create({
          value : null,
          label : columnData.get("prompt"),
          selected : Ember.isNone(value),
        }));
      }
      return options;
    },
  }),

  tagName : "select",

  change : function() {
    var
    columnData = this.get("columnData.form"),
    selectedEl = this.$(),
    domEle = selectedEl[0],
    selectedIndex = domEle.selectedIndex,
    //selectedOptions = domEle.selectedOptions,
    options = this.get("options");

    if(columnData.get("multiple")) {
    }
    else {
      this.set("value", options[selectedIndex] && options[selectedIndex].get("value"));
    }
  },
});
