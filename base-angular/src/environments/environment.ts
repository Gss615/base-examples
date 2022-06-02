import packageInfo from '../../package.json';

export const environment = {
  production: false,
};


export const PROJECT_NAME = packageInfo.name || 'ng'

//  debug Zone.run 错误，只在开发环境引入，避免产生性能问题
import 'zone.js/plugins/zone-error'; 
