class RemindersManager
{
    reminders = [new ReminderItem(1, "Bharath", "200", "20-11-2001", "08:20")];

    constructor()
    {

    }

    addCard(card)
    {
        this.reminders.push(card);
        console.log(this.reminders);
    }

    deleteCard(id)
    {
        this.reminders.map(item=>{
            if(item.id == id)
            {
                this.reminders.pop(item);
            }
         }
        );
        console.log(this.reminders);
    }

    editCard(card)
    {
        cardToEdit = null;
        isEdited = false;
        this.reminders.map(item=>{
            if(item.id == card.id)
            {
                item.title = card.title;
                item.amount = card.amount;
                item.dueDate = card.dueDate;
                item.dueTime = card.dueTime;
                isEdited = true;
            }
        });

        if(!isEdited)
        {
            alert("Card with title "+card.title+" is not found");
        }
    }
}