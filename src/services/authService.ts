import { userModel } from "../models/userModel";
import supabase from "../supabaseClients";

class VerifyUserService {
  // DB에 이미 등록된 회원인지 검증
  async existingUser(email: string, password: string) {
    console.log(email);

    // DB에서 입력된 이메일 존재 시 배열 반환, 없으면 빈 배열 반환
    const exist = await userModel.fetchUserEmail(email);
    console.log(exist);

    if (exist.includes(email)) {
      console.log("이미 등록된 유저입니다.");
      return;
    }
    // DB에 존재하지 않는 경우, auth.users 조회
    this.invalidUser(email, password);
  }

  async invalidUser(email: string, password: string) {
    console.log(email, password);
    // auth.users 테이블 조회 > 존재하면 data 반환
    const { data, error } = await supabase.rpc("get_user_by_email", { user_email: email });

    if (error) {
      console.log("유저 조회 실패: 유효하지 않은 이메일", error.message);
      throw new Error("User Info not found");
    }
    console.log("rpc result: ", data);

    if (data && data.length > 0) {
      // auth.user에서 데이터 삭제
      const { error: deleteError } = await supabase.rpc("delete_user_by_email", { user_email: email });

      if (deleteError) {
        console.error("유저 삭제 실패", deleteError.message);
        throw new Error(deleteError.message);
      }
      console.log("유저 삭제 완료");
    }

    // OTP 번호 요청
    const otpService = new OtpService();
    otpService.sendOtp(email, password);
  }
}

class OtpService {
  async sendOtp(email: string, password: string) {
    console.log(email, password);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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
      console.error("otp 인증 실패", error.message);
      throw new Error(error.message);
    }

    console.log(data);
    return data;
  }
}

class TokenService {
  async reissuedToken(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
    console.log(refreshToken);

    if (!refreshToken) {
      console.error("refresh Token 확인 불가");
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
        console.error("토큰 갱신 실패:", error.message);
        throw new Error(error.message); // 에러를 호출자에게 전달
      } else {
        console.error("토큰 갱신 실패:", error);
        throw new Error("알 수 없는 오류가 발생했습니다."); // 알 수 없는 오류 처리
      }
    }
  }
}

const verifyService = new VerifyUserService();
const otpService = new OtpService();
const tokenService = new TokenService();
export { verifyService, otpService, tokenService };
