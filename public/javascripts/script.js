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
  let monthNames = [
    "1", "2", "3",
    "4", "5", "6", "7",
    "8", "9", "10",
    "11", "12"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return monthNames[monthIndex] + '/' + day + '/' + year;
}


addEventListener('load', () => {
  
  let theDate = document.getElementsByClassName('date')
  let updateDate = document.getElementsByClassName('dateEdited')
  for(let i = 0; i < theDate.length; i++) {

  //date1 is equal to updatedAt from MongoDB
  //date2 generates today's date
  let date1 = updateDate[i].value
  let date2 = new Date();

  //formats both dates in order to calculate the difference in days between them
  let first = formatDate(new Date(date1));
  let second = formatDate(new Date(date2));

  function parseDate(str) {
    let mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second-first)/(1000*60*60*24));
}

// console.log(`Last updated ${datediff(parseDate(first), parseDate(second))} days ago`);

theDate[i].innerHTML += `Last updated ${datediff(parseDate(first), parseDate(second))} days ago`;

  }
})

document.addEventListener('DOMContentLoaded', () => {

  const likeBtn = document.getElementById('likes');
  let likes = 0;
  likeBtn.addEventListener('click', function(e) {
   
    console.log('button was clicked');
    
    $(function() {
      $('.button-like')
        .bind('click', function(event) {
          $(".button-like").toggleClass("liked");
        })
    });
    likes += 1;

    document.getElementById('recipeLikes').innerHTML = likes;


  })

  });
 









