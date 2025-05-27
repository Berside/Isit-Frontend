import {$authHost, $host} from "./index";
export const GetAllGrade = async (userID) => {
    const {data} = await $host.get('v1/grade/getMany', {
      params: {
          student_id: userID  
          }
      })
    return data;
}
export const GetAllGradeProf = async (userID) => {
    const {data} = await $host.get('v1/grade/getMany', {
      params: {
          professor_id: userID  
          }
      })
    return data;
}

export const CreateGrade = async (value,student_id,  professor_id, type, discipline_id) => {
    const {data} = await $authHost.post('v1/grade/create', {value,student_id,  professor_id, type, discipline_id})
    return data
}

export const UpdateGrade = async (id, value) => {
    const {data} = await $authHost.patch('v1/grade/update', {id, value})
    return data
}
export const DeleteGrade = async (id) => {
    const {data} = await $authHost.delete('v1/grade/delete', {
      params: {
        id: id
      }
    })
    return data
}