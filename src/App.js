import React, { useEffect } from 'react';
import songs from "./songs.json"
import singers from "./singers.json"
import autoComplete from "@tarekraafat/autocomplete.js";


function App() {

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
            autoCompleteSingers.input.value = selection;
          }
        }
      }
    });
  }, [])


  return (
    <div className='w3-content w3-panel w3-center'>
      <div className='w3-row'>
        <div className='w3-half'>
          <div className="autoComplete_wrapper">
            <input id="autocomplete-songs" type="search" dir="ltr" spellCheck={false} autoCorrect="off" autoComplete="off" autoCapitalize="off" />
          </div>
        </div>
        <div className='w3-half'>
          <div className="autoComplete_wrapper">
            <input id="autocomplete-singers" type="search" dir="ltr" spellCheck={false} autoCorrect="off" autoComplete="off" autoCapitalize="off" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
