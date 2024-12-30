import { Response } from "express";

// 쿠키 설정 유틸리티
const setAuthCookies = (
  res: Response,
  tokens: { access_token: string; refresh_token: string },
  email?: string
) => {
  res.cookie("access_token", tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 10 * 60 * 1000, // 10분 유지
  });
  res.cookie("refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 14 * 24 * 3600 * 1000, // 14일 유지
  });
  if (email) {
    res.cookie("email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 14 * 24 * 3600 * 1000, // 14일 유지
    });
  }
};

export { setAuthCookies };
