// MATRIX MODULE

class Matrix{
    // Converts 2D matrix to 1D and vice versa
    update(data=[], use=1){
            let newItem=[], xItem = [];
        if(use===0){
            for(let x=0, z=0;x<this.row;x++){
                for(let y=0;y<this.column;y++){
                    newItem.push(data[x][y])
                }
            }
            return newItem
        }
        else if(use===1){
            if(data.length=== this.column) return [data]
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
    }
    
    constructor(item, row, column){
        this.item = item
        this.row = row
        this.column = column
        this.value = this.update(this.item, 1)
    }
    
    isSquare () { if(this.row === this.column) return true}
    isSingular(){ if(this.determinant==0) return true}
    getItem(_row, _column){
        return this.value[_row][_column]
    }
    // RETURNS A MATRIX
    transpose (data = this.value, _row = this.row, _column = this.column){
        let newMatrix=[], xItem=[], flag = false
        if(this.isSquare()){
            for(let x=0;x<_row;x++){
                for(let y=0, z=0;y<_column;y++){
                    if(_column===y) break
                    else{
                        xItem[z] = data[y][x]
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
        return new Matrix(this.update(newMatrix, 0), this.row,  this.column)
    }
    magnitude(data){
        return data[0][0]*data[1][1] - data[0][1]*data[1][0]
    }
    coFactor(x, y){
        let newMatrix=[], xItem=[]
        let accept = false
        for(let index=0; index<this.row; index++){
            for(let index_2=0, z=0; index_2<this.row; index_2++){
                if(index===x)break
                else if(index_2===y) continue
                else {
                    xItem[z] = this.value[index][index_2]
                    z++
                    accept = true
                }
            }
            if(accept){
                newMatrix.push(xItem)
                accept=false
            }
            xItem = []
        }
        let result = this.magnitude(newMatrix)
        return result
    }
    determinant(){
        let D=0
        if(this.isSquare() && this.row!==0){
            for(let y=0;y<this.column;y++){
                D += this.coFactor(0, y)
            }
        }
        return D
    }
    // Matrix of cofactors
    // RETURNS A MATRIX
    moc(){
        let newMatrix=[], xItem=[]
        if(this.isSquare()){
            for(let x=0;x<this.row;x++){
                for(let y=0;y<this.column;y++){
                    xItem[y] = this.coFactor(x, y)
                }
                newMatrix.push(xItem)
                xItem=[]
            }
            return new Matrix(this.update(newMatrix, 0), this.row,  this.column)
        }
        else console.log("Error as a non square matrix was inputed!")
    }
    
    adjoint(){
        if(this.isSquare){
            let newMatrix = this.moc().transpose()
            return newMatrix
        }
        else return NaN
    }
    inverse(){
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
            return new Matrix(this.update(inverse, 0), this.row,  this.column)
        }
    }
    addMatrix(sample){ 
        if (this.row === sample.row && this.column === sample.column){
            let newMatrix = [], xItem = []
            if(sample.item===[]) return new Matrix(undefined, undefined, undefined)
            for(let x=0;x<this.row;x++){
                for(let y=0;y<this.column;y++){
                    xItem[y] = Number(this.value[x][y])+Number(sample.value[x][y])
                }
                // console.log(xItem)
                newMatrix.push(xItem)
                xItem = []
            }
            // console.log(newMatrix)
            return new Matrix(this.update(newMatrix, 0), this.row, this.column)
        }
        else NaN
    }
    subMatrix(sample){
        if (this.row === sample.row && this.column === sample.column){
            let newMatrix = [], xItem = []
            if(sample.item===[]) return new Matrix([], 0, 0)
            for(let x=0;x<this.row;x++){
                for(let y=0;y<this.column;y++){
                    xItem[y] = Number(this.value[x][y])-Number(sample.value[x][y])
                }
                // console.log(xItem)
                newMatrix.push(xItem)
                xItem = []
            }
            // console.log(newMatrix)
            return new Matrix(this.update(newMatrix, 0), this.row, this.column)
        }
    }
    mulMatrix(sample){
        if (this.column === sample.row){

        }
    }

    
}
// let test = new Matrix([1, 6, 3, 2, -1, -5, 2, 3, 3], 3, 3)
// let test_2 = test.moc()

