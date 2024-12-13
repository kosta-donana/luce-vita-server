import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Database } from "../database.types";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

const supabase = createClient<Database>(SUPABASE_URL!, SUPABASE_KEY!);

export { SUPABASE_URL };
export default supabase;
