import {useEffect, useState} from "react";

import '../../../styles/Stories.scss';

import StoryItem from "./StoryItem";
import image from '../../assets/dummy_story.jpg'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const DUMMY_STORIES = [[
    {id: 1, name: 'George Smith', img: image},
    {id: 2, name: 'Malcolm Malchuk', img: image},
    {id: 3, name: 'Ursula Le Guin', img: image},
    {id: 4, name: 'Oliva Kamana', img: image},],
    [
    {id: 5, name: 'Oliva Kamana', img: image},
    {id: 6, name: 'Oliva Kamana', img: image},
    {id: 7, name: 'Oliva Kamana', img: image},
    {id: 8, name: 'Oliva Kamana', img: image},]
];

function Stories() {

    const [index, setIndex] = useState<Number>(0);

    
    function nextStories() {
        setIndex(prevState => (++prevState));
    }

    function backStories() {
        setIndex(prevState => (prevState === 0 ? prevState : --prevState))
    }

    return (
        <div className='Stories'>
            <ul className='ActiveStories'>
                {DUMMY_STORIES[index].map((story) => ((<li key={story.id}><StoryItem name={story.name} image={story.img} /></li>)))}
            </ul>
            <div className='StoryActions'>
                <button className='BackButton' onClick={backStories}><ArrowBackIosIcon /></button>
                <button className='NextButton' onClick={nextStories}><ArrowForwardIosIcon /></button>
            </div>

        </div>
    )
}

export default Stories