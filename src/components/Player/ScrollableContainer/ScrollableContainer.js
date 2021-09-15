import AlbumBox from './AlbumBox/AlbumBox';
import './ScrollableContainer.css';
import SongBox from './SongBox/SongBox';

export default function ScrollableContainer(props){

    let content;
    if(props.name==="Songs")
    {
        if(props.fetchedData.result==="false"){
            content= <h4 style={{color:"gray",textAlign:"center",flex:1}}>Nothing Found</h4>
        }
        else{
            
            content = props.fetchedData.map((song)=>{
                return <SongBox song={song} key={song.id} changeSong={props.changeSong}/>
            })
        }
    }
    else{
        if(props.fetchedData.result==="false"){
            content= <h4 style={{color:"gray",textAlign:"center",flex:1}}>Nothing Found</h4>
        }
        else{
            content=props.fetchedData.map((album)=>{
                return <AlbumBox album={album} key={album.id}/>
            })
        }
    }
    return(
        <div className="ScrollableContainer">
            <p>{props.heading}</p>
            <div className="Footer">
                {
                    content
                }
            </div>
        </div>
    )
}