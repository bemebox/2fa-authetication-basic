interface ApiEndpoints {
    host: {
        url: string;
    },
    auth: {
        userLogin: string;
    }
}

const AUTH_API_ENDPOINTS: ApiEndpoints = {
    host: {
        url: 'http://localhost:8762/api/v1.0/authentication'
    },
    auth: {
        userLogin: '/login'
    }
}

export default AUTH_API_ENDPOINTS;