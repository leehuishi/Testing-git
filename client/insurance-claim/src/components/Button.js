import PropTypes from 'prop-types'

const Button = ({ color, text, onClick2 }) => {

    return (
        <button 
            onClick={onClick2} 
            style={{backgroundColor: color }} className='btn'
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

//the caps here for propTypes need to take note
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
} 

export default Button
