import './NavigationList.css'
import { NavLink } from "react-router-dom";
import { auth } from '../../../config/firebase-config'


function NavigationList(props)
{
    function logOut(){
        auth.signOut();
    }
    return(
        <div className="NavigationList" onClick={props.closeSideBar}>
            <NavLink to="/player/stream"  activeClassName="NavigationList-active">Stream</NavLink>
            <NavLink to="/player/browse" exact activeClassName="NavigationList-active">Browse</NavLink>
            <button onClick={logOut}>Sign Out</button>
        </div>
    )
}
export default NavigationList;