import React, { useState } from 'react';
import "./LandingPage.css"
const LandingPage = (props) => {





    function openWorkouts() {

        props.changeView(1)

    }






    return (<div className="landing-page-container">




        <div className="column-container">

            <div className="section-column workouts" onClick={openWorkouts}>
                <div className="section-title">WORKOUTS</div>

            </div>
            <div className="section-column nutrition">
                <div className="section-title">NUTRITION</div>

            </div>
            <div className="section-column analytics">
                <div className="section-title">ANALYTICS</div>

            </div>
        </div>



    </div>);
}

export default LandingPage;