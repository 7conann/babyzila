import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
  }

  async signUp(email: string, password: string, fullName: string, plan: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);

    // Após o registro bem-sucedido, crie um perfil para o usuário
    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: userId, full_name: fullName, plan: plan });
      if (profileError) throw new Error(profileError.message);
    }

    return data;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erro ao fazer logout:', error.message);
    } else {
      console.log('Usuário deslogado com sucesso!');
    }
  }

  isAuthenticated(): boolean {
    const user = supabase.auth.getSession();
    return !!user;
  }

  getToken() {
    return supabase.auth.getSession();
  }
}
