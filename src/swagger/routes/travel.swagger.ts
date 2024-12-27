/**
 * @swagger
 * tags:
 *   name: Travel
 *   description: Travel 관련 API
 */

/**
 * @swagger
 * /api/travels:
 *   get:
 *     tags: [Travel]
 *     summary: Retrieve travel list by user ID
 *     description: Get a list of travels categorized by upcoming, ongoing, and completed trips for a specific user.
 *     responses:
 *       200:
 *         description: Successfully retrieved travel list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     upcomingTravels:
 *                       type: array
 *                       items:
 *                         allOf:
 *                           - $ref: '#/components/schemas/Travel'
 *                           - type: object
 *                             properties:
 *                               country:
 *                                type: object
 *                                properties:
 *                                  currency:
 *                                    type: string
 *                                    example: CAD
 *                                  country_name:
 *                                    type: string
 *                                    example: 캐나다
 *                     ongoingTravels:
 *                       type: array
 *                       items:
 *                         allOf:
 *                           - $ref: '#/components/schemas/Travel'
 *                           - type: object
 *                             properties:
 *                               country:
 *                                type: object
 *                                properties:
 *                                  currency:
 *                                    type: string
 *                                    example: CAD
 *                                  country_name:
 *                                    type: string
 *                                    example: 캐나다
 *                     completedTravels:
 *                       type: array
 *                       items:
 *                         allOf:
 *                           - $ref: '#/components/schemas/Travel'
 *                           - type: object
 *                             properties:
 *                               country:
 *                                type: object
 *                                properties:
 *                                  currency:
 *                                    type: string
 *                                    example: CAD
 *                                  country_name:
 *                                    type: string
 *                                    example: 캐나다
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
 * /api/travels/{travel_id}:
 *   get:
 *     tags: [Travel]
 *     summary: Retrieve travel details by travel ID
 *     description: Fetches the details of a specific travel entry using its unique ID.
 *     parameters:
 *       - in: path
 *         name: travel_id
 *         required: true
 *         description: The unique identifier of the travel entry to retrieve.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *     responses:
 *       200:
 *         description: Travel entry successfully retrieved.
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
 *                       - $ref: '#/components/schemas/Travel'
 *                       - type: object
 *                         properties:
 *                           country:
 *                            type: object
 *                            properties:
 *                              currency:
 *                                type: string
 *                                example: CAD
 *                              country_name:
 *                                type: string
 *                                example: 캐나다
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
 * /api/travels/{travel_id}/budgets:
 *   get:
 *     tags: [Travel]
 *     summary: Retrieve travel budget list by travel ID
 *     description:  Get a list of budgets for a travel, categorized by schedule dates.
 *     parameters:
 *       - in: path
 *         name: travel_id
 *         required: true
 *         description: The ID of the travel whose budgets are being fetched.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *     responses:
 *       200:
 *         description: Successfully retrieved travel budget list.
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
 *                       schedule_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-12-13"
 *                       budget:
 *                         type: number
 *                         example: 20000
 *       404:
 *         description:  Travel budget list not found or travel does not exist.
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
 *                   example: Travel not found or no budgets available.
 */

/**
 * @swagger
 * /api/travels:
 *   post:
 *     tags: [Travel]
 *     summary: Create a new travel
 *     description: Creates a new travel record with the provided details.
 *     requestBody:
 *       required: true
 *       description: The travel data to create.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TravelCreateRequest'
 *     responses:
 *       200:
 *         description: Successfully created a new travel record.
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
 *                     $ref: '#/components/schemas/Travel'
 *       404:
 *         description: Failed to create the travel.
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
 *                   example: "Failed to create the travel record."
 */

/**
 * @swagger
 * /api/travels/{travel_id}:
 *   put:
 *     tags: [Travel]
 *     summary: Update travel information
 *     description: Updates the details of a travel entry by its travel_id.
 *     parameters:
 *       - in: path
 *         name: travel_id
 *         description: The ID of the travel to be updated.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *     requestBody:
 *       required: true
 *       description: The travel data to update.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TravelCreateRequest'
 *           example:
 *             user_id: "6b172f54-5ae0-4ec0-af64-7783df38a16d"
 *             travel_title: "My First Travel!!"
 *             country_no: 33
 *             local_name: "Paris"
 *             start_date: "2025-02-10"
 *             end_date : "2025-01-01"
 *             address : 237 Rue de la Convention, 75015 Paris, France
 *             travel_img: "🌍"
 *             budget_total: 2000000
 *             memo: Don't forget to book a train ticket
 *             tags:
 *               - "new_tag1"
 *               - "new_tag2"
 *               - "new_tag3"
 *     responses:
 *       200:
 *         description: Successfully updated the travel information.
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
 *                     $ref: '#/components/schemas/Travel'
 *                   example:
 *                     travel_id: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *                     user_id: "6b172f54-5ae0-4ec0-af64-7783df38a16d"
 *                     travel_title: "My First Travel!!"
 *                     country_no: 33
 *                     local_name: "Paris"
 *                     start_date: "2025-02-10"
 *                     end_date : "2025-01-01"
 *                     address : 237 Rue de la Convention, 75015 Paris, France
 *                     travel_img: "🌍"
 *                     budget_total: 2000000
 *                     memo: Don't forget to book a train ticket
 *                     tags: ["new_tag1", "new_tag2", "new_tag3"]
 *       404:
 *         description: Travel entry not found.
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
 *                   example: "Travel entry not found"
 */

/**
 * @swagger
 * /api/travels/{travel_id}:
 *   delete:
 *     tags: [Travel]
 *     summary: Delete a travel by ID
 *     description: Deletes a travel record identified by its ID.
 *     parameters:
 *       - in: path
 *         name: travel_id
 *         required: true
 *         description: The ID of the travel to delete.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *     responses:
 *       200:
 *         description: Successfully deleted the travel.
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
 *                     $ref: '#/components/schemas/Travel'
 *       404:
 *         description: Travel not found or could not be deleted.
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
 *                   example: "Travel not found."
 */

/**
 * @swagger
 * /api/travels/{travel_id}/top-schedules:
 *   get:
 *     tags: [Travel]
 *     summary: Get the top schedules for a specific travel
 *     description: Fetches the first two schedules for a given travel, grouped by schedule date.
 *     parameters:
 *       - in: path
 *         name: travel_id
 *         required: true
 *         description: The ID of the travel for which the schedules are fetched.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *     responses:
 *       200:
 *         description:  Successfully fetched the top schedules for the specified travel.
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
 *                     $ref: '#/components/schemas/Schedule'
 *                   example:
 *                     - schedule_id: 1
 *                       travel_id: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *                       schedule_date: "2024-12-25"
 *                       schedule_content: first schedule
 *                       schedule_no: 1
 *                       budget: 10000
 *                       is_done: true
 *                     - schedule_id: 2
 *                       travel_id: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *                       schedule_date: "2024-12-25"
 *                       schedule_content: second schedule
 *                       schedule_no: 2
 *                       budget: 50000
 *                       is_done: false
 *                     - schedule_id: 4
 *                       travel_id: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *                       schedule_date: "2024-12-26"
 *                       schedule_content: The first schedule of the second day
 *                       schedule_no: 1
 *                       budget: 90000
 *                       is_done: false
 *                     - schedule_id: 5
 *                       travel_id: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *                       schedule_date: "2024-12-26"
 *                       schedule_content: The second schedule of the second day
 *                       schedule_no: 2
 *                       budget: null
 *                       is_done: false
 *       404:
 *         description: Travel not found or no schedules available for the specified travel ID.
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
 *                   example: "Travel not found or no schedules available"
 */
