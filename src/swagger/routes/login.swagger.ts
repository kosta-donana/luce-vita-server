/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: 로그인 관련 API
 *   - name: Social Login
 *     description: 소셜 로그인 관련 API
 */

/**
 * @swagger
 * "/login/": {
 *   "post": {
 *     "tags": ["Login"],
 *     "summary": "로그인",
 *     "description": "사용자가 이메일과 비밀번호로 로그인합니다.",
 *     "requestBody": {
 *       "required": true,
 *       "content": {
 *         "application/json": {
 *           "schema": {
 *             "type": "object",
 *             "properties": {
 *               "email": {
 *                 "type": "string",
 *                 "example": "user@example.com"
 *               },
 *               "password": {
 *                 "type": "string",
 *                 "example": "password123"
 *               }
 *             },
 *             "required": ["email", "password"]
 *           }
 *         }
 *       }
 *     },
 *     "responses": {
 *       "200": {
 *         "description": "로그인 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": {
 *                 "session": {
 *                   "access_token": "...",
 *                   "refresh_token": "..."
 *                 }
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "401": {
 *         "description": "로그인 실패"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/signup/token": {
 *   "post": {
 *     "tags": ["Login"],
 *     "summary": "토큰 재발급",
 *     "description": "리프레시 토큰을 사용하여 새로운 액세스 및 리프레시 토큰을 발급받습니다.",
 *     "responses": {
 *       "200": {
 *         "description": "토큰 재발급 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": {
 *                 "access_token": "...",
 *                 "refresh_token": "..."
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "401": {
 *         "description": "토큰 재발급 실패"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/social": {
 *   "post": {
 *     "tags": ["Social Login"],
 *     "summary": "소셜 로그인 페이지 이동",
 *     "description": "소셜 로그인 프로세스를 시작하기 위해 제공자를 지정합니다.",
 *     "requestBody": {
 *       "required": true,
 *       "content": {
 *         "application/json": {
 *           "schema": {
 *             "type": "object",
 *             "properties": {
 *               "provider": {
 *                 "type": "string",
 *                 "example": "google",
 *                 "description": "소셜 로그인 제공자 (예: 'google', 'facebook')."
 *               }
 *             },
 *             "required": ["provider"]
 *           }
 *         }
 *       }
 *     },
 *     "responses": {
 *       "200": {
 *         "description": "소셜 로그인 페이지로 성공적으로 리다이렉트되었습니다.",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "message": "success to redirect: google"
 *             }
 *           }
 *         }
 *       },
 *       "500": {
 *         "description": "서버 오류"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/auth/callback": {
 *   "get": {
 *     "tags": ["Social Login"],
 *     "summary": "소셜 로그인 후 세션 데이터 조회",
 *     "description": "소셜 로그인 콜백 후 세션 데이터(액세스 및 리프레시 토큰)를 확인하고 가져옵니다.",
 *     "parameters": [
 *       {
 *         "in": "query",
 *         "name": "access_token",
 *         "required": true,
 *         "schema": {
 *           "type": "string"
 *         },
 *         "description": "소셜 로그인 제공자가 제공한 액세스 토큰"
 *       },
 *       {
 *         "in": "query",
 *         "name": "refresh_token",
 *         "required": true,
 *         "schema": {
 *           "type": "string"
 *         },
 *         "description": "소셜 로그인 제공자가 제공한 리프레시 토큰"
 *       }
 *     ],
 *     "responses": {
 *       "200": {
 *         "description": "세션 데이터를 성공적으로 가져왔습니다.",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "message": "Session data retrieved successfully."
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "access_token 또는 refresh_token이 누락되었습니다.",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": false,
 *               "message": "require access_token or refresh_token"
 *             }
 *           }
 *         }
 *       },
 *       "500": {
 *         "description": "서버 오류"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/login/logout": {
 *   "post": {
 *     "tags": ["Login"],
 *     "summary": "로그아웃",
 *     "description": "사용자를 로그아웃합니다.",
 *     "responses": {
 *       "200": {
 *         "description": "로그아웃 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "message": "로그아웃 성공"
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
