/**
 * @swagger
 * tags:
 *   name: Country
 *   description: Country 관련 API
 */
/**
 * @swagger
 * /api/countries:
 *   get:
 *     tags: [Country]
 *     summary: Retrieve a list of countries
 *     description: a list of countries sorted by country's name
 *     responses:
 *       200:
 *         description: The list of countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:  # items는 schema의 하위에 있어야 함
 *                 $ref: '#/components/schemas/Country'
 */
