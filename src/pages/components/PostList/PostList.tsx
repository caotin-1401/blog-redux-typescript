import PostItem from '../PostItem'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'store'
import { deletePost, getPostList, startEditingPost } from 'pages/blog.slice'
import { Fragment, useEffect } from 'react'
import SkeletonPost from '../SkeletonPost'

// Gọi API trong useEffect()
// Nếu gọi thành công thì dispatch action type: "blog/getPostListSuccess"
// Nếu gọi thất bại thì dispatch action type: "blog/getPostListFailed"

// xxxxx: Dispatch action type "blog/getPostList"

export default function PostList() {
  const postList = useSelector((state: RootState) => state.blog.postList)
  const loading = useSelector((state: RootState) => state.blog.loading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const promise = dispatch(getPostList())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId))
  }
  const handleStartEditing = (postId: string) => {
    dispatch(startEditingPost(postId))
  }
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {loading && (
            <Fragment>
              <SkeletonPost />
              <SkeletonPost />
            </Fragment>
          )}
          {!loading &&
            postList.map((post) => (
              <PostItem post={post} key={post.id} handleDelete={handleDelete} handleStartEditing={handleStartEditing} />
            ))}
        </div>
      </div>
    </div>
  )
}
