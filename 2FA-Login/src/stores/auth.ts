import router from '@/router';
import HttpResponseError from '@/exception/HttpResponseError';
import { defineStore } from "pinia";

const LOGIN_ROUTE = '/login';
const TWO_FACTOR_AUTH_ROUTE = '/two-factor-auth';

export const useAuthStore = defineStore ({
    id: 'auth',
    state: () => {
        return {
            username: localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')!) : null,
            token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,    
        }
    },
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
                    localStorage.setItem('username', JSON.stringify(username));
                    localStorage.setItem('token', JSON.stringify(jsonResponse.access_token));
                    this.username = username;
                    this.token = jsonResponse.access_token;

                    if (jsonResponse.totpQRCode || jsonResponse.hasTwoFactorAuth) {
                        router.push(TWO_FACTOR_AUTH_ROUTE);
                    }
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

            localStorage.removeItem('username');
            localStorage.removeItems('token');         
            
            router.push(LOGIN_ROUTE)
        }
    }
})