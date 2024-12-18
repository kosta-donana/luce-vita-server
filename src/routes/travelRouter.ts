import { Router } from "express";
import { travelService } from "../services/travelService";
import { handleError } from "../utils/errorHandle";

const router = Router();

router.get("/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const travelList = await travelService.fetchTravelListByStatus(user_id);

        res.status(200).json({ success: true, data: travelList });
    } catch (error) {
        handleError(res, error);
    }
});

router.post("/", async (req, res) => {
    try {
        const travelData = req.body;
        const createdTravel = await travelService.createTravel(travelData);
        res.status(200).json({ success: true, data: createdTravel });
    } catch (error) {
        handleError(res, error);
    }
});

export default router;