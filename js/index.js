$(document).ready(() => {
  Big._init_();
  document.getElementById("add-product-btn").addEventListener("click", () => {
    var product_box_dom = document.getElementById("product-name-box");
    var price_box_dom = document.getElementById("price-box");
    var quantity_box_dom = document.getElementById("quantity-box");

    var invalid_for_product = document.getElementById("invaild-product-name");
    var invalid_price = document.getElementById("invaild-price");
    var invalid_for_quantity = document.getElementById("invaild-quantity");

    product_box_dom.setAttribute("class", "form-control");
    price_box_dom.setAttribute("class", "form-control");
    quantity_box_dom.setAttribute("class", "form-control");

    var reg = /^\d+$/;

    if (
      product_box_dom.value.trim().length > 0 &&
      price_box_dom.value.trim().length > 0 &&
      reg.test(price_box_dom.value) == true &&
      quantity_box_dom.value.trim().length > 0 &&
      reg.test(quantity_box_dom.value) == true
    ) {
      var pro = product_box_dom.value;
      var pri = price_box_dom.value;
      var qua = quantity_box_dom.value;
      product_box_dom.value = "";
      price_box_dom.value = "";
      quantity_box_dom.value = "";

      Big.Add({ ProductName: pro, Price: pri, quantity: qua });
      $("#Add-product-modal").modal("hide");
    } else {
      if (product_box_dom.value.trim().length == 0) {
        invalid_for_product.innerHTML = "Product Name cannot be empty";
        product_box_dom.setAttribute("class", "form-control is-invalid");
      } else if (price_box_dom.value.trim().length == 0) {
        invalid_price.innerHTML = "Price cannot be empty";
        price_box_dom.setAttribute("class", "form-control is-invalid");
      } else if (reg.test(price_box_dom.value) == false) {
        invalid_price.innerHTML = "Price can only be a number";
        price_box_dom.setAttribute("class", "form-control is-invalid");
      } else if (quantity_box_dom.value.trim().length == 0) {
        invalid_for_quantity = "Quantity cannot be empty";
        quantity_box_dom.setAttribute("class", "form-control is-invalid");
      } else if (reg.test(quantity_box_dom.value) == false) {
        invalid_for_quantity = "Quantity can only be a number";
        quantity_box_dom.setAttribute("class", "form-control is-invalid");
      }
    }
  });

  $("#filtername").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#ttbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
  $("#PROID").on("click", function () {
    Big.SortTable();
  });

  $("#PRICEID").on("click", function () {
    var rows = $("#ttbody tr").get();
    rows.sort(Big.sortTable2);
    $.each(rows, function (index, row) {
      $("#ttbody").append(row);
    });
    if (Big.ascending) {
      Big.ascending = false;
    } else {
      Big.ascending = true;
    }
  });

  $("#QUID").on("click", function () {
    var rows = $("#ttbody tr").get();
    rows.sort(Big.sortTable3);
    $.each(rows, function (index, row) {
      $("#ttbody").append(row);
    });
    if (Big.ascending) {
      Big.ascending = false;
    } else {
      Big.ascending = true;
    }
  });
});

window.addEventListener("click", function (e) {
  if (e.target.getAttribute("class") !== null) {
    if (e.target.getAttribute("class") == "fa fa-chevron-down") {
      e.target.setAttribute("class", "fa fa-chevron-up");
    } else if (e.target.getAttribute("class") == "fa fa-chevron-up") {
      e.target.setAttribute("class", "fa fa-chevron-down");
    }
  }

  if (e.target.getAttribute("class") !== null) {
    if (
      e.target.getAttribute("class") !== "fa fa-ellipsis-v" &&
      e.target.getAttribute("class") !== "lili"
    ) {
      document.getElementById("yyy").setAttribute("class", "zxy card");
      document.getElementById("yyy").setAttribute("style", "display:none");
    }

    if (e.target.getAttribute("class") == "fa fa-ellipsis-v") {
      Big.setposition(e);
    }
  } else if (e.target.getAttribute("class") !== "lili") {
    document.getElementById("yyy").setAttribute("class", "zxy card");
    document.getElementById("yyy").setAttribute("style", "display:none");
  }

  if (e.target.getAttribute("class") == "lili") {
    if (e.target.getAttribute("id") == "vi") {
      // call edit modal
      document.getElementById("yyy").setAttribute("class", "zxy card");
      document.getElementById("yyy").setAttribute("style", "display:none");
      Big.edit(Big.a.target.parentElement.children[3]);
    } else if (e.target.getAttribute("id") == "de") {
      // call delete
      document.getElementById("yyy").setAttribute("class", "zxy card");
      document.getElementById("yyy").setAttribute("style", "display:none");
      Big.del(Big.a.target.parentElement.children[3]);
    }
    console.log(Big.a.target.parentElement.children[3]);
  }
});
