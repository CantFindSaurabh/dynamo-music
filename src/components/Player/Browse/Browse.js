import './Browse.css'
import SearchIcon from '../../../assets/images/SearchIcon.png'
import { Fragment, useEffect, useRef, useState } from 'react'
import BackDrop from '../../UI/BackDrop/BackDrop';
import Spinner from '../../UI/Spinner/Spinner';
import ScrollableContainer from '../ScrollableContainer/ScrollableContainer';

function Browse(props)
{
    useEffect(()=>{
        if(browseState.fetchingData)
        {
            let searchValue=encodeURIComponent(searchInputRef.current.value);
            let fetchedSongs,fetchedAlbums
            fetch("https://jiosaavn-api.vercel.app/search?query="+searchValue)
            .then(response=>response.json())
            .then(data=>{
                fetchedSongs=data;
                return fetch("https://jiosaavn-api.vercel.app/albumsearch?query="+searchValue)
                .then(response=>response.json())
                .then(data=>{
                    fetchedAlbums=data;
                })
                .then(()=>{
                    setBrowseState({
                        ...browseState,
                        fetchingData:false,
                        songs:fetchedSongs,
                        albums:fetchedAlbums
                    })
                })
            })
        }
    })

    const [browseState,setBrowseState]=useState({
        fetchingData:false,
        songs:null,
        albums:null
    })
    const searchInputRef=useRef();
    function searchData(e)
    {
        if(e.target.value==="search"||e.keyCode===13)
        {
            setBrowseState({
                ...browseState,
                fetchingData:true
            })
        }
    }
    return(
        <div className="Browse">
            <div className="Search">
                <div className="SearchIcon"><img src={SearchIcon} alt="search-icon" onClick={searchData} value="search"/></div>
                <input type="text"  ref={searchInputRef} onKeyDown={searchData}/>
            </div>
            {
            browseState.fetchingData?<Fragment><BackDrop/><Spinner/></Fragment>:
            null   
            }
            {
                browseState.songs===null?null:
                <Fragment>
                <ScrollableContainer heading="Songs" name="Songs" fetchedData={browseState.songs} changeSong={props.changeSong}/>
                <ScrollableContainer heading="Albums" name="Albums" fetchedData={browseState.albums}/>
                </Fragment>
            }

        </div>
    )
}
export default Browse;