var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");

var productList;
var currentIndex;

if (localStorage.getItem("productList") === null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));

  displayProduct(productList);
}

function createProduct() {
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductCategory() === true
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCat.value,
      description: productDesc.value,
    };

    productList.push(product);

    displayProduct(productList);
    localStorage.setItem("productList", JSON.stringify(productList));
    clearForm();
  }
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCat.value = "";
  productDesc.value = "";
}

function displayProduct(list) {
  cartona = "";

  if (list.length === 0) {
    cartona += `<tr><td colspan='7' class='fw-bolder fs-1 text-danger text-center'> Sorry Data Not Found !</td></tr>`;
  } else {
    for (i = 0; i < list.length; i++) {
      cartona += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].description}</td>
        <td><button class="btn btn-sm btn-warning" onclick='getUpdatedProduct(${i})'>Update</button></td>
        <td><button class="btn btn-sm btn-danger" onclick='deleteProduct(${i})'>Delete</button></td>
    </tr>`;
    }
  }

  document.getElementById("data").innerHTML = cartona;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  displayProduct(productList);
  localStorage.setItem("productList", JSON.stringify(productList));
}

function search(letter) {
  var foundedProducts = [];

  for (i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(letter.toLowerCase()) === true
    ) {
      foundedProducts.push(productList[i]);
    }
  }
  displayProduct(foundedProducts);
}

function getUpdatedProduct(index) {
  currentIndex = index;

  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCat.value = productList[index].category;
  productDesc.value = productList[index].description;

  document.getElementById("addBtn").classList.add("d-none");
  document.getElementById("updateBtn").classList.replace("d-none", "d-block");
}

var updateProduct = function () {
  productList[currentIndex].name = productName.value;
  productList[currentIndex].price = productPrice.value;
  productList[currentIndex].category = productCat.value;
  productList[currentIndex].description = productDesc.value;

  displayProduct(productList);
  localStorage.setItem("productList", JSON.stringify(productList));
  clearForm();

  //exrpression function

  document.getElementById("updateBtn").classList.replace("d-block", "d-none");
  document.getElementById("addBtn").classList.replace("d-none", "d-block");

  //  productList[i].name = productName.value;

  // displayProduct(productList);
};

function validateProductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;

  if (regex.test(productName.value)) {
    //7ayegy hna b3d ma ye3ady 3la el else w ye8ayar w ye5aleh sa7
    productName.classList.replace("is-invalid", "is-valid");
    document.getElementById("nameError").classList.replace("d-block", "d-none");

    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    productName.classList.add("is-invalid");
    document.getElementById("nameError").classList.replace("d-none", "d-block");
    return false;
  }
}

function validateProductPrice() {
  var regex = /^([1-9][0-9]{0,1}[0-9]{3}|100000)$/;

  if (regex.test(productPrice.value)) {
    //7ayegy hna b3d ma ye3ady 3la el else w ye8ayar w ye5aleh sa7
    productPrice.classList.replace("is-invalid", "is-valid");
    document
      .getElementById("priceError")
      .classList.replace("d-block", "d-none");

    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    productPrice.classList.add("is-invalid");
    document
      .getElementById("priceError")
      .classList.replace("d-none", "d-block");
    return false;
  }
}

function validateProductCategory() {
  var regex = /^(tv|mobile|laptop|tablet)$/;

  if (regex.test(productCat.value)) {
    //7ayegy hna b3d ma ye3ady 3la el else w ye8ayar w ye5aleh sa7
    productCat.classList.replace("is-invalid", "is-valid");
    document.getElementById("catError").classList.replace("d-block", "d-none");

    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    productCat.classList.add("is-invalid");
    document.getElementById("catError").classList.replace("d-none", "d-block");
    return false;
  }
}

function validateProductDesc() {
  var regex = /^(\w|\s|\W){200,}$/; //at least 200 character

  if (regex.test(productDesc.value)) {
    //7ayegy hna b3d ma ye3ady 3la el else w ye8ayar w ye5aleh sa7
    productDesc.classList.replace("is-invalid", "is-valid");
    document.getElementById("descError").classList.replace("d-block", "d-none");

    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    productDesc.classList.add("is-invalid");
    document.getElementById("descError").classList.replace("d-none", "d-block");
    return false;
  }
}
