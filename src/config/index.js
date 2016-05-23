import { module } from 'angular';
import router from './router.config';
import translate from './translate.config';
import satellizer from './satellizer.config';
import material from './material.config';
import authenticateGuard from './AuthenticateGuard';
import http from './http.config';

const Config = module('app.config', [])
  .config(router)
  .config(translate)
  .config(satellizer)
  .config(material)
  .config(http)
  .constant('Config', {
    BASE_URL: process.env.SERVER_HOST,
    API_URL: `${process.env.SERVER_HOST}/api`,
  })
  .run(authenticateGuard);

export default Config.name;
