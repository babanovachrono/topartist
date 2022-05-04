import React from 'react'


function SongRow(props) {
    return (
        <div className="songRow">
            <img className="songRow__album" src={props.url} alt="" />
            <div className="songRow__info">
                <h1>{props.name}</h1>
                <p>
                    {props.artists.map((artist)=> artist.name).join(", ")} -{" "}{props.albumname}
                </p>
            </div>
        </div>
    )
}

export default SongRow