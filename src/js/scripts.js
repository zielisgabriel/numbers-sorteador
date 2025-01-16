const form = document.querySelector('form')
const numbers = document.getElementById('numbers')
const numberMin = document.getElementById('number-min')
const numberMax = document.getElementById('number-max')
const repeat = document.getElementById('repeat')

const returnBtn = document.querySelector('.return')
const listResultNum = document.getElementById('result')
const areaResult = document.getElementById('area-result')
const areaNumberDraw = document.getElementById('area-number-draw')

let resultNumbersDraw = []

inputTratament(numbers)
inputTratament(numberMin)
inputTratament(numberMax)

function noRepeatResult({ resultNumbersDraw, numberForRepeat, min, max }){
    for(let i = 0; i <= numberForRepeat; i++){
        if(i > 0){
            let randomNumber = randomNumberInterval(min ?? null, max ?? null)
            
            if(resultNumbersDraw.includes(randomNumber)){
                randomNumber = null
                i--
            } else {
                resultNumbersDraw.push(randomNumber)
            }
        } else {
            resultNumbersDraw.push(randomNumberInterval(min ?? null, max ?? null))
        }
    }

    for (const element of resultNumbersDraw) {
        const li = document.createElement('li')
        const span = document.createElement('span')

        span.textContent = element
        li.append(span)
        listResultNum.append(li)
    }
}

function createElement({ resultNumbersDraw, numberForRepeat, min, max }){

    if(repeat.checked){
        noRepeatResult({ resultNumbersDraw, numberForRepeat, min, max })
    } else {
        if(numberForRepeat > 0){
            for(let i = 0; i <= numberForRepeat ?? 0; i++){
                resultNumbersDraw.push(randomNumberInterval(min ?? null, max ?? null))
            }
        }
    }

    for (const element of resultNumbersDraw){
        const li = document.createElement('li')
        const span = document.createElement('span')

        span.textContent = element
        li.append(span)
        listResultNum.append(li)
    }

    resultNumbersDraw = []
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const min = Number(numberMin.value) - 1
    const max = Number(numberMax.value) + 1
    const numberForRepeat = Number(numbers.value - 1)

    if(repeat.checked){
        if(((max - 1) - (min + 1)) < (numberForRepeat + 1)){
            return window.alert('Digíte um valor maior.')
        }

        if(max - 1 < numberForRepeat + 1){
            return window.alert('Digíte um número válido.')
        }
        noRepeatResult({ resultNumbersDraw, numberForRepeat, min, max })
    } else {
        createElement({ resultNumbersDraw, numberForRepeat, min, max })
    }

    if(min + 1 >= max - 1){
        return window.alert('Número mínimo é maior que o número máximo.')
    }

    resultNumbersDraw = []

    setTimeout(() => {
        areaNumberDraw.style.opacity = '0'
        setTimeout(() => {
            areaNumberDraw.style.display = 'none'
            areaResult.style.display = 'block'
            setTimeout(() => {
                areaResult.style.opacity = '1'
            }, 10)
        }, 500)
    }, 500)
})

returnBtn.addEventListener('click', () => {
    setTimeout(() => {
        areaResult.style.opacity = '0'
        setTimeout(() => {
            areaResult.style.display = 'none'
            areaNumberDraw.style.display = 'flex'

            const listResultChildren = Array.from(listResultNum.children)

            for (const item of listResultChildren) {
                listResultNum.removeChild(item)
            }

            setTimeout(() => {
                areaNumberDraw.style.opacity = '1'
            }, 10)
        }, 500)
    }, 500)

})

// functions
function inputTratament(input){
    addEventListener('input', () => {
        const value = input.value
        input.value = value.replace(/\D+/g, '')
    })
}

// número aleatório entre dois números
function randomNumberInterval(num1, num2){
    return Math.floor(Math.random() * (num1 - num2 + 1) + num2)
}