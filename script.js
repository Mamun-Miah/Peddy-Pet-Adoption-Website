const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const hideData = document.getElementById("hide-data");
const makeCardDiv = document.getElementById("makeCardDiv");
const sideDivEle = document.getElementById("side-div");
const rightSideElement = document.getElementById("right-side");
const spinnerEle = document.getElementById("loading-div");

//category api fetch
async function getCategoryData() {
  const url = "https://openapi.programming-hero.com/api/peddy/categories";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    displayCateElement(data.categories);
  } catch (error) {
    console.error(error.message);
  }
}
//show category button
function displayCateElement(data) {
  data.forEach(element => {
    let btn = document.createElement("div");
    btn.innerHTML = `<div>
      <button onclick="fetchCategoryApi('${element.category}'); activeButton(this);" class="flex justify-center gap-2 border-2 p-2 rounded-lg my-btn w-36"><img class="w-5 h-5" src="${element.category_icon}" alt="" />${element.category}</button>
    </div>`;
    document.getElementById('cate-btn-div').append(btn);
  });
}
//call category data
getCategoryData();

// active btn
function activeButton(button) {
  const buttons = document.querySelectorAll(".my-btn");
  buttons.forEach(btn => btn.classList.remove("active", "rounded-full"));
  button.classList.add("active", "rounded-full");
}
//fetch card fetch api
async function fetchCardApi() {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const cardData = await response.json();
    rightSideElement.classList.add("hidden");
    setTimeout(() => {
      spinnerEle.classList.add("hidden");
      rightSideElement.classList.remove("hidden");
    }, 2000);
    loadCardData(cardData.pets);
  } catch (error) {
    console.error(error.message);
  }
}

// Display Card data
function loadCardData(displayData) {
  setTimeout(() => {
    displayData.forEach(cardDataElement => {
      let card = document.createElement("div");
      card.innerHTML = `
            <div class="card card-compact bg-base-100 mx-auto p-3 border-2">
              <figure>
                <img class="h-40 object-cover rounded-md"
                  src="${cardDataElement.image}"
                  alt="Image"
                />
              </figure>
              <div class="card-body">
                <h2 class="text-lg font-bold">${cardDataElement.pet_name}</h2>
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=50&id=44642&format=png"
                    alt=""
                  />Breed: ${cardDataElement.breed ? cardDataElement.breed : "Not Available"}
                </p>
  
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=50&id=60611&format=png"
                    alt=""
                  />Birth: ${cardDataElement.date_of_birth
          ? cardDataElement.date_of_birth
          : "Not Available"
        }
                </p>
  
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=48&id=pWHTqEPPfa0v&format=png"
                    alt=""
                  />Gender: ${cardDataElement.gender ? cardDataElement.gender : "Not Available"}
                </p>
  
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=24&id=85782&format=png"
                    alt=""
                  />Price: ${cardDataElement.price ? cardDataElement.price : "Not Available"} $
                </p>
  
                <div class="flex items-center justify-between gap-1">
              <button id="${cardDataElement.petId}" onclick="likeBtn('${cardDataElement.image
        }')" class="like-btn border-2 rounded-md px-2 py-3 hover:bg-green-500">
                    <img class="w-5 h-3" src="https://img.icons8.com/?size=24&id=u8MTpAq972MG&format=png" alt=""/>
              </button>
              <button onclick="adopBtn(); disableBtn(this);" class="border-2 rounded-md px-2 py-2 text-cyan-700 font-semibold hover:bg-green-500 hover:text-white">
                    Adopt
              </button>
              <button onclick='detailsBtn("${cardDataElement.petId
        }")' class="hover:text-white hover:bg-green-500 border-2 rounded-md px-2 py-2 text-cyan-700 font-semibold">Details
              </button>
                </div>
              </div>
            </div>
        </div>`;
      makeCardDiv.append(card);
      document.getElementById("side-div").classList.remove("hidden");
    });
  }, 2100);
}

//call fetchCardApi
fetchCardApi();

