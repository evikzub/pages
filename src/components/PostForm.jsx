import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({create}) => {

    const emptyPost = {title: '', body: ''};
    const [post, setPost] = useState(emptyPost)
  
    const addNewPost = (e) => {
      e.preventDefault();
      //setPosts([...posts, {...post, id: Date.now()}]);
      const newPost = {...post, id: Date.now()}
      create(newPost);
      setPost(emptyPost);  
    }
    
    return(
        <form>
            <MyInput 
                type="text" 
                value={post.title} 
                placeholder='Post Name'
                onChange={e => setPost({...post, title: e.target.value})}
            />
            <MyInput type="text" placeholder='Post Description'
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={addNewPost}>Create post</MyButton>
      </form>
    )
}

export default PostForm;