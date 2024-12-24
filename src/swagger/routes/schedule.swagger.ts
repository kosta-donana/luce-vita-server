/**
 * @swagger
 * tags:
 *   name: Schedule
 *   description: Schedule 관련 API
 */

/**
 * @swagger
 * /api/travels/{travel_id}/schedules/{schedule_date}:
 *   get:
 *     tags: [Schedule]
 *     summary: Retrieve all schedules for a specific date of a travel
 *     description: Fetches all the schedules for a specific travel on a given date.
 *     parameters:
 *       - in: path
 *         name: travel_id
 *         required: true
 *         description: The ID of the travel to retrieve schedules from.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *       - in: path
 *         name: schedule_date
 *         required: true
 *         description: The date of the schedules to be fetched.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-12-25"
 *     responses:
 *       200:
 *         description: Successfully retrieved the schedules for the specified date.
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
 *       404:
 *         description: No schedules found for the specified travel and date.
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
 *                   example: "No schedules found for the specified date"
 */
/**
 * @swagger
 * /api/travels/schedules/{schedule_id}/{is_done}:
 *   patch:
 *     tags: [Schedule]
 *     summary: Update the "is_done" status of a specific schedule
 *     description: Marks a travel schedule as completed or not completed by updating the "is_done" status.
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         description: The ID of the schedule to be updated.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: is_done
 *         required: true
 *         description: The status to set for "is_done". Can be either "true" or "false".
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Successfully updated the "is_done" status of the schedule.
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
 *       404:
 *         description:  Schedule not found or invalid "is_done" status provided.
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
 *                   example: "Schedule not found or invalid 'is_done' status"
 */

/**
 * @swagger
 * /api/travels/{travel_id}/schedules:
 *   post:
 *     tags: [Schedule]
 *     summary: Add/Update/Delete detailed schedules for a specific travel
 *     description: This endpoint allows for adding, updating, or deleting schedules for a given travel.
 *     parameters:
 *       - in: path
 *         name: travel_id
 *         required: true
 *         description: The ID of the travel for which the schedules are managed.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *     requestBody:
 *         required: true
 *         description: Schedule data to be added or updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedule_date:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-25"
 *                 schedule_list:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       schedule_id:
 *                         type: integer
 *                         example: 1
 *                       schedule_no:
 *                         type: integer
 *                         example: 1
 *                       budget:
 *                         type: integer
 *                         nullable: true
 *                         example: 10000
 *                       schedule_content:
 *                         type: string
 *                         example: first schedule
 *                     required: # schedule_id는 필수로 포함되지 않음
 *                       - schedule_no
 *                       - budget
 *                       - schedule_content
 *                   example: [ {"schedule_id": 1, "schedule_no": 1, "budget": 10000, "schedule_content": "first schedule"},
 *                               {"schedule_no": 2, "budget": 50000, "schedule_content": "second schedule"} ]
 *               required:
 *                 - schedule_date
 *                 - schedule_list
 *     responses:
 *       200:
 *         description: Successfully added, updated, or deleted travel schedules.
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
 *       404:
 *         description: Error processing the travel schedule (e.g., invalid data, missing required fields).
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
 *                   example: "Error processing the schedule data"
 */

/**
 * @swagger
 * /api/travels/{travel_id}/schedules/{schedule_date}:
 *   delete:
 *     tags: [Schedule]
 *     summary: Delete all schedules for a specific date of a travel
 *     description: Deletes all schedules for the specified date of a travel.
 *     parameters:
 *       - in: path
 *         name: travel_id
 *         required: true
 *         description: The ID of the travel to delete schedules from.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "f078c4b1-a0fd-43df-a585-46be21721c20"
 *       - in: path
 *         name: schedule_date
 *         required: true
 *         description: The date of the schedules to be deleted.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-12-25"
 *     responses:
 *       200:
 *         description: Successfully deleted the schedules for the specified date.
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
 *       404:
 *         description: No schedules found for the given travel and date.
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
 *                   example: "No schedules found for the specified date"
 */