// fetch category API
async function fetchCategoryApi(id) {
  res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  );
  categorData = await res.json();
  spinnerEle.classList.remove("hidden");
  makeCardDiv.classList.add("hidden");
  rightSideElement.classList.add("hidden");
  setTimeout(() => {
    spinnerEle.classList.add("hidden");
    rightSideElement.classList.remove("hidden");
  }, 2000);
  displayCategoryData(categorData.data);
}
// Display Category Wise Data
function displayCategoryData(items) {
  makeCardDiv.innerHTML = "";
  hideData.classList.add("hidden");
  setTimeout(() => {
    if (items.length == 0) {
      makeCardDiv.classList.add("hidden");
      hideData.classList.remove("hidden");
      rightSideElement.classList.add("hidden");
    }
    items.forEach((cardDataElement) => {
      makeCardDiv.classList.remove("hidden");
      let card = document.createElement("div");
      card.innerHTML = `
            <div class="card card-compact bg-base-100 mx-auto p-3 border-2">
              <figure>
                <img class="h-40 object-cover rounded-md"
                  src="${cardDataElement.image}"
                  alt="Image"
                />
              </figure>
              <div class="card-body">
                <h2 class="text-lg font-bold">${cardDataElement.pet_name}</h2>
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=50&id=44642&format=png"
                    alt=""
                  />Breed: ${cardDataElement.breed ? cardDataElement.breed : "Not Available"}
                </p>
  
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=50&id=60611&format=png"
                    alt=""
                  />Birth: ${cardDataElement.date_of_birth
          ? cardDataElement.date_of_birth
          : "Not Available"
        }
                </p>
  
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=48&id=pWHTqEPPfa0v&format=png"
                    alt=""
                  />Gender: ${cardDataElement.gender ? cardDataElement.gender : "Not Available"}
                </p>
  
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=24&id=85782&format=png"
                    alt=""
                  />Price: ${cardDataElement.price ? cardDataElement.price : "Not Available"} $
                </p>
  
                <div class="flex items-center justify-between gap-1">
                   <button id="${cardDataElement.petId}" onclick="likeBtn('${cardDataElement.image
        }')" class="like-btn border-2 rounded-md px-2 py-3 hover:bg-green-500">
                    <img class="w-5 h-3" src="https://img.icons8.com/?size=24&id=u8MTpAq972MG&format=png" alt=""/>
                  </button>
                  <button onclick="adopBtn(); disableBtn(this);" class="border-2 rounded-md px-2 py-2 text-cyan-700 font-semibold hover:bg-green-500 hover:text-white">
                    Adopt
                  </button>
                  <button onclick='detailsBtn("${cardDataElement.petId
        }")' class="hover:text-white hover:bg-green-500 border-2 rounded-md px-2 py-2 text-cyan-700 font-semibold">Details
                  </button>
                </div>
              </div>
            </div>
        </div>`;
      makeCardDiv.append(card);
      document.getElementById("side-div").classList.remove("hidden");
    });
  }, 2100);
}

////////1st part done

async function getSortApi() {
  response = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
  sortApiData = await response.json();
  spinnerEle.classList.remove("hidden");
  rightSideElement.classList.add("hidden");
  setTimeout(() => {
    spinnerEle.classList.add("hidden");
    rightSideElement.classList.remove("hidden");
  }, 2000);
  sortFunction(sortApiData.pets);
}
// Sort Function
function sortFunction(patData) {
  hideData.classList.add("hidden");
  let sortedPrice = patData.sort((a, b) => b.price - a.price);
  showData(sortedPrice);
}
function showData(data) {
  makeCardDiv.innerHTML = "";
  makeCardDiv.classList.remove("hidden");
  setTimeout(() => {
    data.forEach((element2) => {
      let card = document.createElement("div");
      card.innerHTML = `
            <div class="card card-compact bg-base-100 mx-auto p-3 border-2">
              <figure>
                <img class="h-40 object-cover rounded-md"
                  src="${element2.image}"
                  alt="Image"
                />
              </figure>
              <div class="card-body">
                <h2 class="text-lg font-bold">${element2.pet_name}</h2>
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=50&id=44642&format=png"
                    alt=""
                  />Breed: ${element2.breed ? element2.breed : "Not Available"}
                </p>
  
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=50&id=60611&format=png"
                    alt=""
                  />Birth: ${element2.date_of_birth
          ? element2.date_of_birth
          : "Not Available"}
                </p>
  
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=48&id=pWHTqEPPfa0v&format=png"
                    alt=""
                  />Gender: ${element2.gender ? element2.gender : "Not Available"}
                </p>
  
                <p class="flex gap-2 items-center">
                  <img
                    class="w-4 h-4"
                    src="https://img.icons8.com/?size=24&id=85782&format=png"
                    alt=""
                  />Price: ${element2.price ? element2.price : "Not Available"} $
                </p>
  
                <div class="flex items-center justify-between gap-1">
                   <button id="${element2.petId}" onclick="likeBtn('${element2.image}')" class="like-btn border-2 rounded-md px-2 py-3 hover:bg-green-500">
                    <img class="w-5 h-3" src="https://img.icons8.com/?size=24&id=u8MTpAq972MG&format=png" alt=""/>
                  </button>
                  <button onclick="adopBtn(); disableBtn(this);" class="border-2 rounded-md px-2 py-2 text-cyan-700 font-semibold hover:bg-green-500 hover:text-white">
                    Adopt
                  </button>
                  <button onclick='detailsBtn("${element2.petId}")' class="hover:text-white hover:bg-green-500 border-2 rounded-md px-2 py-2 text-cyan-700 font-semibold">Details
                  </button>
                </div>
              </div>
            </div>
        </div>`;
      makeCardDiv.append(card);
      document.getElementById("side-div").classList.remove("hidden");
    });
  }, 2100);
}

