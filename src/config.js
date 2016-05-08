const DEBUG = process.env.NODE_ENV !== 'production';

export const serverUrl = DEBUG ? 'http://ibaby-plan.org:8280' : location.origin;

export const loginUrl = '/static/auth/login.html';
