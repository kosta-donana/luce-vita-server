/**
 * @swagger
 * tags:
 *   - name: Post
 *     description: Post 관련 API
 *   - name: Comment
 *     description: Comment 관련 API
 */

/**
 * @swagger
 * "/post/{category}": {
 *   "get": {
 *     "tags": ["Post"],
 *     "summary": "게시글 조회",
 *     "parameters": [
 *       {
 *         "name": "category",
 *         "in": "path",
 *         "required": true,
 *         "schema": {
 *           "type": "string"
 *         },
 *         "example": "mate"
 *       }
 *     ],
 *     "responses": {
 *       "200": {
 *         "description": "게시글 조회 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": [
 *                 {
 *                   "id": 1,
 *                   "title": "게시글 제목",
 *                   "content": "게시글 내용",
 *                   "category": "mate"
 *                 }
 *               ]
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "게시글 조회 실패"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/post/{category}/{post_id}": {
 *   "get": {
 *     "tags": ["Post"],
 *     "summary": "상세 게시글 조회",
 *     "parameters": [
 *       {
 *         "name": "category",
 *         "in": "path",
 *         "required": true,
 *         "schema": {
 *           "type": "string"
 *         },
 *         "example": "notice"
 *       },
 *       {
 *         "name": "post_id",
 *         "in": "path",
 *         "required": true,
 *         "schema": {
 *           "type": "integer"
 *         },
 *         "example": 123
 *       }
 *     ],
 *     "responses": {
 *       "200": {
 *         "description": "상세 게시글 조회 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": {
 *                 "id": 123,
 *                 "title": "게시글 제목",
 *                 "content": "게시글 내용",
 *                 "category": "notice"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "404": {
 *         "description": "게시글을 찾을 수 없음"
 *       },
 *       "400": {
 *         "description": "요청이 잘못됨"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/post/create": {
 *   "post": {
 *     "tags": ["Post"],
 *     "summary": "게시글 생성",
 *     "requestBody": {
 *       "required": true,
 *       "content": {
 *         "application/json": {
 *           "schema": {
 *             "type": "object",
 *             "properties": {
 *               "title": {
 *                 "type": "string",
 *                 "example": "게시글 제목"
 *               },
 *               "content": {
 *                 "type": "string",
 *                 "example": "게시글 내용"
 *               },
 *               "category": {
 *                 "type": "enum",
 *                 "example": "mate"
 *               },
 *               "attached_file": {
 *                 "type": "string",
 *                 "example": "파일 URL"
 *               },
 *               "tags": {
 *                 "type": "array",
 *                 "items": {
 *                   "type": "string"
 *                 },
 *                 "example": ["태그1", "태그2"]
 *               }
 *             },
 *             "required": ["title", "content", "category"]
 *           }
 *         }
 *       }
 *     },
 *     "responses": {
 *       "200": {
 *         "description": "게시글 생성 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": {
 *                 "id": 1,
 *                 "title": "게시글 제목",
 *                 "content": "게시글 내용"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "게시글 생성 실패"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/post/edit/{post_id}": {
 *   "put": {
 *     "tags": ["Post"],
 *     "summary": "게시글 수정",
 *     "parameters": [
 *       {
 *         "name": "post_id",
 *         "in": "path",
 *         "required": true,
 *         "schema": {
 *           "type": "integer"
 *         },
 *         "example": 1
 *       }
 *     ],
 *     "requestBody": {
 *       "required": true,
 *       "content": {
 *         "application/json": {
 *           "schema": {
 *             "type": "object",
 *             "properties": {
 *               "title": {
 *                 "type": "string",
 *                 "example": "수정된 제목"
 *               },
 *               "content": {
 *                 "type": "string",
 *                 "example": "수정된 내용"
 *               }
 *             },
 *             "required": ["title", "content"]
 *           }
 *         }
 *       }
 *     },
 *     "responses": {
 *       "200": {
 *         "description": "게시글 수정 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": {
 *                 "id": 1,
 *                 "title": "수정된 제목",
 *                 "content": "수정된 내용"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "게시글 수정 실패"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/post/delete/{post_id}": {
 *   "delete": {
 *     "tags": ["Post"],
 *     "summary": "게시글 삭제",
 *     "parameters": [
 *       {
 *         "name": "post_id",
 *         "in": "path",
 *         "required": true,
 *         "schema": {
 *           "type": "integer"
 *         },
 *         "example": 1
 *       }
 *     ],
 *     "responses": {
 *       "200": {
 *         "description": "게시글 삭제 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "message": "게시글이 성공적으로 삭제되었습니다."
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "게시글 삭제 실패"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/comment/create": {
 *   "post": {
 *     "tags": ["Comment"],
 *     "summary": "댓글 생성",
 *     "requestBody": {
 *       "required": true,
 *       "content": {
 *         "application/json": {
 *           "schema": {
 *             "type": "object",
 *             "properties": {
 *               "post_id": {
 *                 "type": "integer",
 *                 "example": 1
 *               },
 *               "content": {
 *                 "type": "string",
 *                 "example": "This is a comment"
 *               }
 *             },
 *             "required": ["post_id", "content"]
 *           }
 *         }
 *       }
 *     },
 *     "responses": {
 *       "200": {
 *         "description": "댓글 생성 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": {
 *                 "id": 1,
 *                 "content": "This is a comment"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "댓글 생성 실패"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/comment/edit/{comment_id}": {
 *   "put": {
 *     "tags": ["Comment"],
 *     "summary": "댓글 수정",
 *     "parameters": [
 *       {
 *         "name": "comment_id",
 *         "in": "path",
 *         "required": true,
 *         "schema": {
 *           "type": "integer"
 *         },
 *         "example": 1
 *       }
 *     ],
 *     "requestBody": {
 *       "required": true,
 *       "content": {
 *         "application/json": {
 *           "schema": {
 *             "type": "object",
 *             "properties": {
 *               "content": {
 *                 "type": "string",
 *                 "example": "Updated comment"
 *               }
 *             },
 *             "required": ["content"]
 *           }
 *         }
 *       }
 *     },
 *     "responses": {
 *       "200": {
 *         "description": "댓글 수정 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "data": {
 *                 "id": 1,
 *                 "content": "Updated comment"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "댓글 수정 실패"
 *       }
 *     }
 *   }
 * }
 */

/**
 * @swagger
 * "/comment/delete/{comment_id}": {
 *   "delete": {
 *     "tags": ["Comment"],
 *     "summary": "댓글 삭제",
 *     "parameters": [
 *       {
 *         "name": "comment_id",
 *         "in": "path",
 *         "required": true,
 *         "schema": {
 *           "type": "integer"
 *         },
 *         "example": 1
 *       }
 *     ],
 *     "responses": {
 *       "200": {
 *         "description": "댓글 삭제 성공",
 *         "content": {
 *           "application/json": {
 *             "example": {
 *               "success": true,
 *               "message": "Comment deleted successfully"
 *             }
 *           }
 *         }
 *       },
 *       "400": {
 *         "description": "댓글 삭제 실패"
 *       }
 *     }
 *   }
 * }
 */
