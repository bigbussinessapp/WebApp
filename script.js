// DUE DATE IS IN YYYY-MM-DD FORMAT
const reminders = [
    {
        id: 1,
        name: "Aryan",
        amount: 26,
        duedate: "2020-02-20",
    },
    {
        id: 2,
        name: "Rohit",
        amount: 2060,
        duedate: "2021-02-20",
    },
    {
        id: 3,
        name: "Ashna",
        amount: 1111,
        duedate: "2020-02-22",
    },
    {
        id: 4,
        name: "Shiva",
        amount: 2623,
        duedate: "2022-02-20",
    },
    {
        id: 5,
        name: "Akhil",
        amount: 26123,
        duedate: "2021-01-20",
    },
    {
        id: 6,
        name: "Kathi",
        amount: 26,
        duedate: "2020-02-20",
    },
]
var reminderIdCount = 6;

const dues = [
    {
        id: 1,
        name: "Tejas",
        amount: 26,
        duedate: "2020-02-20",
    },
    {
        id: 2,
        name: "Bharath",
        amount: 26,
        duedate: "2020-02-20",
    },
]
var dueIdCount = 2;


function addReminderCard(card) {
    reminders.push(card);
    console.log(reminders);
}

function deleteReminderCard(id) {
    reminders.map((item, index, array) => {
        if (item.id === id) {
            reminders.splice(index, 1);
        }
    });
    console.log(reminders);
}

function editReminderCard(card) {
    // var cardToEdit = null;
    var isEdited = false;
    reminders.map(item => {
        if (item.id === card.id) {
            item.name = card.name;
            item.amount = card.amount;
            item.duedate = card.dueDate;
            isEdited = true;
        }
    });

    if (!isEdited) {
        alert("Card with name " + card.name + " is not found");
    }
}

function addDueCard(card) {
    dues.push(card);
    console.log(dues);
}

function deleteDueCard(id) {
    dues.map((item, index, array) => {
        if (item.id === id) {
            dues.splice(index, 1);
        }
    });
    console.log(dues);
}


// container in which reminder - container and addReminder button exist

var container = document.querySelector(".container");
// container in which only reminders exist
var r_container = document.querySelector(".reminder-container");
// container in which only new-reminder__form exist
var r_f_container = document.querySelector(".reminder-form-container");
// container in which only due__form exist
var due_container = document.querySelector(".due-container");

// for addReminderButton and it's container
// var addReminderBtnContainer = document.querySelector(".add-reminder");
// var addReminderBtn = document.querySelector(".add-reminder__button");


function reminderToDue(reminderData, dueData) {
    for (var index = 0; index < reminderData.length; index++) {
        obj = reminderData[index];
        var today = new Date();
        if (new Date(obj.duedate) >= today) {   // duedate is greater than today's date
            // createReminder(obj.id, obj.name, obj.amount, obj.duedate);
            // saveReminder(obj.id);
        } else {    // duedate is less than today's date -> createDue
            dues.push({
                id: ++dueIdCount,
                name: obj.name,
                amount: obj.amount,
                duedate: obj.duedate,
            });
            // just removal from reminderData is enough
            reminderData.splice(index, 1);
            index--;
        }
    }
}
reminderToDue(reminders, dues);

reminders.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
dues.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));


// populateData function calls createReminder with existing data and if the duedate is less than 
// today's date then directly it's sent to createDue
// reminderData is an array of objects{name,amount,duedate}
function populateReminders(reminderData) {
    reminderData.map((obj, index, array) => {
        createReminder(obj.id, obj.name, obj.amount, obj.duedate);
        saveReminder(obj.id);
    });
}
populateReminders(reminders);


function populateDues(dueData) {
    dueData.map((obj, index, array) => {
        createDue(obj.id, obj.name, obj.amount, obj.duedate);
    });
}

populateDues(dues);
// populateReminder(reminderData);
// populateReminder(dueData);


//   create reminder onclick of + button
function createReminder(num = 0, name = "", amount = "", duedate = "") {
    console.log("createReminder -> ", num, name, amount, duedate);
    r_f_container.style.display = "flex";
    document.body.classList.add("fade");

    var new_reminder_form = document.querySelector(".new-reminder__form");

    var input_elements = new_reminder_form.querySelectorAll("input");
    input_elements[0].value = name;
    input_elements[1].value = amount;

    var today = new Date();
    console.log(`createReminder -> ${today}`);
    var m = today.getMonth() + 1;
    // var mm = m > 9 ? m : "0" + m;
    input_elements[2].min = `${today.getFullYear()}-${m > 9 ? m : "0" + m}-${today.getDate()}`;
    console.log(`createReminder -> ${input_elements[2].min}`);
    input_elements[2].value = duedate;

    var delete_btn = new_reminder_form.getElementsByTagName("button")[0];
    delete_btn.setAttribute("onclick", `cancelReminderForm()`);
    var save_btn = new_reminder_form.getElementsByTagName("button")[1];
    save_btn.setAttribute("onclick", `saveReminder(${num})`);
}
addReminder = createReminder;

