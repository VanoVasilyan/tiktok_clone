export interface Video {
    caption: string;
    comments: {
        comment: string;
        _key: string;
        postedBy: {
            image: string;
            userName: string;
            _id: string
        }
    }[];
    likes: {
        _key: string;
        _ref: string;
        _type: string
    }[];
    postedBy: {
        image: string;
        userName: string;
        _id: string
    };
    userId: string;
    video: {
        asset: {
            url: string;
            _id: string
        }
    };
    _id: string
};

export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    image: string;
};
