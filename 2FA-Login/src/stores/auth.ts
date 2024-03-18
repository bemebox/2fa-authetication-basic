import router from '@/router';
import HttpResponseError from '@/exception/HttpResponseError';
import { defineStore } from "pinia";
import API_ENDPOINTS from '@/configs/api_endpoints';


interface AuthStoreState {
    username: string | null;
    token: null;
    expirationDate: number | null;
    mfaRequired: boolean;
}
  
export const useAuthStore = defineStore('authStore', {
    state: (): AuthStoreState => ({
        username: localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')!) : null,
        token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
        expirationDate: localStorage.getItem('expirationDate') ? JSON.parse(localStorage.getItem('expirationDate')!) : null,
        mfaRequired: localStorage.getItem('mfaRequired') ? JSON.parse(localStorage.getItem('mfaRequired')!) : false,
    }),
    actions: {
        clearLocalStorage() {
            this.username = null;
            this.token = null;
            this.expirationDate = null;
            this.mfaRequired = false;

            localStorage.removeItem('username');
            localStorage.removeItem('token');         
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('mfaRequired');   
        },
        expired() {            
            // the auth store is expired if the token is null or the expiration date is less than current date
            const isExpired = this.token == null || this.expirationDate == null || this.expirationDate < Date.now()
            if(isExpired) {
                this.clearLocalStorage();
            }
            
            return isExpired
        },
        async login(username: string, password: string) {

            // generate the basic authentication username and password header property
            const headers = new Headers();
            headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));

            const requestData = {
                method: 'POST',
                headers,
            };

            try{
                // username and password basic authentication API call
                const url = API_ENDPOINTS.host.url + API_ENDPOINTS.auth.userLogin
                const response = await fetch(url, requestData);
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new HttpResponseError('Invalid Credentials');
                    }
                    console.error('HTTP ERROR: Unexpected error: ' + response.status);
                    throw new HttpResponseError('Unexpected error');
                }

                const jsonResponse = await response.json();
                if (jsonResponse.access_token) {
                    
                    var expirationDate = Date.now() + 60000; // 1 minute in milliseconds

                    localStorage.setItem('username', JSON.stringify(username));
                    localStorage.setItem('token', JSON.stringify(jsonResponse.access_token));
                    localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
                    localStorage.setItem('mfaRequired', JSON.stringify(jsonResponse.mfa_enabled));

                    console.log('Auth mfa_enabled:' + jsonResponse.mfa_enabled);

                    this.username = username;
                    this.token = jsonResponse.access_token;
                    this.expirationDate = expirationDate;
                    this.mfaRequired = jsonResponse.mfa_enabled;
                }

                router.push('/');
            }catch(error){
                if (error instanceof HttpResponseError) {
                    console.error('Http response error:', error);
                    throw error;
                } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                    console.error('Network error:', error);
                    throw new HttpResponseError('Network error. Please check your internet connection.');
                } else {
                    console.error('Unexpected error:', error);
                    throw new Error('Unexpected error');
                }
            }

        },   
        logout() {
            this.clearLocalStorage();
            router.push('/login')
        },
    },
})