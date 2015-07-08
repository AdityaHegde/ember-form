import Ember from "ember";
import EmberColumnData from "ember-column-data";
import MultiColumnMixin from "../MultiColumnMixin";

/**
 * Base form view.
 * Usage:
 *
 *     {{ember-form record=record columnDataGroup=columnDataGroup}}
 *
 * @class EmberForm.FormComponent
 */
export default Ember.Component.extend(MultiColumnMixin, EmberColumnData.ColumnDataChangeCollectorMixin, {
  childTagNames : 'div',
  classNames : ['form-horizontal'],
});
