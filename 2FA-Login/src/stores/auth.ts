import router from '@/router';
import HttpResponseError from '@/exception/HttpResponseError';
import { defineStore } from "pinia";

const LOGIN_ROUTE = '/login';

interface AuthStoreState {
    username: string | null;
    token: null;
    expirationDate: number | null;  
}
  
export const useAuthStore = defineStore('authStore', {
    state: (): AuthStoreState => ({
        username: localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')!) : null,
        token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
        expirationDate: localStorage.getItem('expirationDate') ? JSON.parse(localStorage.getItem('expirationDate')!) : null,
        
    }),
    actions: {
        async login(username: string, password: string) {

            const url = 'http://localhost:8762/api/v1.0/authentication/login';

            // generate the basic authentication username and password header property
            const headers = new Headers();
            headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));

            const requestData = {
                method: 'POST',
                headers,
            };

            try{
                // username and password basic authentication API call
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

                    this.username = username;
                    this.token = jsonResponse.access_token;
                    this.expirationDate = expirationDate
                }

                router.push('/');
            }catch(error){
                if (error instanceof HttpResponseError) {
                    throw error; // Throw the expected HTTP error
                }
                console.error('Unexpected error:', error); // Log unexpected errors with stack trace
                throw new Error('Unexpected error');
            }

        },   
        logout() {
            this.username = null;
            this.token = null;
            this.expirationDate = null;

            localStorage.removeItem('username');
            localStorage.removeItem('token');         
            localStorage.removeItem('expirationDate');   
            
            router.push(LOGIN_ROUTE)
        },
        expired() {            
            // the auth store is expired if the token is null or the expiration date is less than current date
            var isExpired = this.token == null || this.expirationDate == null || this.expirationDate < Date.now()
            if(isExpired) {
                this.username = null;
                this.token = null;
                this.expirationDate = null;
    
                localStorage.removeItem('username');
                localStorage.removeItem('token');         
                localStorage.removeItem('expirationDate');                 
            }
            
            return isExpired
        }
    },
})