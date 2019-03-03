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



