import './SongDetails.css'

export default function SongDetails(props)
{
    if(props.currentlyPlayingAudio===null){
        if(window.innerWidth>550){
            return <div className="SongDetails"></div>;
        }
        else{
            return null;
        }
    }
    return(
        <div className="SongDetails">
            <div className="SongDetailsImage" >
            <img src={props.currentlyPlayingAudio.image} className={props.playing?"rotate":""} alt="detailsImage"/>
            </div>
            <div className="SongDetails-details">
                <p><strong>{props.currentlyPlayingAudio.song}</strong></p>
                <p>{props.currentlyPlayingAudio.album}</p>
            </div>
        </div>
    )
}