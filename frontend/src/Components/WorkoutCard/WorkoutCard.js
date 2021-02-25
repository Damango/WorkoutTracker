import React, { useState } from 'react';
import "./WorkoutCard.css"
const WorkoutCard = (props) => {

    let [infoState, setInfoState] = useState(0)



    function viewWorkoutData() {
        setInfoState(1)
    }


    function renderWorkoutData() {
        if (infoState === 1) {
            return (<div className="workout-data-container">
                <div className="info-holder">Sets: {props.data.sets}</div>
                <div className="info-holder">Reps: {props.data.reps}</div>
                <div className="info-holder">Date: {props.data.date}</div>
            </div>
            )
        }
        else {
            return ''
        }
    }


    return (<div className="workout-card" onClick={viewWorkoutData}>


        {props.data.exercise}

        {renderWorkoutData()}


    </div>);
}

export default WorkoutCard;