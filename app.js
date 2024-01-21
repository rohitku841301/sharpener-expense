function addExpense(event) {
  event.preventDefault();
  const expenseObject = {
    amount: event.target.amount.value,
    description: event.target.description.value,
    category: event.target.category.value,
    timeStamp: new Date().getTime(),
  };

  localStorage.setItem(expenseObject.timeStamp, JSON.stringify(expenseObject));

  const newUl = document.createElement("ul");
  newUl.classList.add("list-group");
  const items = Object.entries(expenseObject);
  items.forEach(([keys, value]) => {
    const newLi = document.createElement("li");
    newLi.innerText = `${keys} - ${value}`;
    newLi.setAttribute("class", keys);
    newLi.classList.add("list-group-item")
    newUl.append(newLi);
  });
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.setAttribute("onclick", "deleteExpense(event)");
  
  editBtn.setAttribute("class", "edit");
  editBtn.classList.add("btn")
  editBtn.classList.add("btn-light")

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("btn")
  deleteBtn.classList.add("btn-success")
  deleteBtn.setAttribute("onclick", "deleteExpense(event)");
  newUl.append(editBtn);
  newUl.append(deleteBtn);

  const form = document.querySelector("form");
  form.after(newUl);

  const allInput = form.getElementsByTagName("input");
  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
  form.querySelector("select").value = "0";
}

function deleteExpense(event) {
  const deleteNode = event.target.parentNode;
  const timeStampLi = deleteNode.getElementsByTagName("li");
  let timeStamp;
  for (let i = 0; i < timeStampLi.length; i++) {
    if (timeStampLi[i].classList.contains("timeStamp")) {
      timeStamp = timeStampLi[i].innerText.slice(12);

      //this line will run only when i clicked on edit button
      if (event.target.classList.contains("edit")) {
        const recovery = JSON.parse(localStorage.getItem(timeStamp));
        const form = document.querySelector("form");
        const allInput = form.getElementsByTagName("input");
        allInput[0].value = recovery.amount;
        allInput[1].value = recovery.description;
        form.querySelector("select").value = recovery.category;
      }


      localStorage.removeItem(timeStamp);
      break;
    }
  }
  
  deleteNode.remove();
  
}
