import './HamBurgerIcon.css'
function HamBurgerIcon(props)
{
    return (
        <div className="HamBurgerIcon" onClick={props.openSideBar}>
            <div/>
            <div/>
            <div/>
        </div>
    )
}
export default HamBurgerIcon;