import { FaStar } from 'react-icons/fa';
import Star from '../../../Pieces/Star';
import './DetailCommentSection.scss';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

interface CommentProps {
    id: number;
    username: string;
    avatar: string;
    comment: string;
    star: number;
}

interface PropsType {
    name: string;
    image: string;
    brand: string;
}

const DetailCommentSection: React.FC<PropsType> = ({name, image, brand}) => {
    const [filteredReviews, setFilteredReviews] = useState<CommentProps[]>([])
    const [commentsToShow, setCommentsToShow] = useState<number>(6);

    const comments: CommentProps[] = [
        { id: 1, username: "JohnDoe", avatar: "https://i.pravatar.cc/50?img=1", comment: "Amazing product! The quality is top-notch and I love the fit.", star: 5 },
        { id: 2, username: "JaneSmith", avatar: "https://i.pravatar.cc/50?img=2", comment: "Good, but it could have been better.", star: 4 },
        { id: 3, username: "MikeJohnson", avatar: "https://i.pravatar.cc/50?img=3", comment: "Average quality, nothing special.", star: 3 },
        { id: 4, username: "AliceBrown", avatar: "https://i.pravatar.cc/50?img=4", comment: "I was really excited about this dress, but it didn’t meet my expectations. The fabric felt cheap, and after wearing it just once, it started to unravel at the seams. The fit was off as well, being too tight in some areas and too loose in others. The design was cute, but the overall quality didn’t match up to what I was hoping for. I wouldn't recommend it to others.", star: 2 },
        { id: 5, username: "CharlieWilson", avatar: "https://i.pravatar.cc/50?img=5", comment: "I had a terrible experience with this dress. The color was not at all as expected and the fabric felt incredibly uncomfortable. I thought it would be a nice addition to my wardrobe, but after trying it on, I realized it didn’t fit well at all. The stitching came apart after the first wear, and I had to send it back. I definitely wouldn’t recommend this dress to anyone.", star: 1 },
        { id: 6, username: "EmmaDavis", avatar: "https://i.pravatar.cc/50?img=6", comment: "I will definitely buy it again, very satisfied!", star: 5 },
        { id: 7, username: "LiamTaylor", avatar: "https://i.pravatar.cc/50?img=7", comment: "Decent product, but there are better options.", star: 3 },
        { id: 8, username: "SophiaMartinez", avatar: "https://i.pravatar.cc/50?img=8", comment: "Loved it! Especially the packaging was excellent.", star: 4 }
    ];

    const averageStar = () => {
        const totalStars = comments.reduce((sum, item) => sum + item.star, 0);
        return parseFloat((totalStars / comments.length).toFixed(1));
    }

    const avgStar = averageStar();

    const filterReviews = (star: number) => {
        setFilteredReviews(prev =>
            prev.length > 0 && prev[0].star === star ? [] : comments.filter((comment) => comment.star === star)
        )
    }

    const handleShowMore = () => {
        if(commentsToShow > (comments.length - 1)) {
            setCommentsToShow(6)
        } else {
            setCommentsToShow(commentsToShow + 2);
        }
    }

    console.log(comments.length)
    return (
        <div className='comment-section'>
            <div className="comment-title">
                <div className="left">
                    <div className="title"><span>{brand}</span> {name}</div>
                    <div className="image">
                        <img src={image} alt={name} loading='lazy'/>
                    </div>
                </div>
                <div className="right">
                    <div className='average-star'><Star size={'large'} count={Math.floor(avgStar)}/> {avgStar}</div>
                    <div className="total-stars">
                        {
                            [...Array(5)].map((_, index) => (
                                <div key={index} onClick={() => filterReviews(5 - index)}>
                                    <div className='star-rank'>
                                        <FaStar /> { 5 - index }
                                    </div>
                                    <Star count={5 - index}/>
                                    <div className='review-count'>
                                        ({
                                            comments.filter((comment) => comment.star === (5 - index)).length
                                        })
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="comments">
                {
                    (filteredReviews.length > 0 ? filteredReviews : comments.slice(0, commentsToShow)).map((comment) => (
                        <div className="comment" key={comment.id}>
                            <div className="comment__header">
                                <div className="user-sec">
                                    <div className='avatar'>
                                        <img src={comment.avatar} alt={comment.username} />
                                    </div>
                                    <div className='username'> {comment.username}</div>
                                </div>
                                <div className="star"> <Star count={comment.star}/></div>
                            </div>
                            <div className="comment__body line-clamp__three"> {comment.comment} </div>
                        </div>
                    ))
                }
            </div>
            <div className={`more-less-button ${filteredReviews.length > 0 ? "close" : ""}`} onClick={handleShowMore}>
                {
                    commentsToShow < comments.length ? ( <FaChevronDown /> ) : ( <FaChevronUp /> )
                }
            </div>
        </div>
    )
}

export default DetailCommentSection