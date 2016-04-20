import { module } from 'angular';
import router from './router.config';
import translate from './translate.config';
import satellizer from './satellizer.config';
import material from './material.config';
import authenticateGuard from './AuthenticateGuard';
import http from './http.config';
import breadcrumb from './breadcrumb.config';

const Config = module('app.config', [])
  .config(router)
  .config(translate)
  .config(satellizer)
  .config(material)
  .config(http)
  .config(breadcrumb)
  .constant('Config', {
    API_URL: `${process.env.SERVER_HOST}/api`,
  })
  .run(authenticateGuard);

export default Config.name;
