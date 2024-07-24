const express = require("express");
const app = express();
const cors = require("cors");
const supabase = require("./supabaseClient");
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Register, login, verification    
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard
app.use("/homepage", require("./routes/homepage"));

app.listen(5000, () => {
    console.log(`server is running on port 5000`);
});

app.get('/', (req, res) => {
    res.send('testing');
});

app.get('/users-supabase', async (req, res) => {
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
