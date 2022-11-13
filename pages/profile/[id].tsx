import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';

interface IProps {
    data: {
        user: IUser;
        userVideos: Video[];
        userLikedVideos: Video[]
    }
}

const Profile = ({ data }: IProps) => {
    return <div>
        Profile
    </div>
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);

    return {
        props: {
            data: res.data
        }
    }
}

export default Profile
