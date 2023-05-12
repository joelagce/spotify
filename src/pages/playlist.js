import { useState, useEffect } from 'react';
import axios from 'axios';
import "./playlist.css"
import verifidated from "../verified.png"

function Playlist(props) {
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    async function fetchPlaylist() {
        let token = window.localStorage.getItem("token")

      try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/37i9dQZF1DWSXkKR3NnPZR/tracks`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setPlaylistTracks(response.data.items);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPlaylist();
  }, [props.playlistId, props.token]);

  // Renderiza la lista de canciones
  return (
    <div className='playlist'>

      
      
      <div className='cards'>
      <div className='container'>
  <div className="titles">
    <p className="verified"><img src={verifidated}></img>Artista verificado</p>
    <h2 className="main-title">Luis Miguel</h2>
    <p className="subtitle">México</p>
  </div>
</div>  
      <table>
            <thead>
                <td>#</td>
                <td></td>
                <td>Nombre</td>
                <td>artista</td>
                <td>reproducciones</td>
                <td>duracion</td>
            </thead>
        {playlistTracks.map((track) => (
         
         <tbody>
           <tr>
           <td>0</td>
             <td><img src={track.track.album.images[0].url} alt={track.track.name} /></td>
             <td>{track.track.name}</td>
             <td>{track.track.artists[0].name}</td>
             <td>{track.track.popularity} reproducciones</td>
             <td> {Math.floor(track.track.duration_ms / 1000)} seg</td>
              
           </tr>
         </tbody>
      
        ))}
         </table>
      </div>
    </div>
  );
}

export default Playlist;
