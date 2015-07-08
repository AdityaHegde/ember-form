import Ember from 'ember';
import Application from '../../app';
import Router from '../../router';
import config from '../../config/environment';
import fillFormElement from "./fillFormElement";
import clickFormElement from "./clickFormElement";
import scrollHelper from "./scrollHelper";
import initForm from "./initForm";
import shimReader from "./shimReader";
import restoreReader from "./restoreReader";
import raiseFileUploadEvent from "./raiseFileUploadEvent";

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
