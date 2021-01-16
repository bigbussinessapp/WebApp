//   create reminder onclick of + button
var r_container = document.querySelector(".reminder-container");
var name_value;
var amount_value;
var duedate_value;
function addReminder() {
  // display form with empty text fields
  var new_reminder_form = document.createElement("div");
  new_reminder_form.classList.add("reminder-card", "new-reminder__form");
  r_container.append(new_reminder_form);
  var l_name = document.createElement("label");
  l_name.innerText = "Name";
  var i_name = document.createElement("input");
  name_value = i_name.value;
  var l_amount = document.createElement("label");
  l_amount.innerText = "Amount";
  var i_amount = document.createElement("input");
  amount_value = i_amount.value;
  var l_duedate = document.createElement("label");
  l_duedate.innerText = "Due Date";
  var i_duedate = document.createElement("input");
  duedate_value = i_duedate.value;
  var delete_btn = document.createElement("button");
  delete_btn.innerText = "DELETE";
  delete_btn.setAttribute("onclick", "deleteReminderForm()");
  var save_btn = document.createElement("button");
  save_btn.innerText = "SAVE";
  save_btn.setAttribute("onclick", "saveReminder()");
  new_reminder_form.append(
    l_name,
    i_name,
    l_amount,
    i_amount,
    l_duedate,
    i_duedate,
    delete_btn,
    save_btn
  );
}

function deleteReminder() {
  var reminder = document.querySelector(".reminder-card");
  r_container.removeChild(reminder);
}

function deleteReminderForm() {
  var reminder = document.querySelector(".new-reminder__form");
  r_container.removeChild(reminder);
}

function editReminder() {
  addReminder();
  saveReminder();
}

function saveReminder() {
  // card - 3p's and 2 btn's
  var new_reminder_card = document.createElement("div");
  new_reminder_card.classList.add("reminder-card");
  var input_values = document.querySelectorAll("input");

  var name = document.createElement("p");
  name.innerText = `Name: ${input_values[0].value}`.toUpperCase();
  var amount = document.createElement("p");
  amount.innerText = `Amount: ${input_values[1].value}`.toUpperCase();
  var duedate = document.createElement("p");
  duedate.innerText = `Due Date: ${input_values[2].value}`.toUpperCase();
  var delete_btn = document.createElement("button");
  delete_btn.innerText = "DELETE";
  delete_btn.setAttribute("onclick", "deleteReminder()");
  var edit_btn = document.createElement("button");
  edit_btn.innerText = "EDIT";
  edit_btn.setAttribute("onclick", "editReminder()");

  if (
    input_values[0] !== "" &&
    input_values[1] !== "" &&
    input_values[2] !== ""
  ) {
    r_container.append(new_reminder_card);
    new_reminder_card.append(name, amount, duedate, delete_btn, edit_btn);
    r_container.removeChild(document.querySelector(".new-reminder__form"));
  }
}