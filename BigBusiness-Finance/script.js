// var count = localStorage.getItem(count)===undefined?:0;	// to be used by saveReminder()
// localStorage.setItem(count, count);
var count = 0;
var r_container = document.querySelector(".reminder-container");

//   create reminder onclick of + button

function createReminder(num, name = "", amount = "", duedate = "") {
    // display form with empty text fields
    var new_reminder_form = document.createElement("div");
    new_reminder_form.classList.add("reminder-card", "new-reminder__form");

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
    save_btn.innerText = "SAVE";
    save_btn.setAttribute("onclick", `saveReminder(${num})`);
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
    document.body.append(new_reminder_form);
}

function addReminder() {
    createReminder(++count);
}

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
//     document.body.append(new_reminder_form);
// }

function deleteReminder(num) {
    // var reminder = document.querySelector(`#${num}`);
    var reminder = document.getElementById(`${num}`);
    r_container.removeChild(reminder);
}

function deleteReminderForm(num) {
    // var reminder = document.querySelector(`#${num}-f`);
    var reminder = document.getElementById(`${num}-f`);
    document.body.removeChild(reminder);
}

function editReminder(num) {
    // var reminder = document.querySelector(`${num}`);
    var reminder = document.getElementById(`${num}`);
    var input_values = reminder.getElementsByTagName("span");
    var name_value = input_values[0].innerText;
    var amount_value = input_values[1].innerText;
    var duedate_value = input_values[2].innerText;
    console.log(duedate_value);
    createReminder(num, name_value, amount_value, duedate_value);
    r_container.removeChild(reminder);
}

function saveReminder(num) {
    // card - 3p's and 2 btn's
    var new_reminder_card = document.createElement("div");
    new_reminder_card.classList.add("reminder-card");
    new_reminder_card.setAttribute("id", num);
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
    var edit_btn = document.createElement("button");
    edit_btn.innerText = "EDIT";
    edit_btn.setAttribute("onclick", `editReminder(${num})`);

    if (
        input_elements[0].value !== "" &&
        input_elements[1].value !== "" &&
        input_elements[2].value !== ""
    ) {
        new_reminder_card.append(name, amount, duedate, delete_btn, edit_btn);
        r_container.append(new_reminder_card);
        document.body.removeChild(form);
    }
}