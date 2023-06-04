let equationStr = '';
let equation = '';


const updateEq = () => {
    if (equationStr === '') {
        document.querySelector(".eq-input").innerHTML = 'Enter equation';
        return;
    }
    document.querySelector(".eq-input").innerHTML = equationStr;
}

const clearEq = () => {
    equationStr = 'Enter equation';
    updateEq();
    equationStr = '';
    equation = '';
    document.querySelector(".result").innerHTML = '0';
}

const calcRes = () => {
    validateEq();
    let res = 0;
    with (Math) try {
        res = eval(equation);
    }
    catch {
        document.querySelector(".result").innerHTML = 'Error: invalid equation';
        return;
    }

    if (
        res % 1 !== 0 && 
        String(res).length > 16
    ) {
        let resStr = String(res);
        let count = 1;
        for (let i = resStr.indexOf('.') + 1; i < resStr.length; i++) {
            if (resStr[i] === resStr[i - 1]) {
                count++;
            }
        }
        if (count > 10) {
            if (
                resStr[resStr.indexOf('.') + 2] === '0' ||
                resStr[resStr.indexOf('.') + 2] === '9'    
            ) {
                res = res.toFixed(1);
            }
            else {
                res = res.toFixed(resStr.length - 4);
            }
        }
    }
    document.querySelector('.result').innerHTML = res;
    updateEq();
}

const validateEq = () => {
    equation = equationStr;
    parsePercent();
    parseFactorial();
    equation = equation.replace('^', '**');
    equation = equation.replace('π', 'PI');
    equation = equation.replace('√', 'sqrt');
}

const parsePercent = () => {
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === '%') {
            let numIdx = i - 1;
            while (!isNaN(equation[numIdx])) {
                numIdx--;
            }
            let numPercent = equation.slice(numIdx + 1, i);            
            if (
                equation[numIdx] === '*' ||
                equation[numIdx] === '/' ||
                equation[numIdx] === '^'
            ) {
                equation = equation.replace(numPercent + '%', String(Number(numPercent) / 100));
            }
            else {
                let secondNum = numIdx - 1;
                for (let i = numIdx - 1; i >= 0; i--) {
                    if(isNaN(equation[i]) || i == 0) {
                        secondNum = i;
                        break;
                    }
                }
                equation = equation.replace(
                    numPercent + '%',
                    String(Number(equation.slice(secondNum, numIdx)) * Number(numPercent) / 100)
                );
            }
        }
    }
}

const parseFactorial = () => {
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === '!') {
            if (!isNaN(equation[i - 1])) {
                let numStart = i - 1;
                for (;numStart >= 0; numStart--) {
                    if (numStart === 0 || isNaN(numStart)) {
                        break;
                    }
                }
                equation = equation.replace(
                    equation.slice(numStart, i+1),
                    `factorial(${equation.slice(numStart, i)})`
                );
            }
        }
    }
}

const operatorPress = (char) => {

    // if (char === 'sin') {
    //     equationStr += char + '(';
    //     updateEq();
    //     return;
    // }

    // if (char === 'cos') {
    //     equationStr += char + '(';
    //     updateEq();
    //     return;
    // }

    // if (char === 'tan') {
    //     equationStr += char + '(';
    //     updateEq();
    //     return;
    // }

    // if (char === 'π') {
    //     equationStr += char;
    //     updateEq();
    //     return;
    // }

    // if (char === '√') {
    //     equationStr += char + '(';
    //     updateEq();
    //     return;
    // }


    // if (char === '-' && equationStr === '') {
    //     equationStr += char;
    //     updateEq();
    //     return;
    // }

    // if (isNaN(char) && equationStr === '') {
    //     return;
    // }

    // if (isNaN(char) && isNaN(equationStr[equationStr.length - 1])) {
    //     equationStr = equationStr.replace(equationStr[equationStr.length - 1], char);
    //     updateEq();
    //     return;
    // }

    equationStr += char;
    updateEq();
}

const backSpace = () => {
    // console.log("backspace called");
    // console.log(equationStr.slice(0, equationStr.length - 1));
    equationStr = equationStr.slice(0, equationStr.length - 1);
    updateEq();
}

const showBasic = () => {
    document.getElementById("basic").style.display = 'flex'
    document.getElementById("converter").style.display = 'none'

    document.getElementById("sin").style.display = 'none';
    document.getElementById("cos").style.display = 'none';
    document.getElementById("tan").style.display = 'none';
    document.getElementById("pi").style.display = 'none';
    document.getElementById("open-bracket").style.display = 'none';
    document.getElementById("close-bracket").style.display = 'none';
    document.getElementById("factorial").style.display = 'none';
    document.getElementById("square-root").style.display = 'none';

    document.getElementById("basic-btn").style.backgroundColor = 'var(--background)';
    document.getElementById("advanced-btn").style.backgroundColor = 'var(--mode)';
    document.getElementById("converter-btn").style.backgroundColor = 'var(--mode)';
}

const showAdvanced = () => {
    document.getElementById("basic").style.display = 'flex'
    document.getElementById("converter").style.display = 'none'

    document.getElementById("sin").style.display = 'initial';
    document.getElementById("cos").style.display = 'initial';
    document.getElementById("tan").style.display = 'initial';
    document.getElementById("pi").style.display = 'initial';
    document.getElementById("open-bracket").style.display = 'initial';
    document.getElementById("close-bracket").style.display = 'initial';
    document.getElementById("factorial").style.display = 'initial';
    document.getElementById("square-root").style.display = 'initial';


    document.getElementById("basic-btn").style.backgroundColor = 'var(--mode)';
    document.getElementById("advanced-btn").style.backgroundColor = 'var(--background)';
    document.getElementById("converter-btn").style.backgroundColor = 'var(--mode)';

}

