//fecthing data
async function fetchData() {
  let url = await fetch("https://tortoiseshell-lime-town.glitch.me/product");
  try {
    if (!url.ok) {
      throw new Error(url.statusText);
    }
  } catch (error) {
    console.log(error);
  }
  let data = await url.json();
  getData(data);
}

function getData(data) {
  // console.log(data);
  let container = document.getElementsByClassName("container")[0];

  data.forEach((element) => {
    let div1 = document.createElement("div");
    div1.innerHTML = `        
      <p>${element.title}</p>
      <img src='${element.image}'>
      <p>Price: ${element.price} /-</p>
    `;

    // Create the EDIT button
    let editBtn = document.createElement("button");
    editBtn.innerText = "EDIT";

    // Edit button functionality
    editBtn.onclick = () => {
      let InputId = document.getElementById("id");
      let InputName = document.getElementById("name");
      let InputPrice = document.getElementById("Price");
      let InputUrl = document.getElementById("image");
      InputId.value = element.id
      InputName.value = element.title;
      InputPrice.value = element.price;
      InputUrl.value = element.image

      let body = document.querySelector("body"); // Replace with your form's class or ID
      body.scrollIntoView({ behavior: "smooth", block: "start" });

    };

    // Create the DELETE button
    let button = document.createElement("button");
    button.innerText = "DELETE";

    // Append the buttons to the div
    div1.appendChild(editBtn);
    div1.appendChild(button);

    // Append the div to the container
    container.appendChild(div1);

    // DELETE button functionality
    button.onclick = () => {
      // alert("Are Sure To Delete the Data")
      let con = confirm("Are u sure to delete the the data")
      if(con){
        div1.remove();
        fetch(`https://tortoiseshell-lime-town.glitch.me/product/${element.id}`, { method: "DELETE" });
      }else{
        return " "
      }
     
    };
  });
}


// Define saveData in the global scope

async function saveData() {
  let InputId = document.getElementById("id").value;
  let InputName = document.getElementById("name").value.trim(); // Trim whitespace
  let InputPrice = document.getElementById("Price").value.trim();
  let InputUrl = document.getElementById("image").value.trim();

  // Validate inputs (ensure no empty fields)
  if (!InputName || !InputPrice || !InputUrl) {
    alert("All fields are required. Please fill out the form completely.");
    return; // Exit the function without sending the request
  }

  // Ensure the price is a valid number
  if (isNaN(InputPrice) || Number(InputPrice) <= 0) {
    alert("Please enter a valid price.");
    return;
  }

  let obj = {
    title: InputName,
    price: InputPrice,
    image: InputUrl,
  };

  // Determine request method (POST or PUT)
  let productMethod = InputId ? "PUT" : "POST";
  let URL = InputId
    ? `https://tortoiseshell-lime-town.glitch.me/product/${InputId}`
    : `https://tortoiseshell-lime-town.glitch.me/product`;

  let response = await fetch(URL, {
    method: productMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    alert(InputId ? "Data Updated Successfully" : "Data Added Successfully");
    fetchData(); // Refresh the data to reflect the changes
  } catch (error) {
    console.error(error);
  }
}



fetchData();