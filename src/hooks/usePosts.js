import { useMemo } from 'react';

export const useSortedPost = (posts, sort) => {
	const sortedPosts = useMemo(() => {
		console.log('>> sortedPosts useMemo');
		if(sort){
			return [...posts].sort((a,b) => a[sort].localeCompare(b[sort]));
		}
		return posts;
	}, [sort, posts]);
    
	return sortedPosts;  
};

export const usePosts = (posts, sort, query) => {
	const sortedPost = useSortedPost(posts, sort);

	const sortedAndSearchedPosts = useMemo (()=>{
		return sortedPost.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
	}, [query, sortedPost]);

	return sortedAndSearchedPosts;
};