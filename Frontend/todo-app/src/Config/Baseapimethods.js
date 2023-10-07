import axios from "axios";

let apiHandle = axios.create({
    baseURL: "http://localhost:5000/api",
});

let Get = (endPoint) => {
    return apiHandle.get(endPoint);
}
let GetById = (endPoint, id) => {
    return apiHandle.get(`${endPoint}/${id}`)
}
let Post = (endPoint, body) => {
    return apiHandle.post(`${endPoint}`, body);
}
let Put = (endPoint, body) => {
    return apiHandle.put(`${endPoint}`, body);
}
let Delete = (endPoint, id) => {
    return apiHandle.delete(`${endPoint}/${id}`)
}

export  { Get, GetById, Post, Put, Delete };