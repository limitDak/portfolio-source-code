function displayGameData() {
  getData(`http://localhost/final_project/steam_Api.php?type=gameTable`).then(
    (response) => {
      const apiResponse = JSON.parse(response);

      if (apiResponse.length > 0) {
        const tRows = prepareHTMLContent(apiResponse, "game-list");

        console.log(typeof tRows);
        document.getElementById("game-list").innerHTML = tRows;
      }
    }
  );
}

function displayCustomerData() {
  getData(
    `http://localhost/final_project/steam_Api.php?type=customerTable`
  ).then((response) => {
    const apiResponse = JSON.parse(response);

    if (apiResponse.length > 0) {
      const tRows = prepareHTMLContent(apiResponse, "customer-list");

      console.log(typeof tRows);
      document.getElementById("customer-list").innerHTML = tRows;
    }
  });
}

function displayCategoryData() {
  getData(
    `http://localhost/final_project/steam_Api.php?type=categoryTable`
  ).then((response) => {
    const apiResponse = JSON.parse(response);

    if (apiResponse.length > 0) {
      const tRows = prepareHTMLContent(apiResponse, "category-list");

      console.log(typeof tRows);
      document.getElementById("category-list").innerHTML = tRows;
    }
  });
}

function displayGenreData() {
  getData(`http://localhost/final_project/steam_Api.php?type=genreTable`).then(
    (response) => {
      const apiResponse = JSON.parse(response);

      if (apiResponse.length > 0) {
        const tRows = prepareHTMLContent(apiResponse, "genre-list");

        console.log(typeof tRows);
        document.getElementById("genre-list").innerHTML = tRows;
      }
    }
  );
}

function displayCompanyData() {
  getData(
    `http://localhost/final_project/steam_Api.php?type=companyTable`
  ).then((response) => {
    const apiResponse = JSON.parse(response);

    if (apiResponse.length > 0) {
      const tRows = prepareHTMLContent(apiResponse, "company-list");

      console.log(typeof tRows);
      document.getElementById("company-list").innerHTML = tRows;
    }
  });
}

function displayPlaytimeData() {
  getData(
    `http://localhost/final_project/steam_Api.php?type=playtimeTable`
  ).then((response) => {
    const apiResponse = JSON.parse(response);

    if (apiResponse.length > 0) {
      const tRows = prepareHTMLContent(apiResponse, "playtime-list");

      console.log(typeof tRows);
      document.getElementById("playtime-list").innerHTML = tRows;
    }
  });
}

function displaySpecificsData() {
  getData(
    `http://localhost/final_project/steam_Api.php?type=specificsTable`
  ).then((response) => {
    const apiResponse = JSON.parse(response);

    if (apiResponse.length > 0) {
      const tRows = prepareHTMLContent(apiResponse, "specifics-list");

      console.log(typeof tRows);
      document.getElementById("specifics-list").innerHTML = tRows;
    }
  });
}

function displayActivisionData() {
  getData(
    `http://localhost/final_project/steam_Api.php?type=activisionTable`
  ).then((response) => {
    const apiResponse = JSON.parse(response);

    if (apiResponse.length > 0) {
      const tRows = prepareHTMLContent(apiResponse, "activision-list");

      console.log(typeof tRows);
      document.getElementById("activision-list").innerHTML = tRows;
    }
  });
}

function displayNegativeData() {
  getData(
    `http://localhost/final_project/steam_Api.php?type=negativeTable`
  ).then((response) => {
    const apiResponse = JSON.parse(response);

    if (apiResponse.length > 0) {
      const tRows = prepareHTMLContent(apiResponse, "negative-list");

      console.log(typeof tRows);
      document.getElementById("negative-list").innerHTML = tRows;
    }
  });
}

function displayStoredCategoryData(currentForm) {
  let formValue = currentForm.category_range.value;

  getData(
    `http://localhost/final_project/steam_Api.php?type=storedCategoryTable&formValue=${formValue}`
  ).then((response) => {
    const apiResponse = JSON.parse(response);

    if (apiResponse.length > 0) {
      const tRows = prepareHTMLContent(apiResponse, "stored-category-list");

      console.log(typeof tRows);
      document.getElementById("stored-category-list").innerHTML = tRows;
    }
  });
}

function displayStoredGenreData(currentForm) {
  console.log("Submitted!");

  console.log(currentForm.genre_select.value);

  let formValue = currentForm.genre_select.value;

  getData(
    `http://localhost/final_project/steam_Api.php?type=storedGenreTable&formValue=${formValue}`
  ).then((response) => {
    const apiResponse = JSON.parse(response);

    if (apiResponse.length > 0) {
      const tRows = prepareHTMLContent(apiResponse, "stored-genre-list");

      console.log(typeof tRows);
      document.getElementById("stored-genre-list").innerHTML = tRows;
    }
  });
}

function getData(url) {
  /* If the url is defined then this method returns an instance of the Promise object */

  if (url) {
    const task = new Promise(function (resolve, reject) {
      const req = new XMLHttpRequest();
      req.open("GET", url);
      req.send();
      req.onload = function () {
        req.status === 200
          ? resolve(req.response)
          : reject(Error(req.statusText));
      };
      req.onerror = function (e) {
        reject(Error(`Network Error: ${e}`));
      };
    });
    return task;
  }

  return false;
}

function prepareHTMLContent(list, key) {
  let output = "";

  switch (key) {
    case "game-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.name}</td><td>${game.price}</td><td>${game.platforms}</td></tr>`;
      }
      break;
    case "customer-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.name}</td><td>${game.positive_ratings}</td><td>${game.negative_ratings}</td><td>${game.owners}</td></tr>`;
      }
      break;
    case "category-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.Category_ID}</td><td>${game.categories}</td></tr>`;
      }
      break;
    case "genre-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.Genre_ID}</td><td>${game.genres}</td></tr>`;
      }
      break;
    case "company-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.name}</td><td>${game.publisher}</td><td>${game.developer}</td><td>${game.release_date}</td></tr>`;
      }
      break;
    case "playtime-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.name}</td><td>${game.average_playtime}</td><td>${game.median_playtime}</td></tr>`;
      }
      break;
    case "specifics-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.name}</td><td>${game.achievements}</td><td>${game.required_age}</td></tr>`;
      }
      break;
    case "activision-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.name}</td><td>${game.developer}</td></tr>`;
      }
      break;
    case "negative-list":
      for (i = 0; i < 1000; i++) {
        const game = list[i];
        output += `<tr><td>${game.name}</td><td>${game.price}</td><td>${game.negative_ratings}</td><td>${game.positive_ratings}</td><td>${game.difference}</td></tr>`;
      }
      break;
    case "stored-category-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.name}</td><td>${game.categories}</td></tr>`;
      }
      break;
    case "stored-genre-list":
      for (i = 0; i < list.length; i++) {
        const game = list[i];
        output += `<tr><td>${game.name}</td><td>${game.genres}</td></tr>`;
      }
      break;
    default:
      console.log(key);
      console.log("Key did not match any statements");
  }

  return output;
}
