// MATRIX MODULE

function matrix(item, row, column ){
    this.item = item
    this.row = row
    this.column = column
    this.convert = function(data){
        let newItem=[], xItem = [];
        if(data.length=== this.row) return this.item
        else{
            for(let x=0, z=0;x<this.row;x++){
                for(let y=0;y<this.column;y++){
                    xItem[y] = data[z]
                    z++;
                }
                newItem.push(xItem)
                xItem = []
            }
            return newItem
        }
    }
    
    this.value = this.convert(this.item)
    this.isSquare = () => { if(this.row === this.column) return true}
    this.isSingular = () => { if(this.determinant==0) return true}
    this.getIndex = function(_row, _column){
        return this.item[_row][_column]
    }
    this.coFactor = function(_row, _column){
        let newMatrix=[], xItem=[], flag = false
        if(this.isSquare()){
            for(let x=0;x<this.row;x++){
                for(let y=0, z=0;y<this.column;y++){
                    if(_row===x) break
                    else if(_column===y) continue
                    else{
                        xItem[z] = this.value[x][y]
                        z++
                        flag = true
                    }
                }
                if(flag) {
                    newMatrix.push(xItem)
                    xItem = []
                    flag = false
                }
            }
        }
        if(newMatrix.length==1) return newMatrix[0]
        return newMatrix[0][0]*newMatrix[1][1]-newMatrix[0][1]*newMatrix[1][0]
    }
    this.determinant = function(){
        let deter=0
        if(this.isSquare() && this.row>=3){
            for(let y=0;y<this.column;y++){
                deter += this.coFactor(0, y)
            }
        }
        return deter
    }
    this.wacha = function(){
        let newMatrix=[], xItem=[]
        if(this.isSquare()){
            for(let x=0;x<this.row;x++){
                for(let y=0;y<this.column;y++){
                    xItem[y] = this.coFactor(x, y)
                }
                newMatrix.push(xItem)
                xItem=[]
            }
            return new matrix(newMatrix, this.row, this.column)
        }
        else return "Error as a non square matrix was inputed!"
    }
    this.transpose = function(){
        let newMatrix=[], xItem=[]
        for(let x=0;x<this.column;x++){
            for(let y=0;y<this.row;y++){
                xItem[y] = this.value[y][x]                
            }
            newMatrix.push(xItem)
            xItem=[]
        }
        return new matrix(newMatrix, this.column, this.row)
    }
    this.adjoint = function(){
        if(this.isSquare){
            let newMatrix = this.wacha().transpose()
            return newMatrix
        }
        else return NaN
    }
    this.inverse = function(){
        if(this.isSquare && this.isSingular){
            let Matrix = this.adjoint(), deter = this.determinant()
            let inverse=[], xItem = []
            let newMatrix = Matrix.value
            for(let x=0;x<this.row;x++){
                for(let y=0;y<this.column;y++){
                    xItem[y] = newMatrix[x][y]/deter
                }
                inverse.push(xItem)
                xItem = []
            }
            return new matrix(inverse, this.row, this.column)
        }
    }
    this.addMatrix = function(sample){ 
        if (this.row === sample.row && this.column === sample.column){
            let newMatrix = [], xItem = []
            for(let x=0;x<this.row;x++){
                for(let y=0;y<this.column;y++){
                    xItem[y] = this.value[x][y]+sample.value[x][y]
                }
                console.log(xItem)
                newMatrix.push(xItem)
                xItem = []
            }
            console.log(newMatrix)
            return new matrix(newMatrix, this.row, this.column)
        }
        else NaN
    }
    this.subMatrix = function(sample){
        if (this.row === sample.row && this.column === sample.column){
            let newMatrix = [], xItem = []
            for(let x=0;x<this.row;x++){
                for(let y=0;y<this.column;y++){
                    xItem[y] = this.value[x][y]-sample.value[x][y]
                }
                console.log(xItem)
                newMatrix.push(xItem)
                xItem = []
            }
            console.log(newMatrix)
            return new matrix(newMatrix, this.row, this.column)
        }
        else NaN
    }
    this.mulMatrix = function(sample){
        if (this.column === sample.row){

        }
    }
}

const matrix1 = new matrix([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 3)
const matrix2 = new matrix([6, 2, 3, 3, 8, 11, 7, 8, -1], 3, 3)