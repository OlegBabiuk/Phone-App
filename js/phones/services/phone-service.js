
const BASE_URL = 'https://olegbabiuk.github.io/Phone-App';

const PhoneService = {


  getAll() {
    return fetch(`${BASE_URL}/phones/phones.json`)
      .then(response => response.json());
  },

  getById(id) {
    return fetch(`${BASE_URL}/phones/${id}.json`)
      .then(response => response.json());
  },
};

export default PhoneService;
