import React, { useState, useEffect } from 'react';
import Main from '../views/Main.css'

export default () => {
    const [array, setArray] = useState([])

    useEffect(() => {
        generateArray();
    }, [])

    const generateArray = () => {
        let arr = [];
        for (let i=0; i<70; i++) {
            let randNum = Math.floor(Math.random(10) * Math.floor(100))
            arr.push(randNum)
        }
        setArray(arr)
    }

    return (
        <div>
            <h1>Sorting Visualizer</h1>
            <div id="graph">
            {
                array.map((number, i) => 
                <p key={i} className="bars" style={{height: `${number * 4}px`}}></p>
                )
            }
            </div>
            <div>
                <button onClick={e => generateArray()}>Generate New Array</button>
            </div>
        </div>
    )
}