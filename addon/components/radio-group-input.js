import Ember from "ember";
import getEmberId from "../getEmberId";
import layout from "../templates/components/radio-group-input";

export default Ember.Component.extend({
  layout : layout,

  groupName : Ember.computed({
    get : function() {
      return getEmberId(this);
    },
  }),
});
