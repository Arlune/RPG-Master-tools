import React, { useState } from 'react';
import './Digicode.css';
import { getRandomInt } from '../utils/mathUtils';

function Digicode() {
    // STATE
    const [ digicode ] = useState([getRandomInt(9), getRandomInt(9), getRandomInt(9), getRandomInt(9)]);
    const [ currentValues, setCurrentValues ] = useState([ {value : 0, status : null}, {value : 0, status : null}, {value : 0, status : null}, {value : 0, status : null}]);
    const [ status, setStatus ] = useState(null);
    console.log(digicode)

    function increment(i) {
        if (currentValues[i].value >= 9) {
            currentValues[i].value = 0;
        } else {
             currentValues[i].value = currentValues[i].value + 1;
          }
        setCurrentValues([...currentValues]);
    }

    function decrement(i) {
        if (currentValues[i].value <= 0) {
            currentValues[i].value = 9;
        } else {
            currentValues[i].value = currentValues[i].value - 1;
        }
        setCurrentValues([...currentValues]);
    }

    function check() {
        const match = currentValues.every((value, i) => value.value === digicode[i]);
        setStatus(match);
        currentValues.forEach((value, i) => {
            value.status = value.value === digicode[i];
        });
        setCurrentValues([...currentValues]);
    }

    // Generate as much Cyphers as we have numbers in the current digicode value
    let cyphers = [];
    for(let [i, value] of currentValues.entries()) {
        cyphers.push(Cypher(value, i, increment, decrement));
    }

    // Generate the message if the digicode is right or wrong
    let statusMessage = "";
    if (status) {
        statusMessage = <div className="status success">Code valide</div> 
    } else if (status === false){
        statusMessage = <div className="status error">Code erroné</div>
    }

    return (
        <div>
            <h2>Digicode</h2>
            Find the right digicode
            <br/>
            <div className="cypher-container">{cyphers}</div>
            <button className="check-code" onClick={ check }>Check your code</button>
            { statusMessage }
        </div>
    )    
}

function Cypher({value, status}, key, handlePlusClick, handleMinusClick) {
    let statusMessage = "";
    if (status) {
        statusMessage = <div className="cypher-status success">V</div>
    } else if (status === false){
        statusMessage = <div className="cypher-status error">X</div>
    }

    return (
    <div key={ key+"cypher" } className="cypher">
        <button className="incrementing" onClick={ () => handlePlusClick(key) }>+</button>
        <div>{ value }</div> 
        <button className="decrementing" onClick={ () => handleMinusClick(key)} >-</button>
        <div>{ statusMessage }</div>
    </div>)
}

export default Digicode;