import '../../../styles/CommentItem.scss';

function CommentItem({comment, name, pp}) {
    return (
        <div className='SingleComment'>
            <div className='user-info'>
                <img src={pp} alt={name}/>
                <span>{name}</span></div>
            <p>{comment}</p>
        </div>
    )
}

export default CommentItem