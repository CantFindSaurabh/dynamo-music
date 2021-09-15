import { useEffect, useRef } from 'react';
import './Cockpit.css'
import SongDetails from './SongDetails/SongDetails';
function Cockpit(props) {
    const audioRef = useRef();
    const progressBarLineRef=useRef();
    useEffect(() => {
        if (props.currentlyPlayingAudio != null) {
            if (props.playing) {
                audioRef.current.play();
            }
            else {
                audioRef.current.pause();
            }
        }
    })
    useEffect(()=>{
        const reloadProgressBar = setInterval(()=>{  
            if(props.currentlyPlayingAudio===null){
                return;
            }
            if(audioRef.current.currentTime===audioRef.current.duration)
            {
                props.toggleAudio();
            }
            let progressBarLineCurrentWidth= audioRef.current.currentTime/audioRef.current.duration*100;
            progressBarLineRef.current.style.width=progressBarLineCurrentWidth+"%";
        },180)
        return ()=>{
            clearInterval(reloadProgressBar);
        }
    })
    let isMouseDown=false;
    function changeTime(e)
    {
        audioRef.current.currentTime+=Number(e.target.value);
    }
    function seekProgressBar(e)
    {
        if((isMouseDown||e.type==="click")&&props.playing)
        {
            let percentage= Math.ceil(e.clientX*100 /window.innerWidth);
            audioRef.current.currentTime= Math.ceil(percentage*audioRef.current.duration/100);
        }
    }
    function changeVolume(e){
        if(isMouseDown||e.type==="click"||e.type==="change"){
            audioRef.current.volume=e.target.value;
        }
    }
    return (
        <div className="Cockpit" onMouseDown={()=>{ isMouseDown=true}} onMouseUp={()=>{ isMouseDown=false}}>
            <div className="ProgressBar" onMouseLeave={()=>{isMouseDown=false}}  onClick={seekProgressBar}  onMouseMove={seekProgressBar}><div className="ProgressBar-line" ref={progressBarLineRef} ></div></div>
            <div className="Footer">
                <SongDetails currentlyPlayingAudio={props.currentlyPlayingAudio} playing={props.playing}/>
                {props.currentlyPlayingAudio === null ? null : <audio ref={audioRef} src={props.currentlyPlayingAudio.media_url}  />}
                    
                    <div className="Controls-middle">
                    <div>
                    <button value="-10" disabled={!props.playing} className="timeChangingBtn" onClick={changeTime}>↺</button>
                    <button className="playPauseBtn" disabled={props.currentlyPlayingAudio===null} onClick={props.toggleAudio}>{props.playing ? "❚❚" : "▶"}</button>
                    <button value="10" className="timeChangingBtn" disabled={!props.playing} onClick={changeTime}>↻</button>
                    </div>
                    <input type="range" min="0.0" max="1.0"step="0.1" onChange={changeVolume} onMouseMove={changeVolume} onClick={changeVolume} disabled={props.currentlyPlayingAudio===null}/>
                    </div>
                    <div className="tempDiv" >&nbsp;</div>
            </div>
        </div>
    )
}
export default Cockpit;