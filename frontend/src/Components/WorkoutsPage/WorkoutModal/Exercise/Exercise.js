import React, { useState, useEffect } from 'react';
import "./Exercise.css"
import { useSpring, animated } from "react-spring"
import axios from 'axios'
const Exercise = (props) => {


    const [totalVolume, setTotalVolume] = useState(0)
    const [setCount, setSetCount] = useState()
    const [theSets, setTheSets] = useState(props.data.sets)
    const [addSet, setAddSet] = useState(0)
    const [symbol, setSymbol] = useState(' + ')





    let totalSets = props.data.sets.length

    useEffect(() => {
        let i;
        let volume = 0;
        for (i = 0; i < theSets.length; i++) {
            volume += (theSets[i].reps * theSets[i].weight);
        }
        setTotalVolume(volume);

    }, [])

    function calculateVolume() {
        let i;
        let volume = 0;
        for (i = 0; i < theSets.length; i++) {
            volume += (theSets[i].reps * theSets[i].weight);
        }
        setTotalVolume(volume);
    }



    function postSet() {

        let reps = document.querySelector('#reps-input').value;
        let weight = document.querySelector("#weight-input").value;

        axios.get('http://localhost:8000/api/' + props.workoutID).then((res) => {
            let updatedWorkout = res.data
            let newSets = theSets
            updatedWorkout.exercises[props.data.id].sets.push({ reps: reps, weight: weight })
            newSets.push({ reps: reps, weight: weight })

            axios.put('http://localhost:8000/api/' + props.workoutID + '/', updatedWorkout)

            setTheSets(updatedWorkout.exercises[props.data.id].sets)
            calculateVolume()
        })

    }

    function renderAddSet() {

        if (addSet === 1) {
            return (<div className="set-add-container">
                <div className="set-input-container">
                    <span >Reps:</span>
                    <input placeholder="Enter Reps" className="sets-input" id="reps-input" />
                </div>
                <div className="set-input-container">
                    <span >Weight:</span>
                    <input placeholder="Enter Weight" className="sets-input" id="weight-input" />
                </div>
                <button onClick={postSet}>DONE</button>
            </div>)
        }
        else {
            return ''
        }



    }

    function addSetSwitch() {
        if (addSet === 0) {
            setAddSet(1)
            setSymbol(" - ")
        }
        else {
            setAddSet(0)
            setSymbol(" + ")
        }

    }





    return (<div className="exercise-wrapper">

        <div className="exercise-header">
            <div className="exercise-title">{props.data.title}</div>
            <div className="exercise-categories">{props.data.categories.map((category) => <div className={"exercise-category " + category}>{category}</div>)}</div>
            <div className="total-sets">Sets:  {totalSets}</div>
            <div className="total-volume">Volume:  {totalVolume}</div>
        </div>
        <div className="sets-editor-container">
            {theSets.map((set) => <div className='set-block'>{set.weight + ' + ' + set.reps}</div>)}
            <button className="add-set-button" onClick={addSetSwitch}>{symbol}</button>
            {renderAddSet()}
        </div>
    </div>);
}

export default Exercise;