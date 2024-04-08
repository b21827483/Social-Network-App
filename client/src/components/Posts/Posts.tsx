import '../../../styles/Posts.scss';
import PostItem from './PostItem';

const posts = [{
        id: 1,
        name: 'Shadow',
        userId: 1,
        desc: 'Were you a jedi? No, no, but I was once a force wielder. So you were a sith. I was apprentice to the most powerful being in the galaxy.',
        img: 'https://lumiere-a.akamaihd.net/v1/images/image_c0d20b99.jpeg?region=158,0,1244,700&width=1200'
    },
    {
        id: 2,
        name: 'Maul',
        userId: 2,
        desc: 'I was destined to become so much more. Once I had power, now I have nothing.',
        img: null
    }
]

function Posts() {
    return <div className='Posts'>
        {posts.map(post => (<PostItem key={post.id} name={post.name} desc={post.desc} img={post.img} />))}
    </div>
}

export default Posts