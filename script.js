
let BASE_URL = "https://v6.exchangerate-api.com/v6/60abbe41fe042be59176343d/latest/"
let convertBtn = document.querySelector(".convert");
let dropdowns = document.querySelectorAll(".dropdown");
for(let select of dropdowns){
  for(let currency in countryList){
     let new_opt = document.createElement("option");
     new_opt.innerText = currency;
     new_opt.value = currency;
     select.appendChild(new_opt);
     if(select.name === "from" && currency === "USD"){
         new_opt.selected = "selected"
     }
     if(select.name === "to" && currency === "INR"){
      new_opt.selected = "selected"
     }
  }
  select.addEventListener("change", (evt)=>{
     updateFlag(evt.target);
  })
}
const updateFlag = (element)=>{
let countryCode = countryList[element.value];
let img = element.parentElement.querySelector("img");
img.src = `https://flagsapi.com/${countryCode}/flat/64.png`
}

convertBtn.addEventListener("click",async()=>{
  let fromValue = document.getElementById("from-dropdown");
  let toValue = document.getElementById("to-dropdown");
  let currCode_from = fromValue.value;
  let currCode_to = toValue.value;
  let amount = document.querySelector("input");
  let currencyRate =await fetch(`https://v6.exchangerate-api.com/v6/60abbe41fe042be59176343d/latest/${currCode_from}`)
  let data =await currencyRate.json()
   let total_amt = amount.value * data.conversion_rates[currCode_to]
   let msg = document.querySelector(".msg");
   msg.innerText = `${amount.value}${currCode_from} = ${total_amt}${currCode_to}`
})