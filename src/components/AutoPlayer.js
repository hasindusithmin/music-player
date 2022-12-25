
import { useEffect, useState } from "react";
import { GrCaretNext, GrCaretPrevious, GrStop,GrStopFill } from "react-icons/gr";


export default function AutoPlayer({ songsList}) {

    const [index, setIndex] = useState(0)
    const [stoped,setstoped] = useState(false)

    useEffect(() => {
        document.getElementById('singer').innerText = songsList[index]['singer']
        document.querySelector('h5').innerText = songsList[index]['song']
        document.querySelector('audio').src = songsList[index]['link']
    }, [index])

    setTimeout(()=>{
        let _ = index;
        if (_ < 14) setIndex(_ + 1)
        else setIndex(0)
    },2500)


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
                <div className='w3-row w3-padding w3-border w3-round-large w3-card w3-margin-bottom w3-animate-bottom'>

                    <h3 className="w3-opacity"><b>MUSIC PLAYER</b></h3>

                    <div className="w3-center" id="singer">
                    </div>

                    <h5></h5>

                    <audio controls preload="none"></audio>

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