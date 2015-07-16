import Ember from "ember";
import EmberColumnData from "ember-column-data";
import MultiColumnMixin from "../mixins/multi-column";

/**
 * Base form component.
 * Usage:
 *
 *     {{ember-form record=record columnDataGroup=columnDataGroup}}
 *
 * @class EmberForm.EmberForm
 */
export default Ember.Component.extend(MultiColumnMixin, EmberColumnData.ColumnDataChangeCollectorMixin, {
  childTagNames : 'div',
  classNames : ['form-horizontal'],
});
