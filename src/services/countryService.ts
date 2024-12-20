import { countryModel } from "../models/countryModel";

class CountryService {

    // 국가 정보 리스트 조회하는 서비스
    async fetchCountryList() {

        const countryList = await countryModel.getCountryList();
        if (!countryList || countryList.length === 0) {
            throw new Error('Country List not found');
        }
        return countryList; // 국가 정보 리스트 반환
    }
}

const countryService = new CountryService();
export { countryService };
