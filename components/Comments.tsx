import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';
import NoResults from './NoResults';

interface IProps {
  comment: string;
  isPostingComment: boolean;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[]
}

interface IComment {
  comment: string;
  _key: string;
  postedBy: {
    image: string;
    userName: string;
    _id: string
  }
}

const Comments = ({ comment, isPostingComment, comments, addComment, setComment }: IProps) => {
  const { userProfile } = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length ? (
          <div>videos</div>
        ) : (
          <NoResults text='No comments yet' />
        )}
      </div>
      {userProfile ? (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form onSubmit={addComment} className='flex gap-4'>
            <input
              value={comment}
              type='text'
              placeholder='Add comment...'
              className='bg-primary px-6 py-4 text-md font-md border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 rounded-lg focus:outline-none focus:border-2 focus:border-gray-300 transition'
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className='text-md text-gray-400'
              onClick={addComment}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      ) : ''}
    </div>
  )
}

export default Comments
