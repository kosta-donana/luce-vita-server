import { Response } from "express";

// 에러 핸들링 유틸리티
const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    res.status(409).json({ success: false, error: error.message });
  } else {
    res.status(500).json({ success: false, error: String(error) });
  }
};

export { handleError };
