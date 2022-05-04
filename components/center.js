import { useSession, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import useSpotify from '../hooks/useSpotify'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SongRow from './songrow';
import startDatabase from '../lib/firebase';
import LogoutIcon from '@mui/icons-material/Logout';


import {getDatabase, get, ref,set,child,update,remove, onValue} from "firebase/database"
function Center() {
   const[userdetail,setUserDetail] = useState("")
    const spotifyApi = useSpotify()
    const{data: session,status}= useSession()
    let imageCool = session?.user.image
    const[topTracks,setTopTracks]=useState([])
    const[topArtists,setTopArtists]=useState([])
    const[track,setTrack]=useState([])
  



   const db= startDatabase()
     
   

        useEffect(
            ()=>{
                if(spotifyApi.getAccessToken()){
                    
                    spotifyApi.getMyTopTracks().then((data)=>{
                        setTopTracks(data.body.items)
                    })
                }
            },[session, spotifyApi]);
            
        useEffect(
            ()=>{
                if(spotifyApi.getAccessToken()){
                    
                    spotifyApi.getMyTopArtists().then((data)=>{
                        setTopArtists(data.body.items)
                    })
                }
            },[session, spotifyApi]);
            useEffect(
                ()=>{
                    if(spotifyApi.getAccessToken()){
                        
                        spotifyApi.getTrack("49KTdYsWNtkvOslTpgZuM1","AD").then((data)=>{
                            setTrack(data.body )
                        })
                    }
                },[session, spotifyApi]);
        
            const songsComponent= topTracks.map(function(realdata){
                return(
                  <SongRow key={realdata.id} name={realdata.name} artists={realdata.artists} albumname={realdata.album.name} url={realdata.album.images[0].url}/>
                )});
                function InsertData(){
                    if(session){
                  set(ref(db, "users/"+session?.user.username),{
                      userID:session?.user.username,
                      username:session?.user.name,
                      topsongdetails:topTracks,
                      topartists:topArtists
                   

                  })
                
                }
                }
    
   console.log(topTracks)
   console.log(session?.user.image)
   console.log(track)
   //usersRef.set(topTracks)
  function addStuffToDb(){
    onValue(ref(db, "users/"+session?.user.username),snapshot=>{
        const userData = snapshot.val()
        if(userData !== null){
           
            console.log("thedata is there")
        }
        else{
            InsertData()
        }
        
    })
   
  }
 
   
  
    addStuffToDb()

  return (
      <div className='centerbody'>
            <div className="body__info">
                <img src={imageCool? imageCool:"https://i.imgur.com/Uhdeb6V.png"}  />
                <div className="body__infoText">
                    <h1>{session?.user.name}</h1>
                    <h2>Personal Top Songs</h2>
                   
                    
             
                </div>
            </div>
 
            <div className="body__songs">
                <div className="body__icons">
                   <LibraryMusicIcon className="body__shuffle" />
                    <FavoriteIcon fontSize="large" />
                    <LogoutIcon fontSize='large' onClick={signOut}/>
                
                    
                 
                </div>
             
 
         
                {songsComponent}
         </div>
        
    </div>
   
  )
}

export default Center
