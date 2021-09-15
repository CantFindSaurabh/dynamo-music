import './BackDrop.css'
function BackDrop(props)
{
    return <div className="BackDrop" onClick={props.closeSideBar}></div>
}
export default BackDrop;