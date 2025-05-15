import { useEffect, useState } from "react";

function AnalogClock() {
    // State to manage time
    const [currentTime, setCurrentTime] = useState(new Date());

    // Registers setInterval (to update the clock every 1 sec) when the component is first mounted
    useEffect(() => {

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
        <section class="clock">
            <div id="hour-hand" style={{transform: `rotate(${hourDegree}deg)`}}></div>
            <div id="minute-hand" style={{transform: `rotate(${minuteDegree}deg)`}}></div>
            <div id="sec-hand" style={{transform: `rotate(${secDegrees}deg)`}}></div>
            <div id="center"></div>
        </section>
    );
}

export default AnalogClock;