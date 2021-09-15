
import { Fragment, useEffect, useState } from 'react'
import BackDrop from '../../UI/BackDrop/BackDrop'
import Spinner from '../../UI/Spinner/Spinner'
import ScrollableContainer from '../ScrollableContainer/ScrollableContainer'
import './Stream.css'
export default function Stream(props){
    useEffect(()=>{
        const fetchedData=[]
        const  fetchSongs = async ()=>{
            
            for(let searchQuery of songsData.searchQuery)
            {
                let tempSearchQuery= encodeURIComponent(searchQuery);
                let call =await fetch("https://jiosaavn-api.vercel.app/search?query="+tempSearchQuery)
                let response =await call.json();
                fetchedData.push(response);
            }
            let tempSongsData=[];
            for(let i=0;i<fetchedData.length;i++)
            {
                tempSongsData.push({data:fetchedData[i],heading:songsData.data[i].heading});
            }
            setSongsData({
                ...songsData,
                data:tempSongsData
            })
            setStreamState({
                fetchingData:false
            })
        }
        fetchSongs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const [streamState,setStreamState]=useState({
        fetchingData:true,
    })
    const [songsData,setSongsData]=useState({
        data:[
            { heading:"Top Hindi Tracks",data:null,},
            { heading:"Top English Tracks",data:null,},
            { heading:"Top Punjabi Tracks",data:null,},
            { heading:"Top Haryanvi Picks",data:null,},
            { heading:"Arijit Singh",data:null,},
            { heading:"Atif Aslam",data:null,},
            { heading:"Papon",data:null,},
            { heading:"Mohit Chauhan",data:null,},
            { heading:"Top Tracks of 2015",data:null,},
            { heading:"Top Tracks of 2010",data:null,},
            { heading:"Reliving the Old Days",data:null,},
        ],
        searchQuery:[
            "hindi","english","punjabi","haryanvi","arijit","atif","papon","mohit","2015","2010","old"
        ],
    })
    if(streamState.fetchingData)
    {
        return (
            <Fragment>
                <BackDrop/>
                <Spinner/>
            </Fragment>
        )
    }
    return(
        <div className="Stream">
            {
                songsData.data.map((songsDetails)=>{
                    return <ScrollableContainer heading={songsDetails.heading} name="Songs" fetchedData={songsDetails.data} changeSong={props.changeSong} key={songsDetails.heading}/>
                })
            }
        </div>
    )
}