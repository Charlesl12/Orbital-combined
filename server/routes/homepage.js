const router = require("express").Router();
const poolDB = require("../z-localhostDB");
const supabase = require("../supabaseClient");
const authorization = require("../joint/authorization");

router.post("/", authorization, async (request, response) => {
    try {
        // const user = await poolDB.query("SELECT user_name FROM users WHERE user_id = $1", [request.user.id]);
        // response.json(user.rows[0]);
        const { data: user, error } = await supabase
        .from('users')
        .select('user_name')
        .eq('user_id', request.user.id)
        .single();
  
        if (error) {
            throw error;
        }
        
        response.json(user);

    } catch (err) {
        console.error(err.message);
        response.status(500).send("Server Error");
    }
})

module.exports = router;