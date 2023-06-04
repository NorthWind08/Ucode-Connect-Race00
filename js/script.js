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