import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin } from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

const Sidebar: NextPage = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center cursor-pointer xl:justify-start font-semibold text-[#F51997] rounded';
    const userProfile = false;
    return (
        <div>
            <div
                className='block xl:hidden m-2 ml-4 mt-3 text-xl'
                onClick={() => setShowSidebar(prev => !prev)}
            >
                {showSidebar ? <ImCancelCircle cursor='pointer' /> : <AiOutlineMenu cursor='pointer' />}
            </div>
            {showSidebar ? <div className='xl:w-400 xl:border-0 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 p-3'>
                <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                    <Link href='/'>
                        <div className={normalLink}>
                            <p className='text-2xl'>
                                <AiFillHome />
                            </p>
                            <span className='text-xl hidden xl:block'>
                                For You
                            </span>
                        </div>
                    </Link>
                </div>
                {!userProfile && (
                    <div className='px-2 py-4 hidden xl:block'>
                        <p className='text-gray-400'>Log in to like and comment on videos</p>
                        <div className='pr-4'>
                            <GoogleLogin
                                clientId=''
                                render={(renderProps) => (
                                    <button
                                        className='bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-4 py-2 rounded cursor-pointer outline-none w-full mt-3 hover:text-white hover:bg-[#F51997]'
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        Log In
                                    </button>
                                )}
                                onSuccess={() => { }}
                                onFailure={() => { }}
                                cookiePolicy='single_host_origin'
                            />
                        </div>
                    </div>
                )}
                {/*create Discover componenet and paste here*/}
                {/*create SuggestedAccounts componenet and paste here*/}
                {/*create Footer componenet and paste here*/}
            </div> : ''}
        </div >
    )
};

export default Sidebar
