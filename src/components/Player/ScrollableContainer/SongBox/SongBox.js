import { useState } from "react"

// css of SongBox is in AlbumBox
export default function SongBox(props)
{
    const [songBoxState,setSongBoxState]=useState({
        hovered:false
    }) 
    function toggleHover(e){
        setSongBoxState({
            ...songBoxState,
            hovered:e.type==="mousemove"?true:false
        })
    }
    return(
        <div className="SongBox" onClick={props.changeSong.bind(this,props.song.id)}>
            <div className="SongBox-image-wrapper" >
            <img src={props.song.image} alt="song-cover" loading="lazy" onMouseMove={toggleHover} onMouseOut={toggleHover}/>
            <div className="hoverPlayBtn" onMouseMove={toggleHover} onMouseOut={toggleHover} style={songBoxState.hovered?{display:"block"}:{display:"none"}} ><span>▶</span></div>
            </div>
            <p><strong>{props.song.title}</strong></p>
        </div>
    )
}