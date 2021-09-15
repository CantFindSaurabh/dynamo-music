import './NavBar.css'

import Logo from '../../UI/Logo/Logo'
import NavigationList from '../NavigationList/NavigationList'
import HamBurgerIcon from '../../UI/Logo/HamBurgerIcon/HamBurgerIcon'

function NavBar(props)
{
    return(
        <div className="NavBar">
            <Logo/>
            {
                window.innerWidth<=550?
                <HamBurgerIcon openSideBar={props.openSideBar}/>
                :
                <NavigationList signOut={props.signOut}/>
            }
        </div>
    )
}
export default NavBar;