import { useState } from 'react'
import { withRouter } from 'react-router'
import './AlbumBox.css'
function AlbumBox(props)
{
    const [albumBoxState,setAlbumBoxState]=useState({
        hovered:false
    }) 
    function redirectTo(id)
    {
        props.history.push({
            pathname:"/player/stream/album",
            search:"?id="+id
        })
    }
    function toggleHover(e){
        setAlbumBoxState({
            ...albumBoxState,
            hovered:e.type==="mousemove"?true:false
        })
    }
    return(
        <div className="AlbumBox" onClick={redirectTo.bind(this,props.album.id)}>
            <div className="AlbumBox-image-wrapper">
             <img src={props.album.image} alt="album" loading="lazy" onMouseMove={toggleHover} onMouseOut={toggleHover}/>
             <div className="hoverPlayBtn" onMouseMove={toggleHover} onMouseOut={toggleHover} style={albumBoxState.hovered?{display:"block"}:{display:"none"}} ><span>▶</span></div>
            </div>
            <p><strong>{props.album.title}</strong></p>
        </div>
    )
}
export default withRouter(AlbumBox);