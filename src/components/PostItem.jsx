import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./UI/button/MyButton";

const PostItem = function (props){
    //console.log(props);
    const router = useNavigate();
    return (
        <div className='post'>
            <div className='post__content'>
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className='post__btns'>
                {/* <MyButton onClick={() => router(`/posts/${props.post.id}`, {state: {$id: props.post.id}})}>Open</MyButton> */}
                <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Open</MyButton>
                {/* <Link key={props.post.id} to={`/posts/${props.post.id}`} >Open</Link> */}
            </div>
            <div className='post__btns'>
                <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    )    
}

export default PostItem;