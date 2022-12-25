
import music from "../music.gif"

export default function Header() {

    return (
        <header className='w3-row w3-padding w3-margin-bottom'>
            <h1 className="w3-xlarge w3-opacity w3-hide-large w3-animate-right"><b>SINHALA <span className="w3-tag">JUKEBOX</span></b>&nbsp;<span><img src={music} alt="music" width={48} /></span></h1>
            <h1 className="w3-xxxlarge w3-opacity w3-hide-small"><b>SINHALA <span className="w3-tag">JUKEBOX </span> </b> &nbsp;<span><img src={music} alt="music" width={48} /></span></h1>
        </header>
    )

}