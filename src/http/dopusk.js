import {$authHost, $host} from "./index";

export const CreateDopusk = async (student_id, professor_id, date, type, discipline_id) => {
    const {data} = await $authHost.post('v1/dopusk/create', {student_id, professor_id, date, type, discipline_id})
    return data
}