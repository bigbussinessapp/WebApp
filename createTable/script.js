// import jsPDF from "./jspdf/jspdf.es.min.js"
// import jsPDF from "./jspdf/jspdf.umd.min.js"
// import autoTable from "./jspdf-autotable/jspdf.plugin.autotable.js"

var doc = new jsPDF();
doc.autoTable({ html: "#my-table" });
doc.save("table.pdf");