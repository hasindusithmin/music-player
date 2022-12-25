
import { useEffect, useState } from "react";
import { GrCaretNext, GrCaretPrevious, GrStop,GrStopFill } from "react-icons/gr";


export default function Player({ songsList, date }) {

    const [index, setIndex] = useState(0)
    const [stoped,setstoped] = useState(false)

    useEffect(() => {
        if (songsList.length > 0) {
            document.querySelector('img').src = `https://via.placeholder.com/200/000000/FFFFFF/?text=${songsList[index]['singer']}`
            document.querySelector('h5').innerText = songsList[index]['song']
            document.querySelector('audio').src = songsList[index]['link']
        }
    }, [songsList.length, date])

    useEffect(() => {
        if (songsList.length > 0) {
            document.querySelector('img').src = `https://via.placeholder.com/200/000000/FFFFFF/?text=${songsList[index]['singer']}`
            document.querySelector('h5').innerText = songsList[index]['song']
            document.querySelector('audio').src = songsList[index]['link']
        }
    }, [index])

    const playPrevious = () => {
        if (index !== 0) setIndex(index - 1)
    }

    const playNext = () => {
        if (index !== (songsList.length - 1)) setIndex(index + 1)
    }

    const OnOff = () => {
        if (!stoped) document.querySelector('audio').pause()
        else document.querySelector('audio').play()
        setstoped(!stoped)
    }   
    

    return (
        <>
            {
                songsList.length > 0
                &&
                <div className='w3-row w3-padding w3-border w3-round-large w3-card w3-margin-bottom'>

                    <h3 className="w3-opacity"><b>MUSIC PLAYER</b></h3>

                    <div className="w3-center">
                        <img className="w3-image" />
                    </div>

                    <h5></h5>

                    <audio controls autoPlay></audio>

                    <div className="w3-row w3-padding">
                        <span >
                            {songsList.length > 1 ? <span className="w3-button w3-padding" onClick={playPrevious}><GrCaretPrevious style={{ verticalAlign: 'middle' }} /></span> : <span className="w3-text-white">.</span>}
                        </span>
                        <span >
                            <span className="w3-button" onClick={OnOff}>{stoped ? <GrStopFill style={{ verticalAlign: 'middle'}}/>:<GrStop style={{ verticalAlign: 'middle'}}/>}</span>
                        </span>
                        <span >
                            {songsList.length > 1 ? <span className="w3-button w3-padding" onClick={playNext}><GrCaretNext style={{ verticalAlign: 'middle' }} /></span> : <span className="w3-text-white">.</span>}
                        </span>
                    </div>
                </div>
            }
        </>

    )

}