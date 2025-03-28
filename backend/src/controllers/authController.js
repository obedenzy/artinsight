// backend/src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../lib/supabaseClient'); // Use the backend Supabase client

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiration time
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signupUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  console.log(`Signup attempt for email: ${email}`);

  if (!username || !email || !password) {
    res.status(400);
    return next(new Error('Please provide username, email, and password'));
  }

  let proceedWithInsert = false; // Flag to control flow

  try {
    // 1. Check if user already exists
    console.log(`Checking if user exists: ${email}`);
    let existingUser = null;
    let fetchError = null;

    try {
      const { data, error } = await supabase
        .from('users') // Use your actual public users table name
        .select('id')
        .eq('email', email)
        .maybeSingle(); // Use maybeSingle to return null if not found

      existingUser = data;
      fetchError = error;

    } catch (err) {
        // Catch errors thrown *by* the supabase client call itself, if any
        console.error('Supabase client error during user check:', err);
        fetchError = err; // Treat client errors like fetch errors for this logic
    }


    if (fetchError) {
        console.error('Supabase error/exception checking user existence:', fetchError.message);
        // Check if it's the specific 'fetch failed' error (likely network)
        if (fetchError.message && fetchError.message.includes('fetch failed')) {
            console.warn("⚠️ Signup: Supabase fetch failed checking user - Network issue likely. Proceeding with insert attempt anyway.");
            proceedWithInsert = true; // Set flag to proceed despite check failure
        } else {
            // For other database errors during check, treat as fatal
            res.status(500);
            return next(new Error('Failed to check user existence due to database error. ' + fetchError.message));
        }
    } else if (existingUser) {
      // If check succeeded and user exists
      console.log(`User already exists: ${email}`);
      res.status(400);
      return next(new Error('User already exists with this email'));
    } else {
      // If check succeeded and user does not exist
      console.log(`User does not exist, proceeding with signup: ${email}`);
      proceedWithInsert = true; // Set flag to proceed
    }

    // Only proceed if the flag is set (either user confirmed not found, or check failed with network error)
    if (proceedWithInsert) {
        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(`Password hashed for: ${email}`);

        // 3. Attempt to create user in Supabase 'users' table
        console.log(`Attempting to insert user into Supabase: ${email}`);
        const { data: newUser, error: insertError } = await supabase
          .from('users') // Use your actual public users table name
          .insert([{ username, email, password_hash: hashedPassword }])
          .select('id, username, email, created_at') // Select the fields you want to return
          .single(); // Use single() here as we expect insertion to succeed or fail uniquely

        if (insertError) {
          console.error('Supabase error creating user:', insertError.message);
          // Handle potential unique constraint violation (error code 23505 for PostgreSQL)
          // Supabase might wrap this, check message content
          if (insertError.code === '23505' || (insertError.message && insertError.message.includes('duplicate key value violates unique constraint'))) {
              console.warn(`Signup: Insert failed, user likely already existed despite failed check: ${email}`);
              res.status(400); // Bad request - user already exists
              return next(new Error('User already exists with this email.'));
          }
          // Handle specific network errors during insert
          if (insertError.message && insertError.message.includes('fetch failed')) {
                console.error("🛑 Signup: Supabase fetch failed inserting user - Network issue likely.");
          }
          // For other insert errors
          res.status(500);
          return next(new Error('Failed to create user. ' + insertError.message));
        }

        console.log(`User created successfully: ${newUser.email}, ID: ${newUser.id}`);

        // 4. Respond with user info and token
        const token = generateToken(newUser.id);
        console.log(`Token generated for user: ${newUser.email}`);

        res.status(201).json({
          message: 'User created successfully',
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.created_at,
          },
          token: token,
          requiresConfirmation: false // Assuming no email confirmation for now
        });
    }
    // If proceedWithInsert remained false (should only happen if non-network error occurred during check)
    // The response should have already been sent in that specific error handling block.

  } catch (error) {
    // Catch any unexpected errors in the overall try block
    console.error('Error in signupUser controller:', error);
    if (!res.headersSent) {
        res.status(500);
    }
    next(error); // Pass error to the global error handler
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(`Login attempt for email: ${email}`);

  if (!email || !password) {
    res.status(400);
    return next(new Error('Please provide email and password'));
  }

  try {
    // 1. Find user by email
    console.log(`Fetching user from Supabase: ${email}`);
    const { data: user, error: fetchError } = await supabase
      .from('users') // Use your actual public users table name
      .select('id, username, email, password_hash, created_at') // Fetch necessary fields including the hash
      .eq('email', email)
      .single(); // Expect exactly one user or error

    // Login should NOT create a user. If fetch fails or user not found, it's an authentication failure.
    if (fetchError || !user) {
      console.error('Supabase error fetching user or user not found:', fetchError?.message);
       if (fetchError && fetchError.message.includes('fetch failed')) {
            console.error("🛑 Login: Supabase fetch failed finding user - Network issue likely.");
        }
      // Check if the error specifically indicates "not found" (e.g., PGRST116 from single())
      if (fetchError && (fetchError.code === 'PGRST116' || (fetchError.message && fetchError.message.includes('rows returned')))) {
          console.log(`Login failed: User not found for email ${email}`);
      }
      res.status(401); // Unauthorized
      return next(new Error('Invalid credentials')); // Generic error for security
    }

    console.log(`User found: ${user.email}`);

    // 2. Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      console.log(`Password mismatch for user: ${user.email}`);
      res.status(401); // Unauthorized
      return next(new Error('Invalid credentials')); // Generic error
    }

    console.log(`Password matched for user: ${user.email}`);

    // 3. Generate JWT
    const token = generateToken(user.id);
    console.log(`Token generated for user: ${user.email}`);

    // 4. Respond with user info and token
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at,
      },
      token: token,
    });

  } catch (error) {
    console.error('Error in loginUser controller:', error);
     if (!res.headersSent) {
        res.status(500);
    }
    next(error);
  }
};


// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (requires token)
const getUserProfile = async (req, res, next) => {
    // req.user is attached by the 'protect' middleware
    console.log(`Fetching profile for user ID: ${req.user.id}`);

    // Return the user data attached by the middleware
    res.status(200).json({
        user: req.user // Send the user object from req.user
    });
};


module.exports = {
  signupUser,
  loginUser,
  getUserProfile,
};
