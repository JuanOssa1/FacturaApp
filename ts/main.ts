let codeBarList = ["| ||| |","||  |||","   |||||| ","|| |||", "    |||||", "| |", "| |"];
console.log("Test TS")
const BASE = 10

function getIdSum(numbers:string) {
    let id=0;
    let b = 0;
    let c = 0;
    for (let i = 0; i <= numbers.length-2; i+=2) {
        if(i+1<numbers.length){
            b= Math.pow(BASE,parseInt(numbers[i+1]))
        }
        if(i+2<numbers.length){
            c= parseInt(numbers[i+2])
        }
        id += b * c;
    }
    return id + parseInt(numbers[0])
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
            numbersString+=elementCounter
            elementCounter=1
        }
    }
    if(barCode.slice(-1)== " "){
        numbersString+=0
    }
    return getIdSum(numbersString)
}
function getBarIdsArray(codeBarList:string[]=[]) {
    for (const barCode of codeBarList) {
        console.log(processBarCode(barCode)) 
    }
}
getBarIdsArray(codeBarList)