/*
 * Copy values from record to object.
 *
 * @method EmberForm.copyValuesToObject
 * @module ember-form
 * @submodule ember-form-items
 */
export default function(obj, col, record, value) {
  var copyAttrs = col.get("form.copyAttrs"),
      staticAttrs = col.get("form.staticAttrs"),
      valAttrs = col.get("form.valAttrs"),
      k;
  if(copyAttrs) {
    for(k in copyAttrs) {
      if(copyAttrs.hasOwnProperty(k)) {
        obj[copyAttrs[k]] = record.get(k);
      }
    }
  }
  if(staticAttrs) {
    for(k in staticAttrs) {
      if(staticAttrs.hasOwnProperty(k)) {
        obj[k] = staticAttrs[k];
      }
    }
  }
  if(value && valAttrs) {
    for(k in valAttrs) {
      if(valAttrs.hasOwnProperty(k)) {
        obj[valAttrs[k]] = value.get(k);
      }
    }
  }
}
