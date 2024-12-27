/**
 * @swagger
 * tags:
 *   name: User
 *   description: User 관련 API
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [User]
 *     summary: Retrieve user and passport information by user ID
 *     description: Retrieves user details along with passport information if available.
 *     responses:
 *       200:
 *         description: Successfully retrieved user and passport information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     allOf:
 *                       - $ref: '#/components/schemas/User'
 *                       - type: object
 *                         properties:
 *                           passport:
 *                             type: array
 *                             items:
 *                               allOf:
 *                                 - $ref: '#/components/schemas/Passport'
 *                                 - type: object
 *                                   properties:
 *                                     country:
 *                                       type: object
 *                                       properties:
 *                                         country_name:
 *                                           type: string
 *                                           example: "대한민국"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User not found."
 */

/**
 * @swagger
 * /api/users/deactivate:
 *   post:
 *     tags: [User]
 *     summary: Deactivate user account
 *     description: Change the user's is_deleted value from FALSE to TRUE.
 *     responses:
 *       200:
 *         description: Successfully deactivated the user account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found or error deactivating the account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User not found."
 */

/**
 * @swagger
 * /api/users/passport:
 *   post:
 *     tags: [User]
 *     summary: Create or update passport information
 *     description: Checks if a passport exists for the user. If not, inserts a new passport. If exists, updates the passport.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pass_num:
 *                 type: string
 *                 example: "M123456"
 *               country_no:
 *                 type: integer
 *                 example: 82
 *               pass_name:
 *                 type: string
 *                 example: "HONG GILDONG"
 *               issue_date:
 *                 type: string
 *                 format: date
 *                 example: "2022-01-01"
 *               expiry_date:
 *                 type: string
 *                 format: date
 *                 example: "2032-01-01"
 *     responses:
 *       200:
 *         description: Successfully created or updated the passport information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       passport_id:
 *                         type: integer
 *                         example: 1
 *                       pass_num:
 *                         type: string
 *                         example: "M123456"
 *                       country_no:
 *                         type: integer
 *                         example: 82
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         example: "6b172f54-5ae0-4ec0-af64-7783df38a16d"
 *                       issue_date:
 *                         type: string
 *                         format: date
 *                         example: "2022-01-01"
 *                       expiry_date:
 *                         type: string
 *                         format: date
 *                         example: "2032-01-01"
 *                       pass_name:
 *                         type: string
 *                         example: "HONG GILDONG"
 *       404:
 *         description: User not found or error updating passport.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "User not found."
 */

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     tags: [User]
 *     summary: Update user profile
 *     description: Updates the user's profile, including their nickname and profile image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: donana
 *                 description: The new nickname of the user
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The profile image file to upload
 *     responses:
 *       200:
 *         description: Successfully updated the user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: An unexpected error occurred
 */

/**
 * @swagger
 * /api/users/validate/{nickname}:
 *   get:
 *     tags: [User]
 *     summary: Check if the nickname is available
 *     description: Checks whether the nickname is already taken or available.
 *     parameters:
 *       - in: path
 *         name: nickname
 *         required: true
 *         description: The nickname to check for availability.
 *         schema:
 *           type: string
 *           example: donana
 *     responses:
 *       200:
 *         description: The result of nickname availability check.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 available:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Nickname is already taken."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: An unexpected error occurred
 */
