const totalCost = document.getElementById('total_cost'),
   anInitialFee = document.getElementById('an_initial_fee'), 
     creditTerm = document.getElementById('credit_term');


  const totalCostRange = document.getElementById('total_cost_range'),
     anInitialFeeRange = document.getElementById('an_initial_fee_range'), 
       creditTermRange = document.getElementById('credit_term_range');

const totalAmountJfCredit = document.getElementById('amount_of_credit'),
      totalMonthlyPayment = document.getElementById('monthly_payment'), 
   totalRecommendedIncome = document.getElementById('recommended_income');

const inputsRange = document.querySelectorAll('.input_range');
const bankBtns = document.querySelectorAll('.bank');

const assingValue = ()=>{
  totalCost.value = totalCostRange.value;
  anInitialFee.value = anInitialFeeRange.value;
  creditTerm.value = creditTermRange.value;
};
const rangeValue = ()=>{
  totalCostRange.value = totalCost.value;
  anInitialFeeRange.value = anInitialFee.value;
  creditTermRange.value = creditTerm.value;
};
assingValue();

totalCost.addEventListener('input', ()=>{
  rangeValue();
  calculation(totalCost.value,  anInitialFee.value, creditTerm.value);
})
anInitialFee.addEventListener('input', ()=>{
  rangeValue();
  calculation(totalCost.value,  anInitialFee.value, creditTerm.value);
})
creditTerm.addEventListener('input', ()=>{
  rangeValue();
  calculation(totalCost.value,  anInitialFee.value, creditTerm.value);
})
const banks = [
    {
      name: 'alfa',
      precent: 8.7
    },
    {
      name: 'sberbank',
      precent: 8.4
    },
    {
      name: 'pochta',
      precent: 7.9
    },
    {
      name: 'tinkoff',
      precent: 9.2
    }
];
let currentPrecent = banks[0].precent;
for(let bank of bankBtns){
      bank.addEventListener('click', ()=>{
        for(let items of bankBtns){
          items.classList.remove('active');
        };
        bank.classList.add('active');
        takeActiveBank(bank);
      });
};

const takeActiveBank = currentActive =>{
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find( bank => bank.name === dataAttrValue);
    currentPrecent = currentBank.precent;
    calculation(totalCost.value,  anInitialFee.value, creditTerm.value);
};
for(let input of inputsRange){
  input.addEventListener('input', ()=>{
    assingValue();
    calculation(totalCost.value,  anInitialFee.value, creditTerm.value);
  })
};

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1)=>{
  let monthlyPayment; 
  let lounAmount = totalCost - anInitialFee;
  let interesRate = currentPrecent;
  let numberOfYears = creditTerm;
  let numberOfMonth = 12* numberOfYears;
  monthlyPayment = (lounAmount + (((lounAmount / 100) * interesRate) / 12) * numberOfMonth) / numberOfMonth;
  const monthlyPaymentArounded = Math.round(monthlyPayment);
  if (monthlyPaymentArounded < 0 ) {
    return false
  } else{
    totalAmountJfCredit.innerHTML = `${lounAmount} Р`;
    totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} Р`;
    totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)} Р`
  }
};

const animItems = document.querySelectorAll(`._anim-items`)
if (animItems.length > 0) {
    window.addEventListener(`scroll`, animOnScroll)

    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index]
            const animItemHeight = animItem.offsetHeight
            const animItemOffSet = offset(animItem).top
            const animStart = 4;
            let animItemPoint = window.innerHeight - animItemHeight / animStart
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }
            if ((pageYOffset > animItemOffSet - animItemPoint) && pageYOffset < (animItemOffSet + animItemHeight)) {
                animItem.classList.add(`_active`)
            } else {
                if (!(animItem.classList.contains(`_anim-no-hide`))) {
                    animItem.classList.remove(`_active`)
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect()
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    setTimeout(() => {
        animOnScroll()
    }, 300)
}