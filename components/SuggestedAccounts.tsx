import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers()
  }, [fetchAllUsers])

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>

    </div>
  )
}

export default SuggestedAccounts
