import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envContent = fs.readFileSync(".env.local", "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (match) {
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[match[1]] = val;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from("agent_configs").select("*");
  if (error) {
    console.error("Error:", error);
  } else {
    console.log(`Found ${data.length} configurations:`);
    data.forEach((c) => {
      console.log(`- Seller: ${c.seller_id}`);
      console.log(`  Prompt: ${c.agent_prompt}`);
      console.log(`  Items:`, JSON.stringify(c.knowledge_items));
    });
  }
}

check();
