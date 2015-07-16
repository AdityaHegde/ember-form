import FormColumnData from "./FormColumnData";
import FormColumnDataGroup from "./FormColumnDataGroup";
import FormColumnDataMap from "./FormColumnDataMap";
import EmberColumnData from "ember-column-data";
import EmberObjectUtils from "ember-object-utils";
import FormItemTypesMap from "./form-item-types-map";
import InputTypesMap from "./input-types-map";

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
  FormItemTypesMap,
  InputTypesMap,
};
