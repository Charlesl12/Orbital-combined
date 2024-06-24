const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (request, response, next) {
    
    const token = request.header("jwtToken");

    // Check JWT token
    if(!token) {
        return response.status(403).json("Unauthorized");
    }

    try { 
        // Verify if jwt is the same as the signed one
        const verify = jwt.verify(token, process.env.jwtSecretKey);
        request.user = verify.user;
        next();

    } catch (err) {
        console.error(err.message);
        return response.status(403).json("Unauthorized");
    }
}