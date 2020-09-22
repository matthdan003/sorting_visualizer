import React, { useState, useEffect } from 'react';
import Main from '../views/Main.css'
import { getMergeSortAnimations } from '../algorithms/mergeSort'
import { getBubbleSortAnimations } from "../algorithms/bubbleSort";
import { doBubbleSort } from "../algorithms/bubbleSort";
import { getQuickSortAnimations } from "../algorithms/quickSort";
import { doQuickSort } from "../algorithms/quickSort";
import { quickSortPartition } from "../algorithms/quickSort";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'red';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'blue';

export default () => {
    const [array, setArray] = useState([])
    const [barNum, setBarNum] = useState(100)
    const [sortSpeed, setSortSpeed] = useState(5)

    useEffect(() => {
        generateArray();
    }, [barNum])

    const generateArray = () => {
        let arr = [];
        for (let i = 0; i < barNum; i++) {
            let randNum = Math.floor(Math.random() * (400 - 10) + 10)
            arr.push(randNum)
        }
        setArray(arr)

        const arrayBars = document.getElementsByClassName("array-bar");
        var arrayLength = arrayBars.length;
        for (let j = 0; j < arrayLength; j++) {
            var jBarStyle = arrayBars[j].style;
            jBarStyle.backgroundColor = "red";
        }
    }

    const reloadPage = () => {
        window.location.reload();
    }

    const mergeSort = () => {
        const animations = getMergeSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("array-bar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    if (i === animations.length - 1) {
                        makeAllBarsGreen();
                    }
                }, i * sortSpeed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    if (i === animations.length - 1) {
                        makeAllBarsGreen();
                    }
                }, i * sortSpeed);
            }
        }
    }

    const quickSort = () => {
        const arr = array;
        const animations = getQuickSortAnimations(arr);
        console.log(animations);
        const arrayBars = document.getElementsByClassName("array-bar");

        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                var [oldPosition, newPosition] = animations[i];

                var oldBarStyle = arrayBars[oldPosition].style;
                var newBarStyle = arrayBars[newPosition].style;
                var index;
                const dummyAnimations = [];
                if (arr.length > 1) {
                    index = quickSortPartition(
                        arr,
                        0,
                        arr.length - 1,
                        dummyAnimations
                    ); //index returned from partition
                    if (0 < index - 1) {
                        //more elements on the left side of the pivot
                        doQuickSort(dummyAnimations, arr, 0, index - 1);
                    }
                    if (index < arr.length) {
                        //more elements on the right side of the pivot
                        doQuickSort(dummyAnimations, arr, 0, arr.length - 1);
                    }
                }

                oldBarStyle.height = `${arr[oldPosition]}px`;
                newBarStyle.height = `${arr[newPosition]}px`;

                oldBarStyle.backgroundColor = "red";
                newBarStyle.backgroundColor = "blue";

                var currentPosition = oldPosition;
                for (let j = 0; j < currentPosition; j++) {
                    var jBarStyle = arrayBars[j].style;
                    jBarStyle.backgroundColor = "blue";
                }
                if (i === animations.length - 1) {
                    makeAllBarsGreen();
                }
            }, i * sortSpeed);
        }
    }

    const bubbleSort = () => {
        // We leave it as an exercise to the viewer of this code to implement this method.
        const arr = array;
        const animations = getBubbleSortAnimations(arr);
        console.log(animations);
        const arrayBars = document.getElementsByClassName("array-bar");

        for (let i = 0; i < animations.length; i++) {
            setTimeout(() => {
                var [oldPosition, newPosition] = animations[i];

                var oldBarStyle = arrayBars[oldPosition].style;
                var newBarStyle = arrayBars[newPosition].style;

                var temp = arr[oldPosition];
                arr[oldPosition] = arr[newPosition];
                arr[newPosition] = temp;

                oldBarStyle.height = `${arr[oldPosition]}px`;
                newBarStyle.height = `${arr[newPosition]}px`;

                oldBarStyle.backgroundColor = "red";
                newBarStyle.backgroundColor = "blue";

                var currentPosition = oldPosition;
                for (let j = 0; j < currentPosition; j++) {
                    var jBarStyle = arrayBars[j].style;
                    jBarStyle.backgroundColor = "red";
                }
                if (i === animations.length - 1) {
                    makeAllBarsGreen();
                }
            }, i * sortSpeed);
        }
    }


    const makeAllBarsGreen = () => {
        console.log("Sorted");
        const arrayBars = document.getElementsByClassName("array-bar");
        var arrayLength = arrayBars.length;
        for (let j = 0; j < arrayLength; j++) {
            var jBarStyle = arrayBars[j].style;
            jBarStyle.backgroundColor = "green";
        }
    }

    return (
        <div>
            <h1>Sorting Visualizer</h1>
            <div id="array-container">
                {
                    array.map((number, i) =>
                        <p
                            key={i}
                            className="array-bar"
                            style={{
                                backgroundColor: `${PRIMARY_COLOR}`,
                                height: `${number}px`
                            }}>
                        </p>
                    )
                }
            </div>
            <div>
                <button onClick={e => generateArray()}>Generate New Array</button>
                <button onClick={e => reloadPage()}>Reset</button>
                <div className="array-size">
                    <label>Array Size: </label>
                    <input type="range" value={barNum} min="50" max="200" step="50" onChange={e => setBarNum(e.target.value)} />
                    <span>{barNum}</span>
                </div>
                <div className="sort-speed">
                    <label>Sort Speed: </label>
                    <input type="range" value={sortSpeed} min="5" max="20" step="5" onChange={e => setSortSpeed(e.target.value)} />
                    <span>{sortSpeed}ms</span>
                </div>
                <button onClick={e => mergeSort()}>Merge Sort</button>
                <button onClick={e => quickSort()}>Quick Sort</button>
                <button onClick={e => bubbleSort()}>Bubble Sort</button>
            </div>
        </div>
    )
}