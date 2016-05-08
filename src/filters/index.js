import Vue from 'vue';

import dateToNow from '../../lib-core/js/filters/dateToNow';
import isDateNearTo from '../../lib-core/js/filters/isDateNearTo';

import resource from './resource';

Vue.filter('dateToNow', dateToNow);
Vue.filter('isDateNearTo', isDateNearTo);
Vue.filter('resource', resource);
