class APIRESPONSE {
    constructor(data, status, message="Success") {
        this.data = data;
        this.status = status;
        this.message = message;
        this.success=status<400;
    }

    // Static method for a success response
    static successResponse(data, message = "Success") {
        return new APIRESPONSE(data, 200, message);
    }

    // Static method for an error response
    static errorResponse(message = "Error", status = 500) {
        return new APIRESPONSE(null, status, message);
    }

    // Method to serialize the response to JSON
    toJSON() {
        return {
            data: this.data,
            status: this.status,
            message: this.message,
            success: this.success
        };
    }
}