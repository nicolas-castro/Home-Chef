document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');


  const ingredientBtn = document.getElementById('add-Ingredientsbtn');
  ingredientBtn.addEventListener('click', function(e) {

    const ingredientList = document.getElementById('add-Ingredients').value;

    document.getElementById("ingredientsList").innerHTML += `<li class='list-group-item '>${ingredientList}</li>`;
    document.getElementById("ingredients-Db").value += `${ingredientList},`;
    document.getElementById('add-Ingredients').value = '';
  });

}, false);

document.addEventListener('DOMContentLoaded', () => {

  const editIngredientBtn = document.getElementById('edit-Ingredientsbtn');
  editIngredientBtn.addEventListener('click', function(e) {
   
    console.log('button was clicked');

    const ingredientList = document.getElementById('add-Ingredients').value;

    document.getElementById("ingredientsList").innerHTML += `<li class='list-group-item '>${ingredientList}</li>`;
    document.getElementById("ingredients-Db").value += `,${ingredientList},`;
    document.getElementById('add-Ingredients').value = '';
  });
 

}, false);


function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return 'Last Edited On: ' + monthNames[monthIndex] + ', ' + day + ', ' + year;
}

function days_between(date1, date2) {

  // The number of milliseconds in one day
  var ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(date1_ms - date2_ms);

  // Convert back to days and return
  return 'Number of days: ' +  Math.round(difference_ms/ONE_DAY);

}

const date2 = document.getElementById('dateEdited').value;
const date1 = new Date();

document.getElementById('date').innerHTML += days_between(date1, date2);


// const dateStamp = document.getElementById('dateEdited').value;

// document.getElementById('date').innerHTML += formatDate(new Date(`${dateStamp}`));




