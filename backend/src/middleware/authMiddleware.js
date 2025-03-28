const jwt = require('jsonwebtoken');
// Import directly from the new config file
const { JWT_SECRET } = require('../config');
const supabase = require('../lib/supabaseClient'); // Assuming supabase client is needed to fetch user
const { logError, logWarn, logInfo } = require('../utils/logger');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      logInfo('Token found in Authorization header.');

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      logInfo(`Token verified for user ID: ${decoded.id}`);

      // Get user from the token's ID (excluding the password)
      // Ensure Supabase client is initialized before using it
      if (!supabase) {
          logError('Supabase client not initialized. Cannot fetch user for authentication.');
          throw new Error('Authentication service unavailable.');
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('*') // Select necessary fields, exclude password if possible via DB view or select specific columns
        .eq('id', decoded.id)
        .single();

      if (error) {
        logError(`Error fetching user ${decoded.id} from Supabase: ${error.message}`, error);
        // Handle specific errors like network errors if needed
        if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
             throw new Error(`Network error fetching user details. (${error.message})`);
        }
        throw new Error('Error fetching user details.'); // Generic error for other DB issues
      }

      if (!user) {
        logWarn(`User with ID ${decoded.id} not found in database.`);
        throw new Error('User not found.');
      }

      // Attach user to the request object (excluding password if it was selected)
      // Make sure to handle the password field appropriately if it's returned
      const { password_hash, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;
      logInfo(`User ${user.id} attached to request.`);

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      logError(`Token verification failed or user fetch failed: ${error.message}`, { token }); // Log token only if debugging needed, be careful with sensitive info
      res.status(401).json({ message: `Not authorized: ${error.message}` });
    }
  }

  if (!token) {
    logWarn('No token found in request.');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
