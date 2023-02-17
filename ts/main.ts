const url = "http://localhost:3000/products"
const formInputQuantity = document.getElementById("inputQuantityId")! as HTMLInputElement
const formInputBarCode = document.getElementById("inputCodeBarId")! as HTMLInputElement
const theadTag =  document.getElementById("table__head-id")! as HTMLElement
const formButton = document.getElementById("scan-button-id")! as HTMLButtonElement
const grandTotalTag = document.getElementById("grand-total-id")! as HTMLElement;

let codeBarList = ["| ||| |","||  |||","   |||||| ","|| |||", "    |||||", "| |", "| |"];
console.log("Test TS")
const BASE = 10

let grandTotal: number=0;
let products: productInterface[];




function fetchData () {
    fetch(url).then((response)=>{
        return response.json();
    }).then((data: productInterface[])=>{
        products = data
    }).catch((error)=>{
        error
    }) 
}
fetchData()

function addRow() {
    
}

function filterProducts(productsToFilter: productInterface[], decisionAttribute: string) {
    const resul = productsToFilter.filter((product: productInterface)=>{
        return product.id == decisionAttribute
    })
    return resul[0];  
}
function createTableRow(...tagContent: string[]) {
    let tableRow = document.createElement("tr")
    tableRow.classList.add("table__tr")
    for (const content of tagContent) {
        let newTag = document.createElement("th")
        newTag.classList.add("table__th")
        newTag.innerHTML = content;
        tableRow.appendChild(newTag)
    }
    return tableRow;
}

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

function getSubTotal(price:number, quantity:number) {
    return price*quantity;
}
function getGrandTotal(subTotal:number) {
    grandTotal+=subTotal
    
    return grandTotal;
}

formButton.addEventListener("click",()=>{
    const productToShow = filterProducts(products,processBarCode(formInputBarCode.value).toString())
    let productPrice = productToShow.price
    let productQuanity = parseInt(formInputQuantity.value)
    let subTotal = getSubTotal(productPrice,productQuanity)
    grandTotalTag.innerHTML = getGrandTotal(subTotal).toFixed(2).toString()
    theadTag.appendChild(createTableRow(productToShow.id, productToShow.title, productPrice.toString(),productQuanity.toString(),subTotal.toString()))
    
})

