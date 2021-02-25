import React, { useState } from 'react';
import "./CategoryButton.css"

const CategoryButton = (props) => {

    const [selected, setSelected] = useState("category-button")

    return (<button className={selected + " " + props.styling} onClick={



        () => {
            if (selected === 'category-button-selected') {
                setSelected('category-button')
            }
            else {
                setSelected('category-button-selected')
            }

            props.addCategory(props.styling)
        }


    }>{props.text}</button>);
}

export default CategoryButton;