function cancelReminder(num) {
    var reminder = document.getElementById(`${num}-r`);
    r_container.removeChild(reminder);

    deleteReminderCard(num);
    // reminderData.map((obj, index, array) => {
    //     if (obj.id === num) {
    //         reminderData.splice(index, 1);
    //     }
    // });
}

function cancelReminderForm() {
    // var reminder = document.getElementById(`${num}-r`);
    // if (reminder !== null) {
    //     reminder.style.display = "block";
    // }
    r_f_container.style.display = "none";
    document.body.classList.remove("fade");
}

function editReminder(num) {
    var reminder = document.getElementById(`${num}-r`);
    console.log(`editReminder -> ${num} - ${reminder}`);
    var input_values = reminder.getElementsByTagName("span");
    var name_value = input_values[0].innerText;
    var amount_value = input_values[1].innerText;
    var duedate_value = input_values[2].innerText;
    // pass the duedate_value in yyyy-mm-dd format but here dmy is in dd-mm-yyyy format
    var dmy = duedate_value.split("-");
    createReminder(num, name_value, amount_value, `${dmy[2]}-${dmy[1]}-${dmy[0]}`);
}

// secureCount functions provides security to count variable by using closures
// if count is declared as global then anyone can change it's value
// function secureReminderCount(reminderIdCount) {
//     var count = reminderIdCount;
//     return function getReminderCount() {
//         return count;
//     }
// }
// var getReminderCount = secureReminderCount(reminderIdCount);   // used by saveReminder

function saveReminder(num_val) {
    // card - 3p's and 2 btn's 
    var num = num_val === 0 ? ++reminderIdCount : num_val;
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
    var ymd = input_elements[2].value.split("-");
    // here ymd is in yyyy-mm-dd format but we want the data in dd-mm-yyyy format
    duedate.innerHTML = `Due Date: <span>${ymd[2]}-${ymd[1]}-${ymd[0]}</span>`;
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
        var reminderObject = {
            id: num,
            name: input_elements[0].value,
            amount: input_elements[1].value,
            duedate: input_elements[2].value,
        };
        // var reminderObject = new ReminderItem(
        //     num, input_elements[0].value, input_elements[1].value,
        //     input_elements[2].value
        // );
        var old_reminder = document.getElementById(`${num}-r`);
        // if editReminder is clicked, then the old_reminder is made as `display:none` but we
        // have to remove it and then add new_reminder and reminderObj
        //  is already in reminderData hence rdata_index will be used else num will be used as id
        var editedCard = false;
        if (old_reminder !== null) {
            r_container.removeChild(old_reminder);
            editedCard = true;
            // reminders.map((item, index, array) => {
            //     if (item.id === num) {
            //         reminders.splice(index, 1);
            //     }
            // });
        }
        new_reminder_card.append(name, amount, duedate, delete_btn, change_due_btn, edit_btn);
        r_container.append(new_reminder_card);
        r_f_container.style.display = "none";
        document.body.classList.remove("fade");

        if (editedCard || num_val !== 0)
            editReminderCard(reminderObject);
        else
            addReminderCard(reminderObject);
    }
}

function createDue(num, name_value, amount_value, duedate_value) {
    console.log("createDue -> ", num, name_value, amount_value, duedate_value);
    var new_due_card = document.createElement("div");
    new_due_card.classList.add("card", "due-card");
    new_due_card.setAttribute("id", `${num}-d`);

    var name = document.createElement("p");
    name.innerHTML = `Name: <span>${name_value}</span>`;
    var amount = document.createElement("p");
    amount.innerHTML = `Amount: <span>${amount_value}</span>`;
    var duedate = document.createElement("p");  // here duedate_value is in dd-mm-yyyy format
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
    console.log("changeDue -> ", span_values);


    deleteReminderCard(num);
    num = ++dueIdCount;
    var dueObject = {
        id: num,
        name: span_values[0].innerHTML,
        amount: span_values[1].innerHTML,
        duedate: span_values[2].innerHTML,
    };
    dues.push(dueObject);
    // created a due in due_container
    createDue(num,
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
    console.log("try -> I'm in script");
    form.addEventListener("input", function (e) {
        // console.log("I'm in keyup fun");
        var disabled = false;
        inputs.forEach(function (input, index) {
            if (input.value === "" || !input.value.replace(/\s/g, "").length) {
                disabled = true;
            }
        });

        var yyyy_mm_dd = inputs[2].value.split("-");
        // if (disabled || new Date() >= new Date(`${yyyy_mm_dd[0]}-${yyyy_mm_dd[1] - 1}-${yyyy_mm_dd[0]}`) || inputs[1].value < 0) {
        if (disabled || new Date(inputs[2].value) < new Date() || inputs[1].value < 0) {
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
    console.log("catch -> No form created!");
}
