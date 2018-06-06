//    Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e) {
   document.querySelector('#results').style.display = 'none';
   document.querySelector('#loading').style.display = 'block';
   setTimeout(calculateResults, 2000);
   e.preventDefault();
});

function calculateResults() {

   let amount = document.querySelector('#amount');
   let interest = document.querySelector('#interest');
   let years = document.querySelector('#years');
   let monthlyPayment = document.querySelector('#monthly-payment');
   let totalPayment = document.querySelector('#total-payment');
   let totalInterest = document.querySelector('#total-interest');

   let principal = parseFloat(amount.value);
   let calculatedInterest = parseFloat(interest.value) / 100 / 12;
   let calculatedPayments = parseFloat(years.value) * 12;

   let x = Math.pow(1 + calculatedInterest, calculatedPayments);
   let monthly = (principal*x*calculatedInterest)/(x-1);

   if(isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
      document.querySelector('#results').style.display = 'block';
      document.querySelector('#loading').style.display = 'none';
   } else {
   showError('Check your Numbers')
}

}
//       Show Error
function showError(error) {
   let errorDiv = document.createElement('div');
   let card = document.querySelector('.card');
   let heading = document.querySelector('.heading');
   document.querySelector('#results').style.display = 'none';
   document.querySelector('#loading').style.display = 'none';
   errorDiv.className = 'alert alert-danger';
   errorDiv.appendChild(document.createTextNode(error));
   card.insertBefore(errorDiv, heading);
   setTimeout(clearError, 1500);
}

function clearError(){
   document.querySelector('.alert').remove();
}
