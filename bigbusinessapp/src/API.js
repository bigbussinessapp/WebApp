const API_URL = "https://jsonplaceholder.typicode.com/posts"
// import { datajson } from "./data.json";

// ignore this API call as of now..
export async function getListData() {
    const response = await fetch(API_URL);
    return response.json();
}