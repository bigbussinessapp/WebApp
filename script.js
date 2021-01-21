// var count = localStorage.getItem(count)===undefined?:0;	// to be used by saveReminder()
// localStorage.setItem(count, count);
// container in which reminder-container and addReminder button exist
var container = document.querySelector(".container");
// container in which only reminders exist
var r_container = document.querySelector(".reminder-container");
// container in which only new-reminder__form exist
var r_f_container = document.querySelector(".reminder-form-container");
// container in which only new-reminder__form exist
var due_container = document.querySelector(".due-container");

var addReminderBtnContainer = document.querySelector(".add-reminder");
var addReminderBtn = document.querySelector(".add-reminder__button");

//   create reminder onclick of + button

function createReminder(num, name = "", amount = "", duedate = "") {
    // display form with empty text fields
    var new_reminder_form = document.createElement("div");
    new_reminder_form.classList.add("reminder-card", "new-reminder__form", "card");

    // if it's a new reminder then num will be undefined/null and if editReminder is clicked then num will exist
    // num = (num !== undefined) ? num : count;
    // name = (name !== undefined) ? name : "";
    // amount = (amount !== undefined) ? amount : "";
    // duedate = (duedate !== undefined) ? duedate : "";

    new_reminder_form.setAttribute("id", `${num}-f`);
    var l_name = document.createElement("label");
    l_name.innerText = "Name";
    var i_name = document.createElement("input");
    i_name.setAttribute("value", name);
    var l_amount = document.createElement("label");
    l_amount.innerText = "Amount";
    var i_amount = document.createElement("input");
    i_amount.setAttribute("type", "number");
    i_amount.setAttribute("min", 0);
    i_amount.setAttribute("value", amount);
    var l_duedate = document.createElement("label");
    l_duedate.innerText = "Due Date";
    var i_duedate = document.createElement("input");
    i_duedate.setAttribute("type", "date");
    var ddmmyy = duedate.split("-");
    var dd = ddmmyy[0];
    var mm = ddmmyy[1];
    var yy = ddmmyy[2];
    i_duedate.setAttribute("value", new Date(`${yy}-${mm}-${dd}`));
    var delete_btn = document.createElement("button");
    delete_btn.innerText = "DELETE";
    delete_btn.setAttribute("onclick", `deleteReminderForm(${num})`);
    var save_btn = document.createElement("button");
    save_btn.classList.add("disabled");
    save_btn.innerText = "SAVE";
    save_btn.setAttribute("onclick", `saveReminder(${num})`);
    save_btn.disabled = true;
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
    r_f_container.append(new_reminder_form);
}

// secureCount functions provides security to count variable by using closures
// if count is declared as global then anyone can change it's value
function secureCount() {
    var count = 0;
    return function addReminder() {
        addReminderBtnContainer.removeChild(addReminderBtn);
        createReminder(++count);
    }
}
addReminder = secureCount();

// function addReminder() {
//     // display form with empty text fields
//     var new_reminder_form = document.createElement("div");
//     new_reminder_form.classList.add("reminder-card", "new-reminder__form", count);
//     var l_name = document.createElement("label");
//     l_name.innerText = "Name";
//     var i_name = document.createElement("input");
//     var l_amount = document.createElement("label");
//     l_amount.innerText = "Amount";
//     var i_amount = document.createElement("input");
//     var l_duedate = document.createElement("label");
//     l_duedate.innerText = "Due Date";
//     var i_duedate = document.createElement("input");
//     i_duedate.setAttribute("type", "date");
//     var delete_btn = document.createElement("button");
//     delete_btn.innerText = "DELETE";
//     delete_btn.setAttribute("onclick", `deleteReminderForm(${count})`);
//     var save_btn = document.createElement("button");
//     save_btn.innerText = "SAVE";
//     save_btn.setAttribute("onclick", `saveReminder(${count})`);
//     new_reminder_form.append(
//         l_name,
//         i_name,
//         l_amount,
//         i_amount,
//         l_duedate,
//         i_duedate,
//         delete_btn,
//         save_btn
//     );
//     r_f_container.append(new_reminder_form);
// }

