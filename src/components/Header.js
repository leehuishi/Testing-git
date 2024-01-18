import PropTypes from 'prop-types'
import Button from './Button'
import { useNavigate } from "react-router-dom";

const Header = ({title, titlealign}) => {

    const navigate = useNavigate();
    
    //=========================================================
    // Logout
    //=========================================================
    const Logout = () => {
        sessionStorage.clear();
        navigate('/');
    };
    //=========================================================

    return (
        <>
        {(sessionStorage.emp_id) ? (
            <header className='header' style={{justifyContent: titlealign}}>
                <h1>{title}</h1>
                <Button color='red' text='Logout' onClick2={Logout} />
            </header>) 
            : (
                <header className='flex flex-col space-y-4 text-center mb-6 mt-6 text-2xl' style={{justifyContent: titlealign}}>
                    <h1>{title}</h1>
                </header>
            )}
        </>
    )
}

Header.defaultProps = {
    title: 'Claim System',
    titlealign: 'space-between',
    logout_func: ''
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  titlealign: PropTypes.string
}

export default Header
