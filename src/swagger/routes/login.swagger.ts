/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Login 관련 API
 */

/**
 * @swagger
 * "/login/": {
      "post": {
        "summary": "로그인",
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
            "description": "로그인 성공",
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
          "401": {
            "description": "로그인 실패"
          }
        }
      }
    }
 */

/**
 * @swagger
 * "/auth/token": {
      "post": {
        "summary": "토큰 재발급",
        "responses": {
          "200": {
            "description": "토큰 재발급 성공",
            "content": {
              "application/json": {
                "example": {
                  "success": true,
                  "data": {
                    "access_token": "...",
                    "refresh_token": "..."
                  }
                }
              }
            }
          },
          "401": {
            "description": "토큰 재발급 실패"
          }
        }
      }
    }
 */

/**
 * @swagger
 * "/login/logout": {
      "post": {
        "summary": "로그아웃",
        "responses": {
          "200": {
            "description": "로그아웃 성공",
            "content": {
              "application/json": {
                "example": {
                  "success": true,
                  "message": "로그아웃 성공"
                }
              }
            }
          }
        }
      }
    }
  }
}
 */
