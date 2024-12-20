import { Router } from "express";
import { countryService } from "../services/countryService";
import { handleError } from "../utils/errorHandle";

const router = Router();

// 국가 리스트 조회
router.get('/', async (req, res) => {
    try {
        const countryList = await countryService.fetchCountryList();
        res.status(200).json({ success: true, data: countryList });
    } catch (error) {
        handleError(res, error);
    }
});

export default router;