import { userModel } from "../models/userModel";
import supabase from "../supabaseClients";

class VerifyUserService {
  private otpService: OtpService;

  constructor(otpService: OtpService) {
    this.otpService = otpService;
  }

  // DB에 이미 등록된 회원인지 검증
  async existingUser(email: string, password: string) {
    const exist = await userModel.fetchUserEmail(email);

    if (exist.includes(email)) {
      throw new Error("Registered User");
    }

    await this.invalidUser(email, password);
  }

  // 미등록 유저 처리
  async invalidUser(email: string, password: string) {
    const { data, error } = await supabase.rpc("get_user_by_email", { user_email: email });

    if (error) {
      throw new Error("RPC Error: " + error.message);
    }

    if (data && data.length > 0) {
      const { error: deleteError } = await supabase.rpc("delete_user_by_email", { user_email: email });

      if (deleteError) {
        throw new Error(deleteError.message);
      }
    }

    if (!data || data.length === 0) {
    }

    // OTP 번호 요청
    await this.otpService.sendOtp(email, password);
  }
}

class OtpService {
  async sendOtp(email: string, password: string) {
    console.log(email, password);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log("인증번호 송신 실패", error.message);
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  }

  async verifyOtp(email: string, otp: string) {
    console.log(email, otp);

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup",
    });

    if (error) {
      throw new Error("Verification Failed");
    }

    console.log(data);
    return data;
  }
}

class TokenService {
  async reissuedToken(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
    console.log(refreshToken);

    if (!refreshToken) {
      throw new Error("Refresh Token이 없습니다.");
    }

    try {
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data || !data.session) {
        throw new Error("새로운 세션 데이터가 없습니다.");
      }

      console.log(data);
      return {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("알 수 없는 오류가 발생했습니다.");
      }
    }
  }
}

const otpService = new OtpService();
const verifyService = new VerifyUserService(otpService);
const tokenService = new TokenService();
export { otpService, tokenService, verifyService };
