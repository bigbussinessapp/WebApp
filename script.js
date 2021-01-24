// container in which reminder-container and addReminder button exist
var container = document.querySelector(".container");
// container in which only reminders exist
var r_container = document.querySelector(".reminder-container");
// container in which only new-reminder__form exist
var r_f_container = document.querySelector(".reminder-form-container");
// container in which only due__form exist
var due_container = document.querySelector(".due-container");

// for addReminderButton and it's container
var addReminderBtnContainer = document.querySelector(".add-reminder");
var addReminderBtn = document.querySelector(".add-reminder__button");


//   create reminder onclick of + button
function createReminder(num, name = "", amount = "", duedate = "") {
    r_f_container.style.display = "flex";
    document.body.classList.add("fade");

    var new_reminder_form = document.querySelector(".new-reminder__form");

    var input_elements = new_reminder_form.querySelectorAll("input");
    input_elements[0].value = name;
    input_elements[1].value = amount;

    var today = new Date();
    console.log(today);
    var m = today.getMonth() + 1;
    // var mm = m > 9 ? m : "0" + m;
    input_elements[2].min = `${today.getFullYear()}-${m > 9 ? m : "0" + m}-${today.getDate()}`;
    console.log(input_elements[2].min);
    input_elements[2].value = duedate;

    var delete_btn = new_reminder_form.getElementsByTagName("button")[0];
    delete_btn.setAttribute("onclick", `cancelReminderForm(${num})`);
    var save_btn = new_reminder_form.getElementsByTagName("button")[1];
    save_btn.setAttribute("onclick", `saveReminder(${num})`);
}

// secureCount functions provides security to count variable by using closures
// if count is declared as global then anyone can change it's value
function secureCount() {
    var count = 0;
    return function addReminder() {
        createReminder(++count);
    }
}
addReminder = secureCount();

function cancelReminder(num) {
    var reminder = document.getElementById(`${num}-r`);
    r_container.removeChild(reminder);
}

function cancelReminderForm(num) {
    var reminder = document.getElementById(`${num}-r`);
    if (reminder !== null) {
        reminder.style.display = "block";
    }
    r_f_container.style.display = "none";
    document.body.classList.remove("fade");
}

function editReminder(num) {
    var reminder = document.getElementById(`${num}-r`);
    console.log(num, reminder);
    var input_values = reminder.getElementsByTagName("span");
    var name_value = input_values[0].innerText;
    var amount_value = input_values[1].innerText;
    var duedate_value = input_values[2].innerText;
    // pass the duedate_value in yyyy-mm-dd format
    var dmy = duedate_value.split("-");
    createReminder(num, name_value, amount_value, `${dmy[2]}-${dmy[1]}-${dmy[0]}`);
    reminder.style.display = "none";
    // r_container.removeChild(reminder);
    // addReminderBtnContainer.removeChild(addReminderBtn);
}

function saveReminder(num) {
    // card - 3p's and 2 btn's 
    var new_reminder_card = document.createElement("div");
    new_reminder_card.classList.add("card", "reminder-card");
    new_reminder_card.setAttribute("id", `${num}-r`);
    var form = document.querySelector(".new-reminder__form");
    var input_elements = form.getElementsByTagName("input");

    var name = document.createElement("p");
    name.innerHTML = "Name: <span>" + input_elements[0].value + "</span>";
    var amount = document.createElement("p");
    amount.innerHTML = `Amount: <span>${input_elements[1].value}</span>`;
    var duedate = document.createElement("p");
    var dmy = input_elements[2].value.split("-");
    duedate.innerHTML = `Due Date: <span>${dmy[2]}-${dmy[1]}-${dmy[0]}</span>`;
    var delete_btn = document.createElement("button");
    delete_btn.innerText = "DELETE";
    delete_btn.setAttribute("onclick", `cancelReminder(${num})`);
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
        var old_reminder = document.getElementById(`${num}-r`);
        if (old_reminder !== null)
            r_container.removeChild(old_reminder);
        new_reminder_card.append(name, amount, duedate, delete_btn, change_due_btn, edit_btn);
        r_container.append(new_reminder_card);
        r_f_container.style.display = "none";
        document.body.classList.remove("fade");
    }
}

function createDue(num, name_value, amount_value, duedate_value) {
    console.log(num, name, amount, duedate);
    var new_due_card = document.createElement("div");
    new_due_card.classList.add("card", "due-card");
    new_due_card.setAttribute("id", `${num}-d`);

    var name = document.createElement("p");
    name.innerHTML = `Name: <span>${name_value}</span>`;
    var amount = document.createElement("p");
    amount.innerHTML = `Amount: <span>${amount_value}</span>`;
    var duedate = document.createElement("p");
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

try {
    var form = document.querySelector(".new-reminder__form");
    var inputs = form.querySelectorAll("input");
    var register = form.querySelectorAll("button")[1];
    console.log("I'm in script");
    form.addEventListener("input", function (e) {
        // console.log("I'm in keyup fun");
        var disabled = false;
        inputs.forEach(function (input, index) {
            if (input.value === "" || !input.value.replace(/\s/g, "").length) {
                disabled = true;
            }
        });

        if (disabled || (new Date(inputs[2].value) < new Date()) || inputs[1].value < 0) {
            // console.log("disabled from if ", disabled);
            register.setAttribute("disabled", "disabled");
            register.classList.add("disabled");
        } else {
            // console.log("disabled from else ", disabled);
            register.removeAttribute("disabled");
            register.classList.remove("disabled");
        }
    });
    // inputs[2].value
} catch (error) {
    console.log("No form created!");
}
