

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var chosenOption
var chosenMatrix
var matrix1 = document.getElementsByClassName('field_box')[0].parentElement
var matrix2 = document.getElementsByClassName('field_box')[1].parentElement
var matrix3 = document.getElementsByClassName('field_box')[2].parentElement

function ready() {
    var createMatrixButton = document.getElementsByClassName('create-matrix')[0]
    createMatrixButton.addEventListener('click', createMatrix)

    var removeMatrixButton = document.getElementsByClassName('remove-matrix')[0]
    removeMatrixButton.addEventListener('click', () => {
        var container = document.getElementsByClassName('container')[0]
        container.removeChild(container.lastChild)
    })

    var matrixOptions = document.getElementsByClassName('option')
    for(i=0; i<matrixOptions.length; i++) {
        matrixOptions[i].addEventListener('click', optionChange)
    }
    matrixOptions.

    var boardMatrixButtons = document.getElementsByClassName('field_box')
    for(i=0; i<boardMatrixButtons.length; i++) {
        boardMatrixButtons[i].addEventListener('click', (event) => {
            targetMatrix = event.target.parentElement
            for(i=0; i<9; i++) {
                targetMatrix.children[i].innerText = chosenMatrix.children[i].innerText
            }
            solveQuestion()
        })
    } 
    
}

function createMatrix() {
    var container = document.getElementsByClassName('container')[0]
    var matrixEntries = document.getElementsByClassName('create-entry')
    var newUl = document.createElement('ul')

    for(let i=0; i<matrixEntries.length; i++) {
        let newLi = document.createElement('li')
        newLi.innerText = matrixEntries[i].value
        newUl.append(newLi)
    }
    newUl.innerHTML += "<li class='checkbox'></li>"
    newUl.classList.add('matrix')
    container.append(newUl)
    let lastElement = newUl.lastElementChild
    lastElement.addEventListener('click', colorChange)
}

function colorChange(event) {
    checkbox= event.target
    checkboxes = event.target.parentElement.parentElement

    for(i=0; i<checkboxes.children.length; i++) {
        checkboxes.children[i].lastElementChild.style.backgroundColor = 'black'
        checkboxes.children[i].lastElementChild.style.borderColor = 'white'
    }
    checkbox.style.backgroundColor = 'white'
    checkbox.style.borderColor = 'black'

    chosenMatrix = event.target.parentElement
}

function optionChange(event) {
    var targetOption = event.target
    operation = String(targetOption.id)
    options = targetOption.parentElement
    board = document.getElementsByClassName('operation')

    for(i=0; i<options.children.length; i++) {
        options.children[i].style.backgroundColor = 'transparent'
        options.children[i].style.width = '180px'
    }
    targetOption.style.backgroundColor = '#858181'
    targetOption.style.width = '200px'
    if(operation.length === 1){
        board[0].style.display = 'flex'
        board[1].style.display = 'none'
        document.getElementsByClassName('sign')[0].innerText = `${operation}`
    } else {
        board[1].style.display = 'flex'
        board[0].style.display = 'none'
        document.getElementsByClassName('operate')[0].innerText = `${operation}`
    }

    let counter = 0
    for( child of options.children){
        if(child === event.target) {
            chosenOption = counter
        } else {
            counter +=1
        }   
    }
    solveQuestion()
}




function solveQuestion(){
    let numbers1 = []
    let numbers2 = []
    let numbers3 = []

    for(let x = 0; x<9; x++){
        numbers1.push(Number(matrix1.children[x].textContent))
        numbers2.push(Number(matrix2.children[x].textContent))
        numbers3.push(Number(matrix3.children[x].textContent))
    }

    let matrixOne = new Matrix(numbers1, 3, 3)
    let matrixTwo= new Matrix(numbers2, 3, 3)
    let matrixThree = new Matrix(numbers3, 3, 3)
    
    let result = new Matrix(['', '', '', '', '', '', '', '', ''],3,3)
    switch(chosenOption){
        case 0:{
            result = matrixOne.addMatrix(matrixTwo)
            break
        }
        case 1:{
            result = matrixOne.subMatrix(matrixTwo)
            break
        }
        case 2:{
            result = matrixOne.mulMatrix(matrixTwo)
            break
        }
        case 3:{
            result = matrixThree.transpose()
            break
        }
        case 4:{
            result = matrixThree.moc()
            break
        }
        case 5:{
            result = matrixThree.adjoint()
            break
        }
        case 6:{
            result = matrixThree.inverse()
            console.log('The Determinant is:', matrixThree.determinant())
            break
        }
    }
    let resultDiv = document.getElementById('result')
    let results = result.item
    for( let x=0; x<9;x++){
        resultDiv.children[x].textContent = results[x]
    }
}

