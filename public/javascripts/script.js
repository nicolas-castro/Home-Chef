document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');


  const ingredientBtn = document.getElementById('add-Ingredientsbtn');
  ingredientBtn.addEventListener('click', function(e) {

    const ingredientList = document.getElementById('add-Ingredients').value;

    document.getElementById("ingredientsList").innerHTML += `<li class='list-group-item col-md-4'>${ingredientList}</li>`;
    document.getElementById("ingredients-Db").value += `${ingredientList},`;
  });
 

}, false);


