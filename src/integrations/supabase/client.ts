// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cdvcpgtlxpvcztpccxjx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdmNwZ3RseHB2Y3p0cGNjeGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNTQ1MTEsImV4cCI6MjA2MDczMDUxMX0.whC3ZOcntj6U6Jo09gL6s2m7IV0ntjhofSgdzU4DvdM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);