import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostService from '../API/PostService';
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
    //const {id} = useParams();
    const params = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getPostDetails(id);
        setPost(response.data);
    })

    const [fetchCommentsById, isCommentsLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect(() => {
        //console.log("PostIdPage -> UseEfect -> id: ", id)
        
        ////1: fetch call ->         
        //PostService.getPostById(id).then((data) => setPost(data))
        
        ////2: axios async call -> use fetchData()
        // async function fetchData() {
        //     const result = await PostService.getPostDetails(id);
        //     setPost(result.data);
        // }
        // fetchData();

        ////3: useFetchiong
        fetchPostById(params.id);
        fetchCommentsById(params.id);

    }, [params.id]);


    // useEffect(() => {
    //     console.log("PostIdPage -> UseEfect -> post: ", post)
    // }, [post])

    const goBack = () => navigate(-1)

    return (
        <div >
            {/* {post && isLoading
                ? <Loader/>
                :
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>           
                </div>

            } */}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>           
                </>
            )}
            <MyButton onClick={goBack} >Go Back</MyButton>
            <h1>Comments</h1>
            {comments && (
                <>
                    {comments.map((comment) => 
                        <div style={{marginTop: 15 }} key={comment.id} >
                            <h5> {comment.email} </h5>
                            <div> {comment.body} </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default PostIdPage;