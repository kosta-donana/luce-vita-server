/**
 * @swagger
 * tags:
 *   - name: Signin
 *     description: Signin 관련 API
 */

/**
 * @swagger
 * "/signup/": {
 *   "post": {
 *     "tags": ["Signin"],
 *     "summary": "회원가입",
 *     "description": "새로운 사용자를 등록합니다.",
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
 *         "description": "회원가입 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": {
 *                 "id": 1,
 *                 "email": "user@example.com"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "회원가입 실패",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": false,
 *               "message": "Invalid email or password"
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/signup/verify": {
 *   "post": {
 *     "tags": ["Signin"],
 *     "summary": "OTP 인증",
 *     "description": "사용자의 이메일에 전송된 OTP를 확인합니다.",
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
 *               "token": {
 *                 "type": "string",
 *                 "example": "123456"
 *               }
 *             },
 *             "required": ["email", "token"]
 *           }
 *         }
 *       }
 *     },
 *     "responses": {
 *       "200": {
 *         "description": "OTP 인증 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": {
 *                 "session": {
 *                   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *                   "refresh_token": "dXNlciByZWZyZXNoIHRva2Vu..."
 *                 }
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "OTP 인증 실패",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": false,
 *               "message": "Invalid OTP or email"
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
