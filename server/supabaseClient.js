const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL and Key must be provided!");
    process.exit(1); // Exit the application with an error
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;