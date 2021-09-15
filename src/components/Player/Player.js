import './Player.css';

import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Cockpit from './Cockpit/Cockpit';
import BackDrop from '../UI/BackDrop/BackDrop';
import Spinner from '../UI/Spinner/Spinner';

const Stream =lazy(()=>import("./Stream/Stream"));
const Browse =lazy(()=>import("./Browse/Browse"));
const AlbumDetails =lazy(()=>import("./AlbumDetails/AlbumDetails"));


function Player()
{
    const [playerState,setPlayerState] =useState({
        currentlyPlayingAudio:null,
        playThisSong:null,
        playing:false,
        fetchingSong:false
    })


    useEffect(()=>{
        if(playerState.playThisSong!==null)
        {
        fetch("https://jiosaavn-api.vercel.app/song?id="+playerState.playThisSong)
        .then(response=>response.json())
        .then(data=>{
            setPlayerState({
                ...playerState,
                playing:true,
                currentlyPlayingAudio:data,
                fetchingSong:false
            })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[playerState.playThisSong])

    function toggleAudio()
    {
        setPlayerState({
            ...playerState,
            playing:!playerState.playing
        })
    }

    function changeSong(id)
    {
        if(playerState.currentlyPlayingAudio!=null&&id===playerState.currentlyPlayingAudio.id)
        {
            setPlayerState({
                ...playerState,
                playing:true
            })
        }
        else{  
        setPlayerState({
            ...playerState,
            playThisSong:id,
            fetchingSong:true
        })
        }
    }
    
    return(
        <div className="Player">
            {
                playerState.fetchingSong?
                <Fragment>
                    <BackDrop/>
                    <Spinner/>
                </Fragment>:null
            }

            <Suspense fallback={<Fragment><BackDrop/><Spinner/></Fragment>}>
            <Switch>
            <Route path="/player/stream" exact render={(props)=><Stream changeSong={changeSong} {...props}/>}/>
            <Route path="/player/browse" exact render={(props)=><Browse changeSong={changeSong} {...props}/>} />
            <Route path="/player/stream/album" exact render={(props)=><AlbumDetails changeSong={changeSong} {...props}/>}/>
            <Redirect from="/player" to="/player/stream" exact/>
            </Switch>  
            </Suspense>

            <Cockpit currentlyPlayingAudio={playerState.currentlyPlayingAudio} playing={playerState.playing} toggleAudio={toggleAudio}/>
        </div>
    )
}
export default Player;