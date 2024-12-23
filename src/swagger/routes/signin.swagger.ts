/**
 * @swagger
 * tags:
 *   name: Signin
 *   description: Signin 관련 API
 */

/**
 * @swagger
 * "/auth/": {
      "post": {
        "summary": "회원가입",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "example": "user@example.com"
                  },
                  "password": {
                    "type": "string",
                    "example": "password123"
                  }
                },
                "required": ["email", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "회원가입 성공",
            "content": {
              "application/json": {
                "example": {
                  "success": true,
                  "data": {
                    "id": 1,
                    "email": "user@example.com"
                  }
                }
              }
            }
          },
          "400": {
            "description": "회원가입 실패"
          }
        }
      }
    }
    */

/**
    * @swagger
    *"/auth/verify": {
      "post": {
        "summary": "OTP 인증",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "example": "user@example.com"
                  },
                  "token": {
                    "type": "string",
                    "example": "123456"
                  }
                },
                "required": ["email", "token"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OTP 인증 성공",
            "content": {
              "application/json": {
                "example": {
                  "success": true,
                  "data": {
                    "session": {
                      "access_token": "...",
                      "refresh_token": "..."
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "OTP 인증 실패"
          }
        }
      }
    } 
*/
