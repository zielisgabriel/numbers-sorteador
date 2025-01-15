const form = document.querySelector('form')
const numbers = document.getElementById('numbers')
const numberMin = document.getElementById('number-min')
const numberMax = document.getElementById('number-max')
const repeat = document.getElementById('repeat')

const returnBtn = document.querySelector('.return')
const listResultNum = document.getElementById('result')
const areaResult = document.getElementById('area-result')
const areaNumberDraw = document.getElementById('area-number-draw')



inputTratament(numbers)
inputTratament(numberMin)
inputTratament(numberMax)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const min = Number(numberMin.value) - 1
    const max = Number(numberMax.value) + 1
    const numberForRepeat = Number(numbers.value)

    for(let i = 0; i <= numberForRepeat; i++){
        console.log(randomNumberInterval(min, max))
    }
})

returnBtn.addEventListener('click', () => {
    setTimeout(() => {
        areaResult.style.opacity = '0'
        setTimeout(() => {
            areaResult.style.display = 'none'
            areaNumberDraw.style.display = 'flex'
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