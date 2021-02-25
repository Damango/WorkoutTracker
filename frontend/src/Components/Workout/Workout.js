import React from 'react';
import "./Workout.css"
const Workout = (props) => {


    let theDate = props.data.date.substr(0, 10)



    function changeModalData() {
        props.changeModalData(props.data);
    }

    return (<div className="workout-card-container" onClick={changeModalData}>


        <div className='workout-card-title'>{props.data.title}</div>
        <div className="workout-tags-container">
            <div className="workout-card-date">{theDate}</div>
            <div className="workout-card-tag">{props.data.tag}</div>
        </div>






    </div>);
}

export default Workout;