function deleteReminder(num) {
    // var reminder = document.querySelector(`#${num}`);
    var reminder = document.getElementById(`${num}-r`);
    r_container.removeChild(reminder);
}

function deleteReminderForm(num) {
    // var reminder = document.querySelector(`#${num}-f`);
    var reminder = document.getElementById(`${num}-f`);
    r_f_container.removeChild(reminder);
    container.appendChild(addReminderBtn);
}

function editReminder(num) {
    // var reminder = document.querySelector(`${num}`);
    var reminder = document.getElementById(`${num}-r`);
    var input_values = reminder.getElementsByTagName("span");
    var name_value = input_values[0].innerText;
    var amount_value = input_values[1].innerText;
    var duedate_value = input_values[2].innerText;
    createReminder(num, name_value, amount_value, duedate_value);
    r_container.removeChild(reminder);
    container.removeChild(addReminderBtn);
}

function saveReminder(num) {
    // card - 3p's and 2 btn's
    var new_reminder_card = document.createElement("div");
    new_reminder_card.classList.add("reminder-card", "card");
    new_reminder_card.setAttribute("id", `${num}-r`);
    var form = document.getElementById(`${num}-f`);
    var input_elements = form.getElementsByTagName("input");

    var name = document.createElement("p");
    name.innerHTML = "Name: <span>" + input_elements[0].value + "</span>";
    var amount = document.createElement("p");
    amount.innerHTML = `Amount: <span>${input_elements[1].value}</span>`;
    var duedate = document.createElement("p");
    // var setdate = input_elements[2].value;
    // var setdate_string = `${setdate.getDate()}-${setdate.getMonth()}-${setdate.getFullYear()}`;
    var dmy = input_elements[2].value.split("-");
    duedate.innerHTML = `Due Date: <span>${dmy[2]}-${dmy[1]}-${dmy[0]}</span>`;
    var delete_btn = document.createElement("button");
    delete_btn.innerText = "DELETE";
    delete_btn.setAttribute("onclick", `deleteReminder(${num})`);
    var change_due_btn = document.createElement("button");
    change_due_btn.innerText = "CHANGE DUE";
    change_due_btn.setAttribute("onclick", `changeDue(${num})`);
    var edit_btn = document.createElement("button");
    edit_btn.innerText = "EDIT";
    edit_btn.setAttribute("onclick", `editReminder(${num})`);

    if (
        input_elements[0].value !== "" &&
        input_elements[1].value !== "" &&
        input_elements[2].value !== ""
    ) {
        new_reminder_card.append(name, amount, duedate, delete_btn, change_due_btn, edit_btn);
        r_container.append(new_reminder_card);
        r_f_container.removeChild(form);
        container.appendChild(addReminderBtn);
    }
}

function createDue(num, name_value, amount_value, duedate_value) {
    console.log(num, name, amount, duedate);
    var new_due_card = document.createElement("div");
    new_due_card.classList.add("due-card", "card");
    new_due_card.setAttribute("id", `${num}-d`);

    var name = document.createElement("p");
    name.innerHTML = `Name: <span>${name_value}</span>`;
    var amount = document.createElement("p");
    amount.innerHTML = `Amount: <span>${amount_value}</span>`;
    var duedate = document.createElement("p");
    // var setdate = input_elements[2].value;
    // var setdate_string = `${setdate.getDate()}-${setdate.getMonth()}-${setdate.getFullYear()}`;
    // var dmy = input_elements[2].value.split("-");
    duedate.innerHTML = `Due Date: <span>${duedate_value}</span>`;
    var pay_now_btn = document.createElement("button");
    pay_now_btn.innerText = "PAY NOW";
    pay_now_btn.setAttribute("onclick", `alert("Clicked${num}")`);
    new_due_card.append(name, amount, duedate, pay_now_btn);
    due_container.append(new_due_card);
}

function changeDue(num) {
    var reminder = document.getElementById(`${num}-r`);
    var span_values = reminder.getElementsByTagName("span");
    console.log(span_values);
    // created a due in due_container
    createDue(
        num,
        span_values[0].innerHTML,
        span_values[1].innerHTML,
        span_values[2].innerHTML
    );
    r_container.removeChild(reminder);
}