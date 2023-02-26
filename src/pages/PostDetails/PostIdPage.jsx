import React, { Suspense } from 'react';
import { useNavigate, useLoaderData, defer, Await, useAsyncValue } from 'react-router-dom';

import { getCommentsByPostId, getPostById } from 'shared/api/posts';
import Loader from 'shared/ui/loader/loader';
import MyButton from 'shared/ui/button/MyButton';

const Post = () => {
	const post = useAsyncValue();

	return (
		<>
			<h1>{post.title}</h1>
			<p>{post.body}</p>           
		</>
	);
};

const PostIdPage = () => {
	const navigate = useNavigate();
	const {post, comments} = useLoaderData();

	const goBack = () => navigate(-1);

	return (
		<div >
			<Suspense fallback={ <Loader/> } >
				<Await resolve={post}>
					<Post/>
				</Await>
			</Suspense>

			<MyButton onClick={goBack} >Go Back</MyButton>
			<h1>Comments</h1>
			
			<Suspense fallback={ <Loader/> } >
				<Await resolve={comments}>
					{
						(resolvedComments) => (
							<>
								{resolvedComments.map((comment) => 
									<div style={{marginTop: 15 }} key={comment.id} >
										<h5> {comment.email} </h5>
										<div> {comment.body} </div>
									</div>
								)}
							</>
						)
					}			
				</Await>
			</Suspense>
		</div>
	);
};

async function getPost(postId){
	const response = await getPostById(postId);
	return response.data;
}

async function getPostComments(postId){
	const response = await getCommentsByPostId(postId);
	return response.data;
}

const postLoader = async ({request, params}) => {
	//console.log({ request, params });
	const postId = params.id;

	return defer({
		post: await getPost(postId), 
		comments: getPostComments(postId),
	});
};

export { PostIdPage, postLoader };