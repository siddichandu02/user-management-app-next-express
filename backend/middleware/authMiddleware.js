const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Check for the token in the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

    // If no token is found, deny access
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'secret_key');  // Replace 'secret_key' with your secret
        req.userId = decoded.userId;  // Attach user ID to the request object
        next();  // Pass control to the next handler
    } catch (err) {
        // Token is invalid
        res.status(403).json({ error: 'Invalid token' });
    }
};
