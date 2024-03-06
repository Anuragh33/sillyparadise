import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://iiimsgqnuumjbybcremo.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpaW1zZ3FudXVtamJ5YmNyZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNjAxMDcsImV4cCI6MjAyNDkzNjEwN30.3HABtplEt7HxfPSwGNClqt402EFX5NEzijBfnPt0pbw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
