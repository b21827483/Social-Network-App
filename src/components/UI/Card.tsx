import '../../../styles/Card.scss'

function Card(props) {
    return <div className='Card'>
        {props.children}
    </div>
}

export default Card