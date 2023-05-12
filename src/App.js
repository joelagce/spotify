import {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';
import Playlist from "./pages/playlist";
import foto from "./luismiguel.jpg"
import empty from "./empty.png"
import Modal from "./components/Modal/Modal";

function App() {
    const CLIENT_ID = "429a10046e63457c9200ea1c778d3abf"
    const REDIRECT_URI = "https://spotify-seven-sooty.vercel.app/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    
    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    useEffect(() => {
  
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
        if (token) {
            window.location.reload();
        }
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })

        setArtists(data.artists.items)
    }

    const renderArtists = () => {
        return artists.map(artist => (
           
          
           
            <div className="artistacard" key={artist.id}>
            
            
         
      <div style={{display:"flex",alignItems:"center",margin:"5px"}}>
      <div>{artist.images.length ? <img src={artist.images[0].url} alt="" /> : <img src={foto}></img>}</div>
    
    <div className="title">
      <div>{artist.name}</div>
      <div >{artist.genres.join(", ")}</div>
      </div>
      </div>
      <td>{artist.popularity}</td>
 

          </div>
           
        ))
    }
    const [isModalOpen1, setIsModalOpen1] = useState(true);

    
  
    function closeModal1() {
      setIsModalOpen1(false);
    }

    return (
        <div className="App">
           
            <div className="pages">
            <Playlist/>
            
            
            <div className="resultados">
                
              
                <header className="App-header">
              
                
                {!token ?

                    <Modal  isOpen={isModalOpen1} title="No has iniciado sesion" onClose={closeModal1} showCloseButton={false} >
                        <div className="modal">
                     <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Iniciar sesion en spotify</a>
                     </div>
                    </Modal>
                   
                    : <button className="logout" onClick={logout}>Cerrar sesion</button>}

                {token ?
                    <form onSubmit={searchArtists}>
                        <input placeholder="Ingresa a un artista...." type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"}>Search</button>
                    </form>

                    : <h2>Porfavor inicia sesion</h2>
                }



            </header> 
            <div className="artist">
            {renderArtists().length > 0 ? (
  renderArtists()
) : (
    <div className="emptys">
  <img style={{width:"150px"}} src={empty} alt="No results found" />
  <h1 >No se a econtrado nada</h1>
  <p>No existe Ningun resultado con este valor, vuelve a intentarlo</p>
  </div>
  
)}
             </div>
                </div>

                </div>
              
        </div>
    );
}

export default App;