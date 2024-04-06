import '../../../styles/StoryItem.scss';

function StoryItem({name, image}) {
    return (
        <div className='StoryItem'>
            <img src={image} alt={"story"}/>
        </div>
    )
}

export default StoryItem