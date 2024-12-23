import { Provider } from "@supabase/supabase-js";
import supabase from "../supabaseClients";

class LoginService {
  // 이메일 로그인(기본 로그인)
  async emailLogin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // 소셜 로그인
  async socialLogin(provider: Provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.SERVER_URL}/auth/callback`,
      },
    });


    if (error) {
      throw new Error(error.message);
    }

    if (!data.url) {
      throw new Error("Fail to Redirect");
    }

    return data.url;
  }

  async google() {
    return await this.socialLogin("google");
  }

  async kakao() {
    return await this.socialLogin("kakao");
  }
}

class LogoutService {
  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
    }
  }
}

const loginService = new LoginService();
const logoutService = new LogoutService();
export { loginService, logoutService };

