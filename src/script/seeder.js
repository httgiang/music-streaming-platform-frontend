import { createClient } from "@supabase/supabase-js";
const supabase_url = process.env.SUPABASE_PROJECT_URL;
const service_role_key = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabase_url, service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
// Access auth admin api
const adminAuthClient = supabase.auth.admin;
const { data, error } = await adminAuthClient.createUser({
  email: "user@email.com",
  password: "@password123",
  email_confirm: true,
  user_metadata: {
    name: "Billie Eilish",
  },
});
