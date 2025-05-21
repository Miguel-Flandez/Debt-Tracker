import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://xnhfclnixcqivuudknst.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuaGZjbG5peGNxaXZ1dWRrbnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MzU3NDgsImV4cCI6MjA2MzIxMTc0OH0.Lv38PuB4RCNZaI0sOFxjYKLe13zQkNfqMJkznpDg4sk'

export const supabase = createClient(supabaseUrl, supabaseKey);
