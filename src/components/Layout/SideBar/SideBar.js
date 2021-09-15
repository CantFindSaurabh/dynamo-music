import './SideBar.css'
import NavigationList from "../NavigationList/NavigationList";
import BackDrop from '../../UI/BackDrop/BackDrop'
import { Fragment } from 'react';
import Logo from '../../UI/Logo/Logo';


function SideBar(props)
{
    const sideBarCloseStyle={
        transform: "translateX(150%)"
    }
    const sideBarOpenStyle={
        transform: "translateX(0%)"
    }
    return(
        <Fragment>
            {
                props.visible?
                <BackDrop closeSideBar={props.closeSideBar}/>:
                null
            }
        <div className="SideBar" style={props.visible?sideBarOpenStyle:sideBarCloseStyle}>
            <Logo/>
            <NavigationList closeSideBar={props.closeSideBar}/>
        </div>
        </Fragment>
    )
}
export default SideBar;