const showConverter = () => {
    document.getElementById("basic").style.display = 'none'
    document.getElementById("converter").style.display = 'flex'

    document.getElementById("basic-btn").style.backgroundColor = 'var(--mode)';
    document.getElementById("advanced-btn").style.backgroundColor = 'var(--mode)';
    document.getElementById("converter-btn").style.backgroundColor = 'var(--background)';

}

const factorial = (num) => {
    if (num < 0) {
        return -1;
    }
    if (num === 0) {
        return 1;
    }
    return num * factorial(num - 1);
}

showBasic();

const convertLenght = () => {
    var inputValue = parseFloat(document.getElementById("lenghtValueInput").value);
    var inputMatric = document.getElementById("inputLenghtMatric").value;
    var outputMatric = document.getElementById("outputLenghtMatric").value;
    var matrics = {
        "cm": {
          "cm": 1,
          "m": 0.01,
          "km": 0.00001,
          "in": 0.393701,
          "ft": 0.0328084,
          "yd": 0.0109361,
          "mi": 0.00000621371
        },
        "m": {
          "cm": 100,
          "m": 1,
          "km": 0.001,
          "in": 39.3701,
          "ft": 3.28084,
          "yd": 1.09361,
          "mi": 0.000621371
        },
        "km": {
          "cm": 100000,
          "m": 1000,
          "km": 1,
          "in": 39370.1,
          "ft": 3280.84,
          "yd": 1093.61,
          "mi": 0.621371
        },
        "in": {
          "cm": 2.54,
          "m": 0.0254,
          "km": 0.0000254,
          "in": 1,
          "ft": 0.0833333,
          "yd": 0.0277778,
          "mi": 0.000015783
        },
        "ft": {
          "cm": 30.48,
          "m": 0.3048,
          "km": 0.0003048,
          "in": 12,
          "ft": 1,
          "yd": 0.333333,
          "mi": 0.000189394
        },
        "yd": {
          "cm": 91.44,
          "m": 0.9144,
          "km": 0.0009144,
          "in": 36,
          "ft": 3,
          "yd": 1,
          "mi": 0.000568182
        },
        "mi": {
          "cm": 160934,
          "m": 1609.34,
          "km": 1.60934,
          "in": 63360,
          "ft": 5280,
          "yd": 1760,
          "mi": 1
        }
      };
    var result = inputValue * matrics[inputMatric][outputMatric];
    document.getElementById("lenghtResultInput").value = result.toFixed(6);
}
const convertMass = () => {
    var inputValue = parseFloat(document.getElementById("massValueInput").value);
    var inputMatric = document.getElementById("inputMassMatric").value;
    var outputMatric = document.getElementById("outputMassMatric").value;
    var matrics = {
        "mg": {
          "mg": 1,
          "g": 0.001,
          "kg": 0.000001,
          "lb": 0.00000220462,
          "oz": 0.00003527396
        },
        "g": {
          "mg": 1000,
          "g": 1,
          "kg": 0.001,
          "lb": 0.00220462,
          "oz": 0.03527396
        },
        "kg": {
          "mg": 1000000,
          "g": 1000,
          "kg": 1,
          "lb": 2.20462,
          "oz": 35.27396
        },
        "lb": {
          "mg": 453592.37,
          "g": 453.59237,
          "kg": 0.45359237,
          "lb": 1,
          "oz": 16
        },
        "oz": {
          "mg": 28349.52313,
          "g": 28.34952313,
          "kg": 0.02834952313,
          "lb": 0.0625,
          "oz": 1
        }
      };
    var result = inputValue * matrics[inputMatric][outputMatric];
    document.getElementById("massResultInput").value = result.toFixed(6);
}
const convertArea = () => {
    var inputValue = parseFloat(document.getElementById("areaValueInput").value);
    var inputMatric = document.getElementById("inputAreaMatric").value;
    var outputMatric = document.getElementById("outputAreaMatric").value;
    var matrics = {
        "sqcm": {
          "sqcm": 1,
          "sqm": 0.0001,
          "ha": 0.0000001,
          "sqft": 0.00107639,
          "sqyd": 0.000119599,
          "acre": 0.0000000247105
        },
        "sqm": {
          "sqcm": 10000,
          "sqm": 1,
          "ha": 0.0001,
          "sqft": 10.7639,
          "sqyd": 1.19599,
          "acre": 0.000247105
        },
        "ha": {
          "sqcm": 100000000,
          "sqm": 10000,
          "ha": 1,
          "sqft": 107639,
          "sqyd": 11959.9,
          "acre": 2.47105
        },
        "sqft": {
          "sqcm": 929.0304,
          "sqm": 0.09290304,
          "ha": 0.0000092903,
          "sqft": 1,
          "sqyd": 0.111111,
          "acre": 0.0000229568
        },
        "sqyd": {
          "sqcm": 8361.2736,
          "sqm": 0.83612736,
          "ha": 0.0000836127,
          "sqft": 9,
          "sqyd": 1,
          "acre": 0.000206612
        },
        "acre": {
          "sqcm": 40468564.224,
          "sqm": 4046.8564224,
          "ha": 0.4046856422,
          "sqft": 43560,
          "sqyd": 4840,
          "acre": 1
        }
      };
    var result = inputValue * matrics[inputMatric][outputMatric];
    document.getElementById("areaResultInput").value = result.toFixed(9);
}