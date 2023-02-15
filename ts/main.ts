let codeBarList = ["| ||| |","||  |||","   |||||| ","|| |||"];
console.log("Test TS")
const BASE = 10

function getIdSum(numbers:string) {
    for (const stringNumber of numbers) {

    }
}
const processBarCode = (barCode:string) => {
    let elementCounter=1;
    let numbersString=""
    if(barCode[0] != "|"){
        numbersString+=0
    }
    for (let i = 0; i < barCode.length; i++) { 
        if (barCode[i] == barCode[i+1]){
            elementCounter++;
        }
        else{
            if(barCode[i]==" "){
                elementCounter=Math.pow(BASE,elementCounter)
            }
            numbersString+=elementCounter
            elementCounter=1
        }
    }
    if(barCode.slice(-1)== " "){
        numbersString+=0
    }
    return numbersString
}
function getBarIdsArray(codeBarList:string[]=[]) {
    for (const barCode of codeBarList) {
        console.log(processBarCode(barCode)) 
    }
}
//console.log("Hiii")
getBarIdsArray(codeBarList)