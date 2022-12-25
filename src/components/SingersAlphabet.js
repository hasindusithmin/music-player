
import alphabet from "../alphabet.json"

export default function SingersAlphabet() {

    return (
        <div className='w3-row w3-padding w3-border w3-round-large w3-card w3-margin-bottom'>
            <p className="w3-opacity w3-large"><b>Discover your favorite singers, alphabetically!</b></p>
            {
                alphabet && Object.entries(alphabet).map(([key, value]) =>
                    <span key={key} className="w3-padding">
                        <img className="w3-image" src={value} alt={key.toUpperCase()} width={30} height={30} />
                    </span>
                )
            }
            <div className="w3-hide-small w3-padding"></div>
        </div>
    )

}