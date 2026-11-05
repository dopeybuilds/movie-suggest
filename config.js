import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

/** OpenAI config */
if (!import.meta.env.VITE_OPENAI_API_KEY) throw new Error("Expected env var VITE_OPENAI_API_KEY");
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

/** Supabase config */
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
if (!supabaseKey) throw new Error("Expected env var VITE_SUPABASE_API_KEY");
const url = import.meta.env.VITE_SUPABASE_URL;
if (!url) throw new Error("Expected env var VITE_SUPABASE_URL");
export const supabase = createClient(url, supabaseKey);
