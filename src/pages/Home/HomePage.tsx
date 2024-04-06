import '../../../styles/Home.scss'
import Stories from "../../components/Stories/Stories";
import Posts from "../../components/Posts/Posts";


function HomePage() {
    return <div className='UserFeed'>
        <div className='HomeStories'>
            <Stories />
        </div>
        <div className='HomePosts'>
            <Posts />
        </div>
    </div>
}

export default HomePage