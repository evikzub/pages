import axios from "axios";

export default class PostService {

    static async getAll(limit = 10, page =1){
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            return response
        } catch(e) {
            console.log(e)
        }
    }

    static async getPostById(id){
        try{
            const result = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                //.then(res => res.json())
                //.then((data) => console.log('res: ',data));
            return result.json();
        } catch(e) {
            console.log("Error -> ", e)
        }
    }

    static async getPostDetails(id){
        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            return response
        } catch(e) {
            console.log("Error -> ", e)
        }
    }
    
    static async getCommentsByPostId(id){
        try{
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            return response
        } catch(e) {
            console.log("Error -> ", e)
        }
    }
}