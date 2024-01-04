
const API_URL ="https://blogback-qong.onrender.com/api/v1/users"

export const addusers = async(data)=>{
    try{
   return await axios.post(API_URL,  data)
    }catch(error){
        console.log(error.message);
    }
}

export const getUsers = async(url)=>{
    try{
 return await axios.get(API_URL)
    }catch(error){
        console.log(error.message)
    }
}

export const getUser = async(id)=>{
    try{
 return await axios.get(`${API_URL}/${id}`)
    }catch(error){
        console.log(error.message)
    }
}

export const edituser =  async(data,id)=>{
    try{
    return await axios.put(`${API_URL}/${id}`, data)
    }catch(error){
        console.log(error.message);
    }
}

export const deleteUser = async(id)=>{
    try{
     return await axios.delete(`${API_URL}/${id}`)
    }catch(error){
        console.log(error.message);
    }
}