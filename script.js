// // HELPER FUNCTIONS
// function headRows() {
//     return [
//         { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
//     ]
// }

// function footRows() {
//     return [
//         { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
//     ]
// }

// function columns() {
//     return [
//         { header: 'ID', dataKey: 'id' },
//         { header: 'Name', dataKey: 'name' },
//         { header: 'Email', dataKey: 'email' },
//         { header: 'City', dataKey: 'city' },
//         { header: 'Exp', dataKey: 'expenses' },
//     ]
// }

// function data(rowCount) {
//     rowCount = rowCount || 10
//     var body = []
//     for (var j = 1; j <= rowCount; j++) {
//         body.push({
//             id: j,
//             name: faker.name.findName(),
//             email: faker.internet.email(),
//             city: faker.address.city(),
//             expenses: faker.finance.amount(),
//         })
//     }
//     return body
// }

// function bodyRows(rowCount) {
//     rowCount = rowCount || 10
//     var body = []
//     for (var j = 1; j <= rowCount; j++) {
//         body.push({
//             id: j,
//             name: faker.name.findName(),
//             email: faker.internet.email(),
//             city: faker.address.city(),
//             expenses: faker.finance.amount(),
//         })
//     }
//     return body
// }


function create_Table_Pdf() {
    var table = document.getElementById("my-table");

    var fromDetails = getDetails("from");
    var toDetails = getDetails("to");



    createPdf();
    function createPdf() {
        var doc = new jsPDF()
        // doc.setFontSize(11);

        // // From HTML
        // doc.autoTable({ html: '#my-table' })

        // From Javascript




        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize
        var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
        // console.log(pageSize, pageWidth);

        var finalY = doc.lastAutoTable.finalY || 10


        var companyName = 'COMPANY';
        var address = '255.255.255.255 _ Searching for you!!! Somewhere on the internet...';

        doc.setFontSize(24);
        doc.text(companyName, pageWidth / 2 - 24, finalY);
        doc.setFontSize(12);
        doc.text(address, 40, finalY + 5);

        doc.setFontSize(24);
        doc.text('TAX INVOICE', pageWidth / 2 - 30, finalY + 20);


        doc.autoTable({
            theme: 'grid',
            startY: finalY + 25,
            head: [['TRANSACTION DETAILS', 'SENDER(BILLED TO)', 'RECEIVER(SHIPPED TO)']],
            body: [
                [`Invoice No     : `, `Name    : `, `Name    : `],
                [`Invoice Date  : `, `Address : `, `Address : `],
                [`State              : `, `Email     : `, `Email     : `],
                [, `Mobile   : `, `Mobile   : `],
                [, `GSTIN   : `, `GSTIN   : `],
                [, `State      : `, `State      : `],
            ],
        })

        finalY = doc.lastAutoTable.finalY
        var count = 0;    // SL.NO
        doc.autoTable({
            theme: 'grid',
            startY: finalY + 2,
            head: [['SL.NO', 'NAME', 'QTY', 'RATE(RS)', 'SGST(%)', 'CGST(%)', 'TOTAL(RS)']],
            body: [
                [++count, 'NAME', count, 2, 20, 20, 200],
                [++count, 'NAME', count, 2, 20, 20, 200],
                [++count, 'NAME', count, 2, 20, 20, 200],
                [++count, 'NAME', count, 2, 20, 20, 200],
                [++count, 'NAME', count, 2, 20, 20, 200],
                [++count, 'NAME', count, 2, 20, 20, 200],
            ],
        })

        // doc.text('From HTML with CSS', 14, finalY + 15)
        // doc.autoTable({
        //     startY: finalY + 20,
        //     // html: '#my-table',
        //     useCss: true,
        // })



        doc.save("Invoice.pdf")
    }
}

function getDetails(formname) {
    var form = document.getElementById(`${formname}-details`);

    var title = document.getElementById(`${formname}_title_val`).value;
    var amount = document.getElementById(`${formname}_amount_val`).value;
    var pay = document.getElementById("pay").checked;
    var receive = document.getElementById("receive").checked;
    var status = pay ? "pay" : "receive";
    var duedate = document.getElementById(`${formname}_duedate_val`).value;

    return {
        title,
        amount,
        status,
        duedate,
    };
}


// not used anywhere - to check if all details are filled in a form
// - pass id_name excluding "-details"
function allDetailsFilled(formname) {
    var form = document.getElementById(`${formname}-details`);
    var inputs = form.querySelectorAll("input");
    var register = document.querySelector("button");
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
        if (
            disabled ||
            new Date(inputs[2].value) < new Date() ||
            inputs[1].value < 0
        ) {
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
}