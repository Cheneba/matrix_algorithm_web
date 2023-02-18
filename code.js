


let matrixUl
let matrix1 = document.getElementsByClassName('field_box')[0].parentElement
let matrix2 = document.getElementsByClassName('field_box')[1].parentElement
let matrix3 = document.getElementsByClassName('field_box')[2].parentElement
let matrixCounter = -1
let optChange = false
let chosenOption = 0

function execute(){
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
    
    let result = new Matrix()
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
            // result = matrixOne.mulMatrix(matrixTwo)
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
            break
        }
    }
    let resultDiv = document.getElementById('result')
    let results = result.item
    for( let x=0; x<9;x++){
        resultDiv.children[x].textContent = results[x]
    }
}


function createMatrix(){
    container = document.getElementsByClassName('container')

    if(matrixCounter>=7){
        return false
    }

    matrixCounter+=1
        // GETS VALUES FOR NEW MATRIX
    input = document.getElementsByClassName("input")
    row = document.getElementById('create-row').value
    column = document.getElementById('create-column').value
    numbers = []

    for(let x=0; x<row*column; x++){
        numbers.push(input[x].value)
    }

        //CREATES THE NEW MATRIX
    newMatrix = document.createElement('ul')

    newMatrix.classList.add('matrix')

    for ( let number of numbers){
        li = document.createElement('li');
        li.textContent = number
        newMatrix.appendChild(li)
    }

    li = document.createElement('li')
    li.classList.add('checkbox')
    li.setAttribute('onclick', `getMatrix(${matrixCounter})`)
    newMatrix.appendChild(li)
    
    container[0].appendChild(newMatrix)
         
}


function delMatrix(){
    container = document.getElementsByClassName('container')
    
    if(matrixCounter<=-1){
        return false
    }

    matrixCounter-=1

    container = container[0]
    container.removeChild(container.lastElementChild)
}


function option(index, code, value){
    chosenOption = index
    
    optChange=true

    // SELECTS THE ITEMS ON DOCUMENT
    let board = document.getElementsByClassName("operation")
    let options = document.getElementById("options")
    let item1 = document.getElementsByClassName('sign')
    let item2 = document.getElementsByClassName('operate')
    
    // APPLIES EFFECTS ON CLICKING
    for(const child of options.children){
        child.style.background = 'transparent'
        child.style.width = '65%'
    }
    options.children[index].style.background = '#858181'
    options.children[index].style.width = '72%'
    
    if(code===0){
        board[0].style.display = 'flex'
        board[1].style.display = 'none'
        item1[0].innerText = value
    }
    else if(code===1){
        board[1].style.display = 'flex'
        board[0].style.display = 'none'
        item2[0].innerText = value
    }
    execute()
}


function getMatrix(value){
    set = document.querySelectorAll('.checkbox')
    matrixUl = set[value].parentElement
    
    buttons = document.getElementsByClassName("checkbox")
    buttons[value].style.background = 'white'
    buttons[value].style.borderColor = 'black'
    for(let child of buttons){
        if(child!==buttons[value]){
            child.style.background = 'black'
            child.style.borderColor = 'white'
            child.style.borderWidth = '1px'
        }
    //     else{
    //         id = `M_0${value}`
    //     }
    }
}


function linkMatrix(item){
    let fieldMatrix = document.getElementsByClassName('field_box')[item].parentElement
    let counter=0
    do{
        fieldMatrix.children[counter].textContent = matrixUl.children[counter].textContent
        counter++     
    }
    while(counter<=9)
    execute()
}














option(0, 0, '+')



function launch(link){
    window.open(link, '_self')
}

function reLoad(){
    location.reload()
}

function change(code){
    element1 = document.getElementsByClassName('signup');
    element2 = document.getElementsByClassName('login');
    if(code=='r') {
        element2[0].style.display = 'none'
        element1[0].style.display = 'block';
        document.getElementById('reg').style.background = 'orange'
        document.getElementById('log').style.background = 'transparent'
    }
    else if(code=='l'){
        element1[0].style.display = 'none'
        element2[0].style.display = 'block'
        document.getElementById('log').style.background = 'orange'
        document.getElementById('reg').style.background = 'transparent'
    }
}
