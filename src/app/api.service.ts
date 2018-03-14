export class ApiUrl {
  static serverMode = false;
  static localUrl = 'http://localhost';
  static serverUrl = 'http://104.236.63.203:8000/';
  static baseUrl: string = ApiUrl.serverMode === true ? ApiUrl.serverUrl : ApiUrl.localUrl;

  /* this is for production or development url */
  static prodMode = false;

  static MASTER_URI_PORT = ApiUrl.prodMode === true ? 'api/' : ':5000/api/';
  static LOGIN_URI_PORT = ApiUrl.prodMode === true ? 'api/' : ':5000/api/';
  static HOST_URI_PORT = ApiUrl.prodMode === true ? 'api/' : ':5000/api/';
  static LOGIN_SOCIAL_PORT = ApiUrl.prodMode === true ? 'api/' : ':5000/api/';
  static SRC_PORT = ApiUrl.prodMode === true ? '' : ':5000/';

  static MASTER_URI = ApiUrl.baseUrl + ApiUrl.MASTER_URI_PORT;
  static HOST_URI = ApiUrl.baseUrl + ApiUrl.HOST_URI_PORT;
  static LOGIN_SOCIAL_URI = ApiUrl.baseUrl + ApiUrl.LOGIN_SOCIAL_PORT;
  static LOGIN_URI = ApiUrl.baseUrl + ApiUrl.LOGIN_URI_PORT;
  static SRC_URI = ApiUrl.baseUrl + ApiUrl.SRC_PORT;
}