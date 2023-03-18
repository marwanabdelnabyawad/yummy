let logo = document.getElementById("logo")
let boxData = document.getElementById("boxData");
let searchBox = document.getElementById("searchBox");

// links elements
let search = document.getElementById("search");
let Categories = document.getElementById("Categories");
let Area = document.getElementById("Area");
let Ingredients = document.getElementById("Ingredients");
let Contact = document.getElementById("Contact");

// start website
$(document).ready(() => {
  searchByName("")
})

logo.addEventListener('click',()=>{
  searchByName('');
})

// open & close nav

function openNav() {
  // animation for nav
  $('.side-nav-menu').animate({ left: `${0}px` }, 500)
  // change font awesome
  $('.open-close-icon').removeClass('fa-align-justify')
  $('.open-close-icon').addClass('fa-x')
}

function closeNav() {
  // get width for nav
  let linksWidth = $(".side-nav-menu .nav-tab").outerWidth();
  // animation for nav
  $(".side-nav-menu").animate({ left: `-${linksWidth}px` }, 500)
  // change font awesome
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
}
closeNav();

// nav action
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeNav()
  } else {
    openNav()
  }
})



// meals (category,area,Ingredients) ***********************

function showMeals(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
  }
  boxData.innerHTML = cartona;
}


// categories ************************

async function getCategories() {
  $('.loading').removeClass('d-none')
  boxData.innerHTML = '';
  searchBox.innerHTML = '';
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json()
  $('.loading').addClass('d-none')
  showCategories(response.categories);
  closeNav();
};

function showCategories(categoriesList) {
  let cartona = ''
  for (let i = 0; i < categoriesList.length; i++) {
    cartona += `
        <div class="col-md-3">
        <div
          onclick="getCategoryMeals('${categoriesList[i].strCategory}')"
          class="meal position-relative overflow-hidden rounded-2 cursor-pointer"
        >
          <img
            class="w-100"
            src="${categoriesList[i].strCategoryThumb}"
            alt=""
            srcset=""
          />
          <div
            class="meal-layer position-absolute text-center text-black p-2"
          >
            <h3>${categoriesList[i].strCategory}</h3>
            <p>
              ${categoriesList[i].strCategoryDescription}
            </p>
          </div>
        </div>
      </div>
        `
  }
  boxData.innerHTML = cartona;
};
Categories.addEventListener('click', getCategories)


// meals Of category *************************


async function getCategoryMeals(category) {
  $('.loading').removeClass('d-none')
  boxData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  response = await response.json()
  showMeals(response.meals.slice(0, 20))
  $('.loading').addClass('d-none')
  closeNav();
}


// area *********************

async function getArea() {
  $('.loading').removeClass('d-none')
  boxData.innerHTML = '';
  searchBox.innerHTML = '';
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response = await response.json()
  $('.loading').addClass('d-none')
  showArea(response.meals);
  closeNav();
}

function showArea(areaList) {
  let cartona = "";
  for (let i = 0; i < areaList.length; i++) {
    cartona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${areaList[i].strArea}')" class="rounded-2 text-center pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${areaList[i].strArea}</h3>
                </div>
        </div>
        `
  }
  boxData.innerHTML = cartona;
}
Area.addEventListener('click', getArea);

// meals of area ************************

async function getAreaMeals(area) {
  $('.loading').removeClass('d-none')
  boxData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json()
  $('.loading').addClass('d-none')
  showMeals(response.meals.slice(0, 20))
  closeNav();
}

// Ingredients ***********************

async function getIngredients() {
  $('.loading').removeClass('d-none')
  boxData.innerHTML = '';
  searchBox.innerHTML = '';
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json()
  $('.loading').addClass('d-none')
  showIngredients(response.meals.slice(0, 20));
  closeNav();
}

function showIngredients(IngredientsList) {
  let cartona = "";
  for (let i = 0; i < IngredientsList.length; i++) {
    cartona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${IngredientsList[i].strIngredient}')" class="rounded-2 text-center pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${IngredientsList[i].strIngredient}</h3>
                        <p class="cut-text">${IngredientsList[i].strDescription}</p>
                </div>
        </div>
        `
  }
  boxData.innerHTML = cartona;
}
Ingredients.addEventListener('click', getIngredients)

