/**
 * @swagger
 *     components:
 *       schemas:
 *         User:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *               format: uuid
 *               description: Unique identifier of the user
 *               example: 6b172f54-5ae0-4ec0-af64-7783df38a16d
 *             user_email:
 *               type: string
 *               format: email
 *               description: User's email address
 *               example: donana1234@donana.com
 *             nickname:
 *               type: string
 *               description: User's nickname
 *               example: donana
 *             user_profile:
 *               type: string
 *               nullable: true
 *               description: Profile image URL of the user
 *               example: https://example.com/uploads/profile.png
 *             role:
 *               type: string
 *               description: Role of the user (e.g., user or admin)
 *               example: user
 *             is_deleted:
 *               type: boolean
 *               description: User account deletion status
 *               example: false
 *             created_at:
 *               type: string
 *               format: date
 *               description: Account creation date
 *               example: 2024-12-13
 *             updated_at:
 *               type: string
 *               format: date
 *               description: Account last update date
 *               example: 2024-12-13
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Passport:
 *       type: object
 *       properties:
 *         passport_id:
 *           type: integer
 *           example: 1
 *         pass_num:
 *           type: string
 *           example: "M123456"
 *         pass_name:
 *           type: string
 *           example: "HONG GILDONG"
 *         country_no:
 *           type: integer
 *           example: 82
 *         issue_date:
 *           type: string
 *           format: date
 *           example: "2022-01-01"
 *         expiry_date:
 *           type: string
 *           format: date
 *           example: "2032-01-01"
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "6b172f54-5ae0-4ec0-af64-7783df38a16d"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Travel:
 *       type: object
 *       properties:
 *         travel_id:
 *           type: string
 *           format: uuid
 *           example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "6b172f54-5ae0-4ec0-af64-7783df38a16d"
 *         travel_title:
 *           type: string
 *           example: "My First Travel!!"
 *         country_no:
 *           type: integer
 *           example: 1
 *         local_name:
 *           type: string
 *           example: "Toronto"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2025-02-10"
 *         end_date:
 *           type: string
 *           format: date
 *           example: "2025-04-10"
 *         address:
 *           type: string
 *           nullable: true
 *           example: 145 Richmond St W, Toronto, ON M5H 2L2, Canada
 *         travel_img:
 *           type: string
 *           nullable: true
 *           example: 🌍
 *         budget_total:
 *           type: number
 *           nullable: true
 *           example: 1000000
 *         memo:
 *           type: number
 *           nullable: true
 *           example: "Prepare for cold weather."
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["tag1", "tag2", "tag3"]
 *     TravelCreateRequest:
 *       type: object
 *       properties:
 *         travel_title:
 *           type: string
 *           example: "My First Travel!!"
 *         country_no:
 *           type: integer
 *           example: 1
 *         local_name:
 *           type: string
 *           example: "Toronto"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2025-02-10"
 *         end_date:
 *           type: string
 *           format: date
 *           example: "2025-04-10"
 *         address:
 *           type: string
 *           nullable: true
 *           example: 145 Richmond St W, Toronto, ON M5H 2L2, Canada
 *         travel_img:
 *           type: string
 *           nullable: true
 *           example: 🌍
 *         budget_total:
 *           type: number
 *           nullable: true
 *           example: 1000000
 *         memo:
 *           type: number
 *           nullable: true
 *           example: "Prepare for cold weather."
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["tag1", "tag2", "tag3"]
 *     Schedule:
 *       type: object
 *       properties:
 *         schedule_id:
 *           type: integer
 *           example: 1
 *         travel_id:
 *           type: string
 *           format: uuid
 *           example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2024-12-25"
 *         schedule_content:
 *           type: string
 *           example: "first schedule"
 *         schedule_no:
 *           type: integer
 *           example: 1
 *         budget:
 *           type: integer
 *           example: 10000
 *         is_done:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 *     components:
 *       schemas:
 *         Country:
 *           type: object
 *           properties:
 *             country_no:
 *               type: integer
 *               example: 82
 *               description: Country Number.
 *             country_code:
 *               type: string
 *               example: KOR
 *               description: Alphabetical three-letter country code.
 *             country_name:
 *               type: string
 *               example: 대한민국
 *               description: The name of the country.
 *             currency:
 *               type: string
 *               example: KRW
 *               description: The currency of the country.
 */

/**
 * @swagger
 *     components:
 *       schemas:
 *         Post:
 *           type: object
 *           properties:
 *             post_id:
 *               type: integer
 *               example: 1
 *               description: Post Number.
 *             title:
 *               type: string
 *               example: "게시글 제목"
 *               description: Post title
 *             content:
 *               type: string
 *               example: "이 포스트는 테스트용 입니다."
 *               description: Post Content
 *             category:
 *               type: enum
 *               example: "mate"
 *               description: Categories for classifying posts - notice, mate, tips
 *             author_id:
 *               type: string
 *               format: uuid
 *               example: "6b172f54-5ae0-4ec0-af64-7783df38a16d"
 *             author:
 *               type: string
 *               example: donana
 *             attached_file:
 *               type: string
 *               nullable: true
 *               example: https://example.com/uploads/profile.png
 *             tags:
 *               type: array
 *               items:
 *                    type: string
 *               example: ["tag1", "tag2", "tag3"]
 *             created_at:
 *               type: string
 *               format: date
 *               description: Post creation date
 *               example: 2024-12-13
 *             updated_at:
 *               type: string
 *               format: date
 *               description: Post last update date
 *               example: 2024-12-13
 */

/**
 * @swagger
 *     components:
 *       schemas:
 *         Comment:
 *           type: object
 *           properties:
 *             comment_id:
 *               type: integer
 *               example: 1
 *               description: Comment identify Number.
 *             content:
 *               type: string
 *               example: "이 댓글은 테스트용 입니다."
 *               description: Comment Content
 *             author_id:
 *               type: string
 *               format: uuid
 *               example: "6b172f54-5ae0-4ec0-af64-7783df38a16d"
 *             author:
 *               type: string
 *               example: donana
 *             post_id:
 *               type: number
 *               example: 1
 *               description: The post number to which the comment belongs
 *             created_at:
 *               type: string
 *               format: date
 *               description: Post creation date
 *               example: 2024-12-13
 *             updated_at:
 *               type: string
 *               format: date
 *               description: Post last update date
 *               example: 2024-12-13
 */
