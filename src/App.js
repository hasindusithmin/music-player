import React, { useEffect, useState } from 'react';
import songs from "./songs.json"
import singers from "./singers.json"
import autoComplete from "@tarekraafat/autocomplete.js";
import Player from './components/Player.js';
import Header from './components/Header';
import turntable from './turntable.gif'
import AutoPlayer from './components/AutoPlayer';
import SingersAlphabet from './components/SingersAlphabet';
import SongsAlphabet from './components/SongsAlphabet';
import { BiHomeAlt } from "react-icons/bi"
function App() {

  const [song, setSong] = useState(null)
  const [singer, setSinger] = useState(null)
  const [songsList, setSongsList] = useState([])
  const [randomSongsList, setRandomSongsList] = useState(() => Array.from({ length: 15 }, () => songs[Math.floor(Math.random() * 100)]))
  const [singerbyletter, setsingerbyletter] = useState(null)
  const [shsingerbyletter, setshsingerbyletter] = useState(true)
  const [songsbysinger, setsongsbysinger] = useState(null)
  const [songsbyletter, setsongsbyletter] = useState(null)
  useEffect(() => {
    const autoCompleteSongs = new autoComplete({
      selector: "#autocomplete-songs",
      placeHolder: "Search for Songs...",
      data: {
        src: songs.map(({ song }) => song),
        cache: true,
      },
      resultsList: {
        element: (list, data) => {
          if (!data.results.length) {
            // Create "No Results" message element
            const message = document.createElement("div");
            // Add class to the created element
            message.setAttribute("class", "no_result");
            // Add message text content
            message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
            // Append message element to the results list
            list.prepend(message);
          }
        },
        noResults: true,
      },
      resultItem: {
        highlight: true
      },
      events: {
        input: {
          selection: (event) => {
            const selection = event.detail.selection.value;
            setSong(selection);
            autoCompleteSongs.input.value = selection;
          }
        }
      }
    });
    const autoCompleteSingers = new autoComplete({
      selector: "#autocomplete-singers",
      placeHolder: "Search for Singers...",
      data: {
        src: singers,
        cache: true,
      },
      resultsList: {
        element: (list, data) => {
          if (!data.results.length) {
            // Create "No Results" message element
            const message = document.createElement("div");
            // Add class to the created element
            message.setAttribute("class", "no_result");
            // Add message text content
            message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
            // Append message element to the results list
            list.prepend(message);
          }
        },
        noResults: true,
      },
      resultItem: {
        highlight: true
      },
      events: {
        input: {
          selection: (event) => {
            const selection = event.detail.selection.value;
            setSinger(selection)
            autoCompleteSingers.input.value = selection;
          },
          focus: (event) => {
            setSinger(null)
          }
        }
      }
    });
  }, [])

  const searchSong = () => {
    const songObj = songs.filter(obj => obj['song'] === song)[0]
    setSongsList([songObj])
  }

  const searchSongsBySinger = async () => {
    try {
      const res = await fetch(`https://songapi.deta.dev/find-songsby-singer/${singer}`)
      const data = await res.json()
      if (data.length === 0) throw Error(`${singer} Not Found`)
      setSongsList(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const showSingers = (char) => {
    fetch(`https://songapi.deta.dev/find-singersby-letter/${char}`)
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(data => { setsingerbyletter(data) })
      .catch(error => {
        console.error(error.message)
      })
  }

  const fetchsongsbysinger = (singer) => {
    fetch(`https://songapi.deta.dev/find-songsby-singer/${singer}`)
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(data => {
        setshsingerbyletter(false)
        setsongsbysinger(data)
      })
      .catch(error => {
        console.error(error.message)
      })
  }

  const showSongs = (char) => {
    fetch(`https://songapi.deta.dev/find-songsby-letter/${char}`)
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(data => {
        setsongsbyletter(data)
      })
      .catch(error => {
        console.error(error.message)
      })
  }


  return (
    <div className='w3-content w3-panel w3-center'>

      <Header />

      {
        !singerbyletter && !songsbyletter &&
        <div id='Home'>
          <img src={turntable} alt="turntable" className='w3-image' />

          <div className='w3-row w3-padding w3-border w3-round-large w3-card w3-margin-bottom w3-animate-zoom'>
            <p className='w3-justify w3-opacity w3-serif w3-large'>
              Welcome to Sinhala Jukebox, the ultimate destination for all your favorite Sinhala songs! Our extensive library of music features a wide range of genres and styles, from upbeat and energetic pop hits to mellow and romantic ballads. No matter what mood you're in, we've got the perfect song for you. Plus, with our easy-to-use interface and convenient download options, it's never been easier to access and enjoy your favorite Sinhala tunes. So why wait? Start listening and downloading today and experience the best in Sinhala music with Sinhala Jukebox!
            </p>
          </div>

          {
            randomSongsList && songsList.length === 0 && <AutoPlayer songsList={randomSongsList} />
          }

          <div className='w3-row w3-padding w3-border w3-round-large w3-card w3-margin-bottom'>
            <h3 className='w3-center w3-opacity'><b>QUICK ACCESS</b></h3>
            <div className='w3-half'>
              <div className="autoComplete_wrapper">
                <input id="autocomplete-songs" type="search" dir="ltr" spellCheck={false} autoCorrect="off" autoComplete="off" autoCapitalize="on" />
                <br />
                <button className='w3-button w3-margin w3-light-grey w3-round-large' onClick={searchSong}>SEARCH A SONG</button>
              </div>
            </div>
            <div className='w3-half'>
              <div className="autoComplete_wrapper">
                <input id="autocomplete-singers" type="search" dir="ltr" spellCheck={false} autoCorrect="off" autoComplete="off" autoCapitalize="on" />
                <br />
                <button className='w3-button w3-margin w3-light-grey w3-round-large' onClick={searchSongsBySinger}>SEARCH A SINGER</button>
              </div>
            </div>
          </div>

          <Player songsList={songsList} date={Date.now()} />

          <SingersAlphabet showSingers={showSingers} />

          <SongsAlphabet showSongs={showSongs} />

        </div>
      }



      {
        shsingerbyletter && singerbyletter &&
        <>
          <div className='w3-center' title='Click here to go home!' onClick={() => { setsingerbyletter(null) }}>
            <BiHomeAlt className='w3-green' size={30} />
          </div>
          <br />
          {
            [...new Set(singerbyletter.map(({ singer }) => singer))].map(singer =>
              <div key={Math.random()} className='w3-row w3-padding w3-border w3-round-large w3-card w3-margin-bottom' onClick={() => { fetchsongsbysinger(singer) }}>{singer}</div>
            )
          }
        </>
      }

      {
        songsbyletter &&
        <>
          <div className='w3-center' title='Click here to go home!' onClick={() => { setsongsbyletter(null) }}>
            <BiHomeAlt className='w3-green' size={30} />
          </div>
          {
            songsbyletter.map(({ song, singer, link }) => (
              <div className='w3-row w3-padding w3-border w3-round-large w3-card w3-margin-bottom' key={Math.random()}>

                <div className="w3-center"><b>{singer}</b></div>

                <h5>{song}</h5>

                <audio controls preload="none" src={link}></audio>

              </div>
            ))
          }
        </>
      }

      {
        songsbysinger &&
        <>
          <h3 className='w3-opacity w3-button w3-round-xlarge w3-light-grey' onClick={() => { setsongsbysinger(null); setshsingerbyletter(true); }}><b>GO BACK</b></h3>
          {
            songsbysinger.map(({ song, singer, link }) => (
              <div className='w3-row w3-padding w3-border w3-round-large w3-card w3-margin-bottom' key={Math.random()}>

                <div className="w3-center"><b>{singer}</b></div>

                <h5>{song}</h5>

                <audio controls preload="none" src={link}></audio>

              </div>
            ))
          }
        </>
      }



    </div>
  );
}

export default App;
