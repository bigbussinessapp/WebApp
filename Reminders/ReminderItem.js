class ReminderItem {
    item_id;
    title;
    amount;
    dueDate;
    dueTime;
    static id = 0;

    constructor(title, amount, duedate, dueTime)
    {
        this.item_id = id++;
        this.title = title;
        this.amount = amount;
        this.duedate = duedate;
        this.dueTime = dueTime;
    }
}