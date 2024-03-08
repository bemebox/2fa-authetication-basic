class HttpResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HttpResponseError';
    }
}

export default HttpResponseError;