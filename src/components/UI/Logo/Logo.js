import { Link} from 'react-router-dom';
import logo from '../../../assets/images/logo.png'
import './Logo.css'
function Logo()
{
    return(
        
        <div className="Logo">
            <Link to="/player/stream">
            <img src={logo} alt="Logo"/>
            </Link>
        </div>
    )
}
export default Logo;