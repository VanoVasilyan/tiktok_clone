import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import logo from '../utils/tiktok-logo.png';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>()
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[130px] ms:h-[30px] h-[38px]'>
          <Image
            className='cursor-pointer'
            src={logo}
            alt='tiktok'
            layout='responsive'
          />
        </div>
      </Link>
      <div>Search</div>
      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 rounded'>
                <IoMdAdd className='text-xl' />{` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {user?.image && (
              <Link href='/'>
                <>
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    src={user.image}
                    alt='profile photo'
                  />
                </>
              </Link>
            )}
            <button
              className='px-2'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              type='button'
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response: any) => createOrGetUser(response, addUser)}
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </div>
  )
};

export default Navbar
