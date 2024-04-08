import '../../../styles/Comments.scss';

import CommentItem from "./CommentItem";

const DUMMY_COMMENTS = [
    {id: 1,
     name: 'Ursula Le Guin',
     userPP: 'https://img.kitapyurdu.com/v1/getImage/fn:5329028/wi:200/wh:a12411141',
     comment: 'From that time forth he believed that the wise man is one who never sets himself apart from other living things, whether they have speech or not, and in later years he strove long to learn what can be learned, in silence, from the eyes of animals, the flight of birds, the great slow gestures of trees.'
    },
    {id: 2,
    name: 'Morel Mackernasey',
    userPP: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQv32zp_GbhJEkrpQkotDesieLwPU3vYLExssmqEpUXQ&s',
    comment: 'Calculating the odds of winning in Nen combat just shows how you\'re missing the point. You never know what your adversary\'s ability is. A slight hesitation can cause a fatal turnabout. The outcome is always a fluctuation. Having more or less aura isn\'t much of an excuse. That\'s the essence of Nen combat!',
    },

];

function Comments() {
    return  (
        <div className='Comments'>
            <ul>
                {DUMMY_COMMENTS.map(comment => (<li key={comment.id}>
                    <CommentItem
                        name={comment.name}
                        pp={comment.userPP}
                        comment={comment.comment}/>
                </li>))}
            </ul>
        </div>
    )
}

export default Comments