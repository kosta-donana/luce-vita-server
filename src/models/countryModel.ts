import supabase from "../supabaseClients";

class CountryModel {

    // 국가 정보 조회하는 함수
    async getCountryList() {

        const { data, error } = await supabase.rpc('get_countries_sorted');

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}

const countryModel = new CountryModel();
export { countryModel };