// meals of ingredients ***************************

async function getIngredientsMeals(ingredients) {
  $('.loading').removeClass('d-none')
  boxData.innerHTML = ""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  response = await response.json()
  $('.loading').addClass('d-none')
  showMeals(response.meals.slice(0, 20));
  closeNav();
}

// show details *****************

async function getMealDetails(mealID) {
  $('.loading').removeClass('d-none')
  boxData.innerHTML = ""
  searchBox.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  response = await response.json();

  $('.loading').addClass('d-none')
  displayMealDetails(response.meals[0])
  closeNav()
}


function displayMealDetails(meal) {

  searchBox.innerHTML = "";
  let strIngredient = '';
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      strIngredient += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
  }

  let tags = meal.strTags;
  let tagsStr = ''
  if (tags == null) {
    tagsStr = '';
  } else {
    tagsStr += `
    <li class="alert alert-danger m-2 p-1">${tags}</li>`;
  }


  let cartona = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${strIngredient}
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`

  boxData.innerHTML = cartona
}


// search *******************
// show search inputs ***

function displaySearch() {
  $('.loading').removeClass('d-none')
  searchBox.innerHTML = `
    <div class="row py-4">
    <div class="col-md-6">
      <input
        onkeyup="searchByName(this.value)"
        class="form-control bg-transparent text-white"
        type="text"
        placeholder="Search By Name"
      />
    </div>
    <div class="col-md-6">
      <input
        onkeyup="searchByChar(this.value)"
        maxlength="1"
        class="form-control bg-transparent text-white"
        type="text"
        placeholder="Search By First Letter"
      />
    </div>
  </div>
    `
  boxData.innerHTML = ''
  closeNav()
  $('.loading').addClass('d-none')
}
search.addEventListener('click', displaySearch);

// search by name *******
async function searchByName(mealName) {
  closeNav()
  boxData.innerHTML = ""
  $('.loading').removeClass('d-none')

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
  response = await response.json()
  console.log(response);
  response.meals && showMeals(response.meals);
  $('.loading').addClass('d-none')

}

// search by char ******
async function searchByChar(char) {
  closeNav()
  boxData.innerHTML = ""
  $('.loading').removeClass('d-none')

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${char}`)
  response = await response.json()
  response.meals && showMeals(response.meals);
  $('.loading').addClass('d-none')

}


// Contact ***************************

let nameFocus = false;
let emailFocus = false;
let phoneFocus = false;
let ageFocus = false;
let passwordFocus = false;
let repasswordFocus = false;


function showContacts() {
  boxData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter a valid password * Minimum seven characters, the first of which is a capital letter and at least one number: *
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `


  document.getElementById("nameInput").addEventListener("focus", () => {
    nameFocus = true
  })

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailFocus = true
  })

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneFocus = true
  })

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageFocus = true
  })

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordFocus = true
  })

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordFocus = true
  })
}
Contact.addEventListener('click', showContacts)



function inputsValidation() {
  if (nameFocus) {
      if (nameValidation()) {
          document.getElementById("nameAlert").classList.replace("d-block", "d-none")

      } else {
          document.getElementById("nameAlert").classList.replace("d-none", "d-block")

      }
  }
  if (emailFocus) {

      if (emailValidation()) {
          document.getElementById("emailAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("emailAlert").classList.replace("d-none", "d-block")

      }
  }

  if (phoneFocus) {
      if (phoneValidation()) {
          document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

      }
  }

  if (ageFocus) {
      if (ageValidation()) {
          document.getElementById("ageAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("ageAlert").classList.replace("d-none", "d-block")

      }
  }

  if (passwordFocus) {
      if (passwordValidation()) {
          document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

      }
  }
  if (repasswordFocus) {
      if (repasswordValidation()) {
          document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

      }
  }


  if (nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()) {
      submitBtn.removeAttribute("disabled")
  } else {
      submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
  return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
  return (/^01[0125][0-9]{8}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
