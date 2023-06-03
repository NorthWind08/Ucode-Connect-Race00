let equationStr = '';
let equation = '';

const updateEq = () => {
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
    try {
        res = eval(equation);
    }
    catch { }
    
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
    findPercent();
    document.querySelector('.result').innerHTML = res;
    updateEq();
}

const validateEq = () => {
    equation = equationStr;
    equation.replace('^', '**');

    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === '%') {
            let numIdx = i - 1;
            while (!isNaN(equation[numIdx])) {
                numIdx--;
            }
            let numPercent = equation.slice(numIdx + 1, i);
            console.log(`i:${i}; numIdx:${numIdx}`);
            console.log(numPercent);
            return numPercent;
        }
    }
}

const operatorPress = (char) => {
    if (isNaN(char) && isNaN(equationStr[equationStr.length - 1])) {
        equationStr = equationStr.replace(equationStr[equationStr.length - 1], char);
        updateEq();
        return;
    }

    equationStr += char;
    updateEq();
}

const hide = () => {
    document.getElementById('standard').style.display = "none";
}

const findPercent = () => {
    numPercent = validateEq();
    let numBeforePercent = '';
        for (let i = equation.indexOf(numPercent[0]) - 2; i >= 0; i--) {
            if (isNaN(equation[i])) {
                break;
            }
            numBeforePercent += equation[i];
        }
        numBeforePercent = reverseString(numBeforePercent);
        let result = (numBeforePercent / 100) * numPercent;
        console.log(`percent ${numPercent}`);
        console.log(`nbp ${numBeforePercent}`);
        console.log(`result: ${result}`);
        equation.replace('%', '');
        equation.replace(numPercent, result);
}
const reverseString = (str) => {
    return [...str].reverse().join('');
}