import React, { useState, useEffect } from 'react';
import { useSpring, animated } from "react-spring"
import axios from 'axios';
import "./WorkoutModal.css"
import Excercise from "./Exercise/Exercise"
import CategoryButton from "./CategoryButton/CategoryButton"
const WorkoutModal = (props) => {

    const [workoutTitle, setWorkoutTitle] = useState(props.data.title)
    const [newWorkoutTitle, setNewWorkoutTitle] = useState("empty-workout-title")
    const [exercises, setExercises] = useState(props.data.exercises)
    const [newExercise, setNewExercise] = useState(0)
    const [workoutID, setWorkoutID] = useState(props.data.id)
    const [categories, setCategories] = useState([]);
    const animations = useSpring({ from: { height: 0 }, to: { height: 750 }, config: { duration: 100 } })



    let theDate = props.data.date.substr(0, 10)

    useEffect(() => {
        if (workoutTitle === '') {

            setWorkoutTitle(<div className={newWorkoutTitle}><input className="workout-title-input" placeholder="Enter Workout Title" onKeyDown={enterWorkout} /></div>)
            setWorkoutID(props.workoutLength + 1)
        }
        else {
            setWorkoutTitle(<div className="workout-modal-title">{props.data.title}</div>)
        }
    }, [])


    function enterWorkout(e) {
        let workoutInput = document.querySelector('.workout-title-input')
        if (e.key === 'Enter') {

            axios.post('http://localhost:8000/api/', {
                title: workoutInput.value,
                tag: 'Strength',
                exercises: []
            })
            setTimeout(function () {
                props.updateList()
            }, 100)
            setWorkoutTitle(<div className="workout-modal-title">{workoutInput.value}</div>)
        }

    }

    function addNewExercise() {
        if (newExercise === 0) {
            setNewExercise(1)
        }

    }

    function addCategory(category) {
        let i;
        let newCategories = categories;
        let cancel = 0
        for (i = 0; i <= categories.length; i++) {
            if (newCategories[i] === category) {
                newCategories.splice(i, 1)
                cancel = 1;
                break;
            }
        }
        if (cancel === 0) {
            newCategories.push(category);
        }
        setCategories(newCategories);
    }


    function postExercise() {
        let exerciseTitle = document.querySelector('.new-exercise-input').value
        axios.get('http://localhost:8000/api/' + workoutID).then((res) => {
            let updatedWorkout = res.data
            updatedWorkout.exercises.push({
                title: exerciseTitle,
                categories: categories,
                sets: [],
                id: updatedWorkout.exercises.length
            })
            console.log(updatedWorkout.exercises)
            axios.put('http://localhost:8000/api/' + workoutID + '/', updatedWorkout)

            setExercises(updatedWorkout.exercises)
        })
    }

    function renderNewExercise() {
        if (newExercise === 1) {
            return (<div className="new-exercise-container">
                <input className="new-exercise-input" placeholder="Exercise Name" />
                <div className="category-button-container">
                    <CategoryButton text="Chest" styling="chest" addCategory={addCategory} />
                    <CategoryButton text="Back" styling="back" addCategory={addCategory} />
                    <CategoryButton text="Shoulders" styling="shoulders" addCategory={addCategory} />
                    <CategoryButton text="Legs" styling="legs" addCategory={addCategory} />
                    <CategoryButton text="Tricep" styling="tricep" addCategory={addCategory} />
                    <CategoryButton text="Bicep" styling="bicep" addCategory={addCategory} />
                </div>
                <button onClick={postExercise}>DONE</button>
            </div>)
        }
    }


    function deleteWorkout() {
        axios.delete('http://localhost:8000/api/' + workoutID).then(response => { alert("Workout Deleted") });

    }

    return (<animated.div style={animations} className='workout-modal-container'>
        <button className="close-modal-button" onClick={() => { props.closeModal(); props.updateList() }}>X</button>
        <div className="modal-header">
            {workoutTitle}
            <div className="workout-modal-date">{theDate}</div>
            <div>{workoutID}</div>
        </div>
        <div className="exercises-container">
            {exercises.map((exercise) => <Excercise data={exercise} workoutID={workoutID} />)}
            <button onClick={addNewExercise} className="add-exercise-button">Add Exercise +</button>
            {renderNewExercise()}
            <button className="delete-workout-button" onClick={deleteWorkout}>DELETE</button>
        </div>
    </animated.div>);
}

export default WorkoutModal;