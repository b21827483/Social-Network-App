import moment from 'moment';

import '../../../styles/CommentItem.scss';

function CommentItem({comment, name, pp, createdAt}) {
    return (
        <div className='SingleComment'>
            <div className='user-info'>
                <img src={`http://localhost:8800/images/${pp}`} alt={name}/>
                <span>{name}</span>
                <span>&#8226;</span>
                <span>{moment(createdAt, "MMMM Do YYYY, hh:mm:ss").fromNow()}</span>
            </div>
            <p>{comment}</p>
        </div>
    )
}

export default CommentItem