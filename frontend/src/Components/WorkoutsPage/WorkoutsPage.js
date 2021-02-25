import React, { useState, useEffect } from 'react';
import Workout from "../Workout/Workout"
import WorkoutModal from "./WorkoutModal/WorkoutModal"
import "./WorkoutsPage.css"
import axios from 'axios';
const WorkoutsPage = (props) => {


    const [workoutData, setWorkoutData] = useState([])

    const [createModal, setCreateModal] = useState(0)

    const [modalData, setModalData] = useState()

    const [workoutsLength, setWorkoutsLength] = useState(0)





    useEffect(() => {
        axios.get('http://localhost:8000/api/').then((res) => {
            console.log(res.data)
            setWorkoutData(res.data.reverse())
            setWorkoutsLength(res.data.length)

        })
    }, [])

    function updateList() {
        axios.get('http://localhost:8000/api/').then((res) => {

            setWorkoutData(res.data.reverse())
            setWorkoutsLength(res.data.length)

        })
    }


    function renderCreateModal() {

        if (createModal === 1) {
            return (<WorkoutModal data={modalData} closeModal={openCreateModal} updateList={updateList} workoutLength={workoutsLength} />)
        } else {
            return ''
        }
    }

    function changeModalData(data) {
        setCreateModal(0)
        setModalData(data)

        setTimeout(function () {
            setCreateModal(1)
        }, 10)

    }



    // When create workout is clicked make a new function to handle that specific
    // instance and creates a blank modal with temporary information and
    // Posts a blank structure to database.

    function openCreateModal() {
        if (createModal === 0) {
            setCreateModal(1)
        }
        else if (createModal === 1) {
            setCreateModal(0)
        }
    }


    function addWorkout() {
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'

        axios.post('http://localhost:8000/api/', {
            title: 'Chest Day',
            tag: 'Strength',
            exercises: [{
                title: 'Push Ups',
                categories: ['Chest', 'Tricep'],
                sets: [{
                    reps: 20,
                    weight: 225
                }, {
                    reps: 15,
                    weight: 225
                },
                {
                    reps: 10,
                    weight: 225
                }]
            }, {
                title: "Bench Press",
                categories: ['Chest', "Tricep"],
                sets: [{
                    reps: 12,
                    weight: 315
                },
                {
                    reps: 10,
                    weight: 325
                },
                {
                    reps: 8,
                    weight: 345
                }]
            }]
        }
        )
    }
    return (<div className="workouts-page-container">


        {renderCreateModal()}

        <div className="left-view-container">
            <h1>WORKOUTS</h1>
            <button className="create-workout-button" onClick={() => {

                changeModalData({
                    title: '',
                    tag: '',
                    date: '12-20-41',
                    exercises: []
                });

            }}
            >+ Create Workout</button>
            <button onClick={addWorkout}>Add Workout</button>

            <div className="workouts-container">
                {workoutData.map((workout) => <Workout data={workout} changeModalData={changeModalData} />)}
            </div>

        </div>
        <div className="right-view-container">
            <h1>VOLUME</h1>
            <div className="workout-data-container"></div>
        </div>
    </div>);
}

export default WorkoutsPage;