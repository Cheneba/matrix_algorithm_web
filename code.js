<<<<<<< HEAD



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
=======



// represents the matrix in the document

function matrix_obj(item, row, column, connecFrom, code){
    this.item = item
    this.column = column 
    this.row = row
    this.connecFrom = connecFrom
    this.code = code
    this.update = function(){
        variable = this.connecFrom
        for(let x=0; x<9; x++){
            variable.children[x].innerText = this.item[x]
        }
    }
}


function matrix_soln(item, row, column, connecTo, code){
    matrix_obj.call(this, item, row, column, code, )
    this.connecTo = connecTo
    this.connecFrom = ''
    this.supply = function(){
        return [this.item, this.row, this.column, this.connecFrom, this.connecTo, this.code]
    }
    this.update = function(){
        source = this.connecFrom
        destination = this.connecTo
        // rce)
        // tination)
        for(let x=0; x<9; x++){
            this.item[x] = source.children[x].innerText
        }
        for(let x=0; x<9; x++){
            destination.children[x].innerText = this.item[x]
        }
    }
}
matrix_soln.prototype = Object.create(matrix_obj.prototype)


let matrix_1 = [false, new matrix_obj( [], 0, 0, document.getElementsByClassName('holder')[0], "M_00"  )]
let matrix_2 = [false, new matrix_obj( [], 0, 0, document.getElementsByClassName('holder')[1], "M_01"  )]
let matrix_3 = [false, new matrix_obj( [], 0, 0, document.getElementsByClassName('holder')[2], "M_02"  )]
let matrix_4 = [false, new matrix_obj( [], 0, 0, document.getElementsByClassName('holder')[3], "M_03"  )]
let matrix_5 = [false, new matrix_obj( [], 0, 0, document.getElementsByClassName('holder')[4], "M_04"  )]
let matrix_6 = [false, new matrix_obj( [], 0, 0, document.getElementsByClassName('holder')[5], "M_05"  )]
let matrix_7 = [false, new matrix_obj( [], 0, 0, document.getElementsByClassName('holder')[6], "M_06"  )]
let matrix_8 = [false, new matrix_obj( [], 0, 0, document.getElementsByClassName('holder')[7], "M_07"  )]
let matrix_9 = [false, new matrix_obj( [], 0, 0, document.getElementsByClassName('holder')[8], "M_08"  )]
let var1 = new matrix_soln( [], 0, 0, document.getElementById('solve_1'))
let var2 = new matrix_soln( [], 0, 0, document.getElementById('solve_2'))
let var3 = new matrix_soln( [], 0, 0, document.getElementById('solve_3'))

let holder = [matrix_1, matrix_2, matrix_3, matrix_4, matrix_5, matrix_6, matrix_7, matrix_8]


let opt = -1
let optChange = false
let id = ''
let previous = -1
let chosenOption = 0
let an=1

function execute(){
    let matrixOne = new Matrix(var1.item, var1.row, var1.column)
    let matrixTwo = new Matrix(var2.item, var2.row, var2.column)
    let matrixThree = new Matrix(var3.item, var3.row, var3.column)
    
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
    div = document.getElementById('result')
    
    if(result.item.length>0){
        for(let x=0; x<9; x++){
            div.children[x].innerText = result.item[x]
        }
    }
}


let check, current
function createMatrix(condition){
    if(condition){
        // GETS VALUES FOR NEW MATRIX
            list = document.getElementsByClassName("input")
        row = document.getElementById('create-row').value
        column = document.getElementById('create-column').value
        numbers = []
        for(let x=0; x<list.length; x++){
            numbers.push(list[x].value)
        }
    
        // CONNECT THE MATRIX WITH VALUES TO A MATRIX HOLDER
        for(let i=0; i<holder.length; i++){
            if(!holder[i][0]){
                holder[i][0] = true
                holder[i][1].item = numbers
                holder[i][1].row = row
                holder[i][1].column = column
                holder[i][1].update()
                check = i
                console.log(check)
                break
            }
        }
    }else {
        if(current!==check){
            current= check
        }else {
            current--
            check--
        }
        holder[current][0] = false
        holder[current][1].item = ['','','','','','','','','','','','','','','','','']
        holder[current][1].row = 0
        holder[current][1].column = 0
        holder[current][1].update()

    }
    
}




function option(index, code, value){
    chosenOption = index
    // senOption)
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


function addStyle(value){
    element = document.getElementsByClassName("checkbox")
    element[value].style.background = 'white'
    element[value].style.border = 'black'
    for(const child of element){
        if(child!==element[value]){
            child.style.background = 'black'
            child.style.border.color = 'white'
            child.style.border.width = '1px'
        }
        else{
            id = `M_0${value}`
        }
    }
}



// with value 'id' there is possibility of transfer

function linkMatrix(identifier){
    if(optChange){
        previous = -1
    }
    
    if(id!=='' && previous!==identifier && optChange){
        for(let a = 0; a<holder.length; a++){
            if(holder[a][1].code===id ){
                if(identifier===0){
                    var1.item = holder[a][1].item
                    var1.row = holder[a][1].row
                    var1.column = holder[a][1].column
                    var1.code = holder[a][1].code
                    var1.connecFrom = holder[a][1].connecFrom
                    var1.update()
                }else if(identifier===1) {
                    var2.item = holder[a][1].item
                    var2.row = holder[a][1].row
                    var2.column = holder[a][1].column
                    var2.connecFrom = holder[a][1].connecFrom
                    var2.update()
                }else if(identifier===2){
                    var3.item = holder[a][1].item
                    var3.row = holder[a][1].row
                    var3.column = holder[a][1].column
                    var3.connecFrom = holder[a][1].connecFrom
                    var3.update()
                }
                previous = identifier
                opt = chosenOption
                execute()
                break   
            }
        }
    }
}

// function matrix_structure(){
//     row = document.getElementById('create-row').value
//     column = document.getElementById('create-column').value
//     example = document.getElementsByClassName('prototype_matrix')
//     console.log(`${row}, ${column}`)
//     example = example[0]
    
// }












option(0, 0, '+')



function launch(link){
    window.open(link, '_self')
}

function reLoad(){
    location.reload()
    window.alert('reload successful!')
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



>>>>>>> 905a055e9e4d28ed4f92923bedd394dcf1e190d1
