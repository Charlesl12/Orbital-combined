const router = require("express").Router();
const poolDB = require("../z-localhostDB");
const supabase = require("../supabaseClient");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validCredentials = require("../joint/validCred");
const authorization = require("../joint/authorization");

// Registering 
// 401 is unauthenticated and 403 is unauthorized
// await is needed because of async and the time needed to process
router.post("/register", validCredentials, async (request, response) => {
    
    const {name, email, password} = request.body;

    try {
        // Extract the email
        // const user = await poolDB.query("SELECT * FROM users WHERE user_email = $1", [email]);
        const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('user_email', email)

        // Checks if user exists, using the email
        /* if (user.rows.length !== 0) {
            return response.status(401).json("Email is registered!");
        } */
        if (existingUser && existingUser.length > 0) {
            return response.status(401).json("Email is registered!");
        } 

        if(userError) {
            throw userError;
        }

        // Bcrypt password (look at bcrypt documentation)
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Add user into database
        /* const newUser = await poolDB.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
        ); */
        const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ user_name: name, user_email: email, user_password: bcryptPassword }])
        .select();

        if (insertError) {
            throw insertError;
        }
        
        // JWT Token
        // const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        const jwtToken = jwtGenerator(newUser.user_id);
        return response.json({ jwtToken });
        
    } catch (err) {
        console.error("Server Error:", err.message);
        response.status(500).send("Server Error");
    }
});

// Login
// 401 is unauthenticated and 403 is unauthorized
// await is needed because of async and the time needed to process
router.post("/login", validCredentials, async (request, response) => {
    
    const {email, password} = request.body;
    
    try {
        // Extract user email
        // const user = await poolDB.query("SELECT * FROM users WHERE user_email = $1", [email]);
        const { data: loginUser, find: searchError } = await supabase
        .from('users')
        .select('*')
        .eq('user_email', email)
        .single();

        if (searchError) {
            throw searchError;
        }

        // Check if user does not exist
        /* if (user.rows.length === 0) {
            return response.status(401).json("Email or password is incorrect");
        } */
        if (loginUser.length === 0) {
            return response.status(401).json('Email or password is incorrect');
        }

        // Password checking
        // const correctPassword = await bcrypt.compare(password, user.rows[0].user_password);
        const correctPassword = await bcrypt.compare(password, loginUser.user_password);

        if(!correctPassword) {
            return response.status(401).json("Email or password is incorrect");
        }

        // JWT token
        // const jwtToken = jwtGenerator(user.rows[0].user_id);
        const jwtToken = jwtGenerator(loginUser.user_id);
        return response.json({ jwtToken });

    } catch (err) {
        console.error(err.message);
        response.status(500).send("Server Error");
    }
});

// Verification
router.post("/verify", authorization, async (request, response) => {
    try {
        response.json(true);
    } catch (err) {
        console.error(err.message);
        response.status(500).send("Server Error");
    }
});

module.exports = router;