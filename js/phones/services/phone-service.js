
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static';

const PhoneService = {


  getAll() {
    return fetch(`${BASE_URL}/api/phones.json`)
      .then(response => response.json());
  },

  getById(id) {
    return fetch(`${BASE_URL}/api/${id}.json`)
      .then(response => response.json());
  },
};

export default PhoneService;
