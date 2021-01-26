
function addNewReminderCard()
{
    alert("adding");
    var remindersListContainer = document.getElementById("reminderList");
    var reminderAddEditForm = document.getElementById("reminderAddEditForm");
    var formInputs = reminderAddEditForm.getElementsByTagName("input");
    var rmManager = new ReminderManager();

    var title = formInputs[0].value;
    var amount = formInputs[1].value;
    var dueDate = formInputs[2].value;

    var newReminderItem = new ReminderItem(title, amount, dueDate);
    rmManager.addCard(newReminderItem);
    var newReminderCard = createReminderCard(newReminderItem);
    remindersListContainer.appendChild(newReminderCard);
}

function editReminder()
{

}

function deleteReminder()
{

}

function moveReminderToDues()
{

}

function enableAddEditForm()
{
    var reminderAddEditForm = document.getElementById("reminderAddEditDialog");
    reminderAddEditForm.style.display = "flex";

    var saveBtn = document.getElementById("saveBtnReminderForm");

    var saveBtnDisabled = true;

    reminderAddEditForm.addEventListener("input", function (e) {
        saveBtnDisabled = true;
        console.log(e.target.value);
        if(e.target.value !== "")
        {
            saveBtnDisabled = false;
        }
        if(saveBtnDisabled)
        {
            saveBtn.disabled = true;
        }
        else
        {
            saveBtn.disabled = false;
        }
    });
}

function createReminderCard(newReminderItem)
{
    var new_reminder_card = document.createElement("div");
    new_reminder_card.setAttribute("id", `${newReminderItem.item_id}-r`);

    var name = document.createElement("p");
    name.innerHTML = `Name: <span>${newReminderItem.title}</span>`;
    var amount = document.createElement("p");
    amount.innerHTML = `Amount: <span>${newReminderItem.amount}</span>`;
    var duedate = document.createElement("p");
    var yyyy_mm_dd = newReminderItem.dueDate.split("-");
    duedate.innerHTML = `Due Date: <span>${yyyy_mm_dd[2]}-${yyyy_mm_dd[1]}-${yyyy_mm_dd[0]}</span>`;
    var delete_btn = document.createElement("button");
    delete_btn.innerText = "DELETE";
    delete_btn.setAttribute("onclick", `cancelReminder(${newReminderItem.item_id})`);
    var change_due_btn = document.createElement("button");
    change_due_btn.innerText = "CHANGE DUE";
    change_due_btn.setAttribute("onclick", `changeDue(${newReminderItem.item_id})`);
    var edit_btn = document.createElement("button");
    edit_btn.setAttribute("id",`saveBtn${newReminderItem.item_id}-r`);
    edit_btn.innerText = "EDIT";
    edit_btn.setAttribute("onclick", `editReminder(${newReminderItem.item_id})`);

    new_reminder_card.append(name, amount, duedate, delete_btn, change_due_btn, edit_btn);
    return new_reminder_card;

    if (
        input_elements[0].value !== "" &&
        input_elements[1].value !== "" &&
        input_elements[2].value !== ""
    ) {
        var old_reminder = document.getElementById(`${num}-r`);
        // if editReminder is clicked then the old_reminder is made as `display:none` but we
        // have to remove it and then add new_reminder
        if (old_reminder !== null)
            r_container.removeChild(old_reminder);
        new_reminder_card.append(name, amount, duedate, delete_btn, change_due_btn, edit_btn);
        r_container.append(new_reminder_card);
        r_f_container.style.display = "none";
        document.body.classList.remove("fade");
    }
}