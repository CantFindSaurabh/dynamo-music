import { Fragment, useState } from "react";
import NavBar from "./NavBar/NavBar";
import SideBar from "./SideBar/SideBar";

function Layout(props)
{
    const [layoutState,setLayoutState]=useState({
        sideBarVisible:false
    })

    function openSideBar()
    {
        setLayoutState({
            ...layoutState,
            sideBarVisible:true
        })
    }
    function closeSideBar()
    {
        setLayoutState({
            ...layoutState,
            sideBarVisible:false
        })
    }

    return(
        <Fragment>
            <NavBar openSideBar={openSideBar} />
            {props.children}
            <SideBar visible={layoutState.sideBarVisible} openSideBar={openSideBar} closeSideBar={closeSideBar}/>
        </Fragment>
    )
}
export default Layout