import * as logic from './logic'

export default function NextBalls() {
    return (
        <div id="nextBalls" >
            {logic.forRange(3, (i) => (
                <div className="placeForNext" key={`placeForNext${i}`}>
                    <div key={`nextCircle${i}`} className="circle color2"></div>
                </div>
            ))}
         </div>
    );
}