// -----------------------------------------------------------------------------
// Like Button Feature Function
function likeBtn(button) {
  let sideELements = document.createElement("div");
  sideELements.innerHTML = `
            <div class="border-2 p-2">
            <img class="w-fit h-16 rounded-lg" src="${button}" alt="" />
          </div>`;
  sideDivEle.append(sideELements);
}
//fetch Details Modal Function
async function detailsBtn(pId) {
  res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${pId}`
  );
  data = await res.json();
  let modals = data.petData;
  modal1.innerHTML = "";
  let card = document.createElement("div");
  card.innerHTML = `
              <div class="w-full>
                <div class="bg-base-100 mx-auto p-3 border-2">
                  <figure class="">
                    <img class="w-full h-32 lg:h-48 rounded-md" src="${modals.image
    }" alt="Image" />
                  </figure>
  
                  <div class="px-2">
                  <h2 class="text-lg font-bold mt-2">${modals.pet_name}</h2>
  
                  <div class="grid grid-cols-1 lg:grid-cols-2 text-gray-600">
                    <p class="flex gap-2 items-center">
                      <img class="w-4 h-4" src="https://img.icons8.com/?size=50&id=44642&format=png" alt="" />Breed:
                      ${modals.breed ? modals.breed : "Not Available"}
                    </p>
  
                    <p class="flex gap-2 items-center">
                      <img class="w-4 h-4" src="https://img.icons8.com/?size=50&id=60611&format=png" alt="" />Birth: ${modals.date_of_birth
      ? modals.date_of_birth
      : "Not Available"
    }
                    </p>
  
                      <p class="flex gap-2 items-center">
                      <img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=pWHTqEPPfa0v&format=png"
                        alt="" />Gender:
                      ${modals.gender ? modals.gender : "Not Available"}
                    </p>
  
                    <p class="flex gap-2 items-center">
                      <img class="w-4 h-4" src="https://img.icons8.com/?size=24&id=85782&format=png" alt="" />Price:
                      ${modals.price ? modals.price : "Not Available"} $
                    </p>
                    
                </div>
                    <p class="flex gap-2 items-center text-gray-600">
                     <img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=pWHTqEPPfa0v&format=png"
                        alt="" />Vaccinated status:
                      ${modals.vaccinated_status
      ? modals.vaccinated_status
      : "Not Available"
    }
                    </p>
                        <hr class="my-3"></hr>
                        <p class="text-lg font-bold mb-2">Details Information</p>
                    <p class="text-xs flex gap-2 items-center text-gray-600">
                      ${modals.pet_details ? modals.pet_details : "Not Available"}
                    </p>
  
                    <form method="dialog">
                      <button class="mt-3 px-4 py-2 bg-blue-300 w-full rounded-lg">Close</button>
                    </form>
                  </div>`;
  modal1.append(card);
  modal1.showModal();
}

function disableBtn(thisBtn) {
  thisBtn.disabled = true;
  thisBtn.style.backgroundColor = "#333b3b1a";
  thisBtn.style.color = "red";
  thisBtn.innerHTML = "Adopted";
}

// adopttion
function adopBtn() {
  modal2.classList.remove("hidden");
  let counter = 3;
  const countDownDiv = document.querySelector(".count");
  const countdown = setInterval(() => {
    countDownDiv.innerHTML = counter;
    counter--;
    if (counter < 0) {
      clearInterval(countdown);
      countDownDiv.innerHTML = "3";
      modal2.close();
    }
  }, 1000);
  modal2.showModal();
}


//Done

