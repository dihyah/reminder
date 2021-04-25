import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return ( 
        <header className='header'>
            <h1>{ title }</h1>
        {location.pathname === '/' && (
            <Button 
            color={showAdd ? 'purple' : 'green'}
            text={showAdd ? "Hide" : "Add Task"} 
            onClick={onAdd}
            />
        )}
        </header>
    )
}

Header.defaultProps = {
    title: 'Reminder',
}

Header.propTyeps = {
    title: PropTypes.string.isRequired,
}

//const headingStyle = {
//    color: 'red',
//    backgroundColor: 'black',
//}

export default Header
