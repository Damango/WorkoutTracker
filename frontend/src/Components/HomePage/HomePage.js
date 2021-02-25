import React, { useState } from 'react';
import WorkoutsPage from "../WorkoutsPage/WorkoutsPage"
import "./HomePage.css"
const HomePage = (props) => {





    function changeView(newView) {
        props.changeView(newView)
    }




    return (<div className="home-page-container">

        <div className="selector-container">

            <div className="app-selector workouts" onClick={() => { changeView(<WorkoutsPage />) }}>WORKOUTS</div>
            <div className="app-selector nutrition">NUTRITION</div>
            <div className="app-selector analytics">ANALYTICS</div>
        </div>

    </div>);
}

export default HomePage;