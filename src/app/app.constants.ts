import { environment } from './../environments/environment';


export class AppConstants {
    private static API_BASE_URL = environment.apiBaseUrl;
    private static OAUTH2_URL = environment.apiBaseUrl + "oauth2/authorization/";
    private static REDIRECT_URL = environment.redirectUrl;
    public static API_URL = environment.apiBaseUrl + "api/";
    public static AUTH_API = AppConstants.API_URL + "auth/";
    public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;
    public static TIPO_LANCAMENTO_URL = AppConstants.API_URL+"tipo-lancamento";
    public static ORCAMENTO_URL = AppConstants.API_URL+"orcamento";
    public static LANCAMENTO_URL = AppConstants.API_URL+"lancamento";
}