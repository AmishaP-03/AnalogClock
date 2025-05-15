import { useEffect, useState } from "react";
import './AnalogClock.css';

function AnalogClock() {
    // State to manage time
    const [currentTime, setCurrentTime] = useState(new Date());
    const [numbersUI, setNumbersUI] = useState();

    // Registers setInterval (to update the clock every 1 sec) when the component is first mounted
    // Also defines the UI to display numbers on clock
    useEffect(() => {

        // Maps an empty array of length 12 to the desired UI
        const ui = [...Array(12)].map((_, i) => {
            const number = i + 1;
            const angle = number * 30;
            return (
            <div
                key={number}
                className="number"
                style={{
                transform: `rotate(${angle}deg) translate(8rem) rotate(-${angle}deg)` 
                // 1. rotate(angle): Rotates the number to its correct position on the circle. 
                // 2. translate(8rem): Pushes it outward from the center to the clock’s edge; depends on the size of the clock.
                // 3. rotate(-angle): Keeps the text upright instead of rotated.
                }}
            >
                {number}
            </div>
            );
        });
        setNumbersUI(ui);

        // Updates the clock with the current time in every sec
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleans up the interval when the component unmounts, preventing memory leaks or multiple intervals stacking
        return () => clearInterval(interval);
    }, []);

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // With each minute, hour hand moves by 360/720 = 0.5 degrees (This is to be considered because hour hand keeos moving gradually when minute hand moves).
    // With each hour, hour hand moves by 360/12 = 30 degrees
    // hours % 12 -> To convert a 24 hour clock to 12 hour clock
    const hourDegree = minutes*0.5 + (hours % 12)*30;

    // With each sec, minute hand moves by 360/3600 = 0.1 degrees (This is to be considered because minute hand keeps moving gradually when second hand moves).
    // With each minute, minute hand moves by 360/60 = 6 degrees
    const minuteDegree = seconds * 0.1 + minutes * 6;

    // With each sec, second hand moves by 360/60 = 6 degrees
    const secDegrees = seconds * 6;


    return (
        <section className="clock">
            <div className="numbers-section">{numbersUI}</div>
            <div className="hour" style={{transform: `rotate(${hourDegree}deg)`}}></div>
            <div className="minute" style={{transform: `rotate(${minuteDegree}deg)`}}></div>
            <div className="second" style={{transform: `rotate(${secDegrees}deg)`}}></div>
            <div className="center"></div>
        </section>
    );
}

export default AnalogClock;