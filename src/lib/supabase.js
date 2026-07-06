import { createClient } from '@supabase/supabase-js';

// Pastikan Anda mengisi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Inisialisasi Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
