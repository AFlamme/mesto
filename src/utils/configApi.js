import Api from "../components/Api";

// Настройка. Подключение к серверу
const token = 'c4e2fce1-46f1-4f6b-98ee-6e99b6737200';
const cohortId = 'cohort-41';

export const configApi = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});