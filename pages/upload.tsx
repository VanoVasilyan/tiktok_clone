import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { topics } from '../utils/constants';

const Upload = () => {
    const router = useRouter();
    const [isLoading, setIsloading] = useState<Boolean>(false);
    const [wrongFileType, setWrongFileType] = useState<Boolean>(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [uploadVideoState, setUploadVideoState] = useState<{ caption: string; category: string; savingPost: boolean }>({
        caption: '',
        category: topics[0].name,
        savingPost: false
    });
    const userProfile: any = useAuthStore((state) => state.userProfile);

    useEffect(() => {
        if (!userProfile) router.push('/');
    }, [userProfile, router]);

    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        if (fileTypes.includes(selectedFile.type)) {
            setIsloading(true)
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            }).then((data) => {
                setVideoAsset(data);
                setIsloading(false)
            })
        } else {
            setIsloading(false);
            setWrongFileType(true);
        }
    }

    const handlePost = async () => {
        if (uploadVideoState.caption && videoAsset?._id && uploadVideoState.category) {
            setUploadVideoState({ ...uploadVideoState, savingPost: true });
            const document = {
                _type: 'post',
                caption: uploadVideoState.caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id,
                },
                topic: uploadVideoState.category
            }

            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, document);
            router.push('/');
        }
    }

    const discardChanges = () => {
        setUploadVideoState({
            caption: '',
            category: topics[0].name,
            savingPost: false
        });
        setVideoAsset(undefined)
    }

    return (
        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
            <div className='bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap w-[60%] justify-between items-center p-14 pt-6'>
                <div>
                    <div>
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                    </div>
                    <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
                        {isLoading ? (
                            <p>Uploading...</p>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                        <video
                                            src={videoAsset.url}
                                            loop
                                            controls
                                            className='rounded-xl h-[420px] bg-black'
                                        ></video>
                                    </div>
                                ) : (
                                    <label className='cursor-pointer'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <p className='font-bold text-xl'>
                                                    <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                                                </p>
                                                <p className='text-xl font-semibold'>
                                                    Upload Video
                                                </p>
                                            </div>
                                            <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                                MP4 or WebM or Ogg <br />
                                                720x1280 or higher <br />
                                                Up to 10 minutes <br />
                                                Less than 2GB
                                            </p>
                                            <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                                Select File
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            name='upload-video'
                                            className='w-0 h-0'
                                            onChange={uploadVideo}
                                            hidden
                                        />
                                    </label>
                                )}
                            </div>
                        )}
                        {wrongFileType ? <p className='text-center text-xl text-red-400 font-semibold m-4 w-[250px]'>Please select a video file</p> : ''}
                    </div>
                </div>
                <div className='flex flex-col gap-3 pb-10'>
                    <label htmlFor='captionInput' className='text-md font-medium'>Caption</label>
                    <input
                        id='captionInput'
                        type='text'
                        value={uploadVideoState.caption}
                        className='rounded outline-none text-md border-2 border-gray-200 p-2'
                        onChange={(e) => setUploadVideoState({ ...uploadVideoState, caption: e.target.value })}
                    />
                    <label htmlFor="select" className='text-md font-medium'>Choose a Category</label>
                    <select
                        id='select'
                        value={uploadVideoState.category}
                        onChange={(e) => setUploadVideoState({ ...uploadVideoState, category: e.target.value })}
                        className='outline-none border-2 border-gray-200 text-md capitalize rounded lg:p-3 p-2 cursor-pointer'
                    >
                        {topics.map(topic => {
                            return <option key={topic.name} value={topic.name} className='outline-none bg-white text-gray-700 text-md p-2 hover:bg-slate-300'>
                                {topic.name}
                            </option>
                        })}
                    </select>
                    <div className='flex gap-6 mt-10'>
                        <button
                            type='button'
                            className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                            onClick={discardChanges}
                        >
                            Discard
                        </button>
                        <button
                            type='button'
                            className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                            onClick={handlePost}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload
