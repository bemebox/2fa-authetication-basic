import router from '@/router';
import HttpResponseError from '@/exception/HttpResponseError';
import { defineStore } from 'pinia';

const LOGIN_ROUTE = '/login';

export const useRegisterStore = defineStore({
  id: 'register',
  state: () => {
    return {
      username: null,
      enabled: false,
      mfa_type: null
    }
  },
  actions: {
    async signup(username: string, email: string, password: string, mfa_type: string) {
        console.log('signup');

        const url = 'http://localhost:8762/api/v1.0/authentication/register';
 
        const requestData = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, grant_type: 'password', mfa_type}),
        };

        try {

          const response = await fetch(url, requestData);
          if (response.ok) {
            console.log('=== OK');
            router.push(LOGIN_ROUTE);
          } else {
            console.log('=== ERROR');
            const errorData = await response.json();
            console.log(errorData);
            if (response.status == 409) {
              console.log('User already exists.');
              throw new HttpResponseError('User already exists.');
            }else{
              console.log(errorData.errors);
              throw new HttpResponseError('Something went wrong registering the user.');
            }
          }
        } catch (error) {
          if (error instanceof HttpResponseError) {
            throw error; // Throw the expected HTTP error
          }
          console.error('Unexpected error:', error); // Log unexpected errors with stack trace
          throw new Error('Unexpected error');
        }
    },

  }
});