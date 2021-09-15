import { Fragment, useEffect, useState } from 'react'
import BackDrop from '../../UI/BackDrop/BackDrop';
import Spinner from '../../UI/Spinner/Spinner';
import './AlbumDetails.css'
import SongList from './SongList/SongList';
export default function AlbumDetails(props)
{
    useEffect(()=>{
        const albumId=props.location.search;
        fetch("https://jiosaavn-api.vercel.app/album"+albumId)
        .then(response=>response.json())
        .then(data=>{
            setAlbumState({
                ...albumState,
                fetchingData:false,
                details:data
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const [albumState,setAlbumState] =useState({
        fetchingData:true,
        details:null
    })
    if(albumState.fetchingData)
    {
        return(<Fragment><BackDrop/><Spinner/></Fragment>);
    }
    return(
        <div className="AlbumDetails">
            <div className="AlbumDetailsLeft">
                <div className="AlbumDetails-image">
                <img src={albumState.details.image} alt="cover"/>
                </div>
                <p><strong>{albumState.details.title}</strong></p>
                <p>{albumState.details.primary_artists}</p>
                <p>{albumState.details.year}</p>
            </div>
            <div className="AlbumDetailsRight">
                <table className="SongTable">
                    <tbody>
                    {
                        albumState.details.songs.map((song,index)=>{
                            return <SongList song={song} serial={index+1} changeSong={props.changeSong} key={"songList "+song.id}/>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}