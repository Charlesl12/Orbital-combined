const express = require("express");
const app = express();
const cors = require("cors");
const supabase = require("./supabaseClient");
require('dotenv').config();
// const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// Register, login, verification    
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard
app.use("/homepage", require("./routes/homepage"));

app.listen(3000, () => {
    console.log(`server is running on port 3000`);
});

app.get('/', async (req, res) => {
    res.send("Working");
});

app.get('/test-supabase', async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('users')
        .select('*');
        
        if (error) {
            throw error;
        }
        res.json(data);
    } catch (err) {
        console.error("Supabase connection error:", err.message);
        res.status(500).send("Supabase connection error");
    }
});