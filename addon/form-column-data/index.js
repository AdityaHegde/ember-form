import FormColumnData from "./FormColumnData";
import FormColumnDataGroup from "./FormColumnDataGroup";
import FormColumnDataMap from "./FormColumnDataMap";
import EmberColumnData from "ember-column-data";
import EmberObjectUtils from "ember-object-utils";

/**
 * @module ember-form-column-data
 */

EmberColumnData.ColumnData.reopen({
  form : EmberObjectUtils.belongsTo(FormColumnDataMap, "moduleType", "textInput"),
});

EmberColumnData.ColumnDataGroup.reopen({
  form : EmberObjectUtils.belongsTo(FormColumnDataGroup),
});

export default {
  FormColumnData,
  FormColumnDataGroup,
  FormColumnDataMap,
};
