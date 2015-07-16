/*
 * @method EmberForm.copyValuesToRecord
 * @module ember-form
 * @submodule ember-form-items
 */
export default function(toRecord, col, fromRecord, value) {
  var copyAttrs = col.get("form.copyAttrs"),
      staticAttrs = col.get("form.staticAttrs"),
      valAttrs = col.get("form.valAttrs"),
      k;
  if(copyAttrs) {
    for(k in copyAttrs) {
      if(copyAttrs.hasOwnProperty(k)) {
        toRecord.set(copyAttrs[k], fromRecord.get(k));
      }
    }
  }
  if(staticAttrs) {
    for(k in staticAttrs) {
      if(staticAttrs.hasOwnProperty(k)) {
        toRecord.set(k, staticAttrs[k]);
      }
    }
  }
  if(value && valAttrs) {
    for(k in valAttrs) {
      if(valAttrs.hasOwnProperty(k)) {
        toRecord.set(valAttrs[k], value.get(k));
      }
    }
  }
}
