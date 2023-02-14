import React, {useEffect, useState} from 'react';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import { usePosts } from '../hooks/usePosts';
import '../styles/App.css';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/pagination';
import { useRef } from 'react';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  
  const [posts, setPosts] = useState([])
  //   {id: 1, title: 'Java Script NOP 2', body: 'Description ABC 1'},
  //   {id: 2, title: 'Java Script RST 1', body: 'Description DEF 2'},
  //   {id: 3, title: 'Java Script VWZ 4', body: 'Description GIJ 4'},
  //   {id: 4, title: 'Java Script 300', body: 'Description KLM 5'}
  // ])

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);//1
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    console.log("useFetching, page: ", page)
    const response = await PostService.getAll(limit, page);
    //setPosts(response.data)
    //extend list when loading a new data
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count'] 
    const totalPages = getPageCount(totalCount, limit) 
    setTotalPages(totalPages)
    console.log(totalCount)
    console.log("Total Pages: ", totalPages, " => ", getPageCount(totalCount, limit))
  })

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  } 

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    console.log('useEffect -> fetchPosts; page: ', page)
    fetchPosts(limit, page);
  }, [page, limit])

  //const sortPosts = (sort) => {
  //  setSelectedSort(sort);
    //console.log(sort);
    //setPosts([...posts].sort((a,b) => a[sort].localeCompare(b[sort])))
    //setPosts([...posts].sort((a,b) => a[sort]-b[sort]))
  //}

  const changePage = (page) => {
    setPage(page)
    //instead of useEffect [page]
    //fetchPosts(limit, page)
  }


  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>Create Post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange={value => setLimit(value) }
        defaultValue="Qty posts on the page"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'all'},
        ]}
      />
      {postError &&
        <h1>Error ${postError} </h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts List 1"/>
      <div ref={lastElement} style={{height: 20, background: 'red'}} />
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
      }
      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
    </div>
  );
}

export default Posts;