import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import HomePage from "./Components/HomePage/HomePage"

function App() {




  const [pageView, setPageView] = useState(<HomePage changeView={changeView} />)


  function changeView(newView) {

    setPageView(newView)
  }


  useEffect(() => {




    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'




  }, [])

  return (
    <div className="App">
      {pageView}
    </div>
  );
}

export default App;
/*
Workouts: [

  {
    id: 1,
    date: TBD,
    exercises:[
      {
        exerciseTitle: 'Bench Press',
        categorys: ['Chest'],

        sets: [{

          reps: 10,
          weight: 225
        }],12,24,12],
        volume: set[i].reps * set[i].weight
        totalRepcount:
        weight: 225
      },
         {
        exerciseTitle: 'Pull Ups',
        categorys: ['Back'],
        reps: 15,
        sets: 4,
        weight: 225
      },
         {
        exerciseTitle: 'DeadLifts',
        categorys: ['Legs', 'Back],
        reps: 15,
        sets: 4,
        weight: 225
      }
    ]
  }


]




*/