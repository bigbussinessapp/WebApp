/**
 * @copyright Big Business
 *
 * @author Shiva sandupatla
 *
 */
class Big {
  static Products = {};

  static editDom;

  static _init_() {
    var a = localStorage.getItem("products");

    if (a !== null) {
      this.Products = JSON.parse(a);

      if (Object.keys(this.Products).length > 0) {
        var ProductsKeys = Object.keys(this.Products);
        for (var product of ProductsKeys) {
          var d = this.Products[product];
          d["uid"] = product;
          this.createtd(d);
        }
      } else {
        document.getElementById("no-products").removeAttribute("hidden");
        document.getElementById("thead").remove();
        document.getElementById("ttbody").remove();
      }
    } else {
      document.getElementById("no-products").removeAttribute("hidden");
    }
  }
  static Add(data) {
    var d = Object.keys(this.Products);

    var date = new Date();

    var id =
      String(date.getDate()) +
      String(date.getMonth()) +
      String(date.getFullYear()) +
      String(date.getHours()) +
      String(date.getMinutes()) +
      String(date.getSeconds()) +
      String(date.getMilliseconds());

    var uid = uuidv4() + "_" + id;

    var s = {
      product: data.ProductName,
      price: data.Price,
      quantity: data.quantity,
      uid: uid,
    };

    this.Products[uid] = s;
    localStorage.setItem("products", JSON.stringify(this.Products));
    location.reload();

    return true;
  }

  static edit(dom) {
    var uid = dom.getAttribute("data-idd");
    var details = this.Products[uid];

    document.getElementById("product-name-box").value = details["product"];
    document.getElementById("price-box").value = details["price"];
    document.getElementById("quantity-box").value = details["quantity"];
    document.getElementById("add-product-btn").setAttribute("hidden", "hidden");
    document.getElementById("update-product-btn").setAttribute("data-idd", uid);
    document.getElementById("update-product-btn").removeAttribute("hidden");
    this.editDom = dom;
    $("#Add-product-modal").modal("show");
  }

  static del(dom) {
    var uid = dom.getAttribute("data-idd");
    delete this.Products[uid];
    localStorage.setItem("products", JSON.stringify(this.Products));
    dom.parentElement.parentElement.remove();
    var d = Object.keys(this.Products);
    if (d.length == 0) {
      document.getElementById("thead").remove();
    }
    location.reload();
  }

  static Update(dom) {
    var uid = dom.getAttribute("data-idd");

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
      $("#Add-product-modal").modal("hide");

      document.getElementById("add-product-btn").removeAttribute("hidden");
      document.getElementById("update-product-btn").removeAttribute("data-idd");
      document
        .getElementById("update-product-btn")
        .setAttribute("hidden", "hidden");

      this.Products[uid] = {
        product: pro,
        price: pri,
        quantity: qua,
      };

      localStorage.setItem("products", JSON.stringify(this.Products));

      location.reload();
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

    return true;
  }

  static ascending = false;

  static TableIDvalue = "tableid";
  static TableLastSortedColumn = -1;
  static CompareRowOfNumbers;
  static SortTable(a, b) {
    var sortColumn = 1;
    var type = "T";
    var dateformat = "";
    var table = document.getElementById(this.TableIDvalue);
    var tbody = document.getElementById("ttbody");
    var rows = tbody.getElementsByTagName("tr");

    var arrayOfRows = new Array();

    type = type.toUpperCase();

    dateformat = dateformat.toLowerCase();

    for (var i = 0, len = rows.length; i < len; i++) {
      arrayOfRows[i] = new Object();
      arrayOfRows[i].oldIndex = i;
      var celltext = rows[i]
        .getElementsByTagName("td")
        [sortColumn].innerHTML.replace(/<[^>]*>/g, "");
      if (type == "D") {
        arrayOfRows[i].value = GetDateSortingKey(dateformat, celltext);
      } else {
        var re = type == "N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
        arrayOfRows[i].value = celltext
          .replace(re, "")
          .substr(0, 25)
          .toLowerCase();
      }
    }

    if (sortColumn == this.TableLastSortedColumn) {
      arrayOfRows.reverse();
    } else {
      this.TableLastSortedColumn = sortColumn;
      switch (type) {
        case "N":
          arrayOfRows.sort(this.CompareRowOfNumbers);
          break;
        case "D":
          arrayOfRows.sort(this.CompareRowOfNumbers);
          break;
        default:
          arrayOfRows.sort(this.CompareRowOfText);
      }
    }
    var newTableBody = document.createElement("tbody");
    newTableBody.setAttribute("id", "ttbody");

    for (var i = 0, len = arrayOfRows.length; i < len; i++) {
      newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
    }
    table.replaceChild(newTableBody, tbody);
  }

  static CompareRowOfText(a, b) {
    var aval = a.value;
    var bval = b.value;
    return aval == bval ? 0 : aval > bval ? 1 : -1;
  }

  static sortTable2(a, b) {
    var A = parseInt($(a).children("td").eq(1).text(), 10);
    var B = parseInt($(b).children("td").eq(1).text(), 10);

    if (Big.ascending) {
      if (A > B) return 1;
      if (A < B) return -1;
    } else {
      if (A > B) return -1;
      if (A < B) return 1;
    }
    return 0;
  }
  static sortTable3(a, b) {
    var A = parseInt($(a).children("td").eq(2).text(), 10);
    var B = parseInt($(b).children("td").eq(2).text(), 10);

    if (Big.ascending) {
      if (A > B) return 1;
      if (A < B) return -1;
    } else {
      if (A > B) return -1;
      if (A < B) return 1;
    }
    return 0;
  }

  static createtd(data) {
    var a = document.getElementById("ttbody");
    var tr = document.createElement("tr");
    var b = document.createElement("td");
    b.innerHTML = data.product;
    var c = document.createElement("td");
    c.innerHTML = data.price;
    var d = document.createElement("td");
    d.innerHTML = data.quantity;
    var f = document.createElement("td");
    f.setAttribute("class", "fa fa-ellipsis-v");
    f.setAttribute("style", "font-size:20px;color:green");
    f.setAttribute("data-idd", data.uid);

    tr.append(b);
    tr.append(c);
    tr.append(d);
    tr.append(f);

    a.append(tr);
  }

  static a;
  static setposition(e) {
    var bodyOffsets = document.body.getBoundingClientRect();
    var tempX = e.pageX - bodyOffsets.left + 10;
    var tempY = e.pageY - bodyOffsets.top - 560;
    console.log(tempX);
    document.getElementById("yyy").setAttribute("class", "xyz card");

    Big.a = e;
    $("#yyy").css({
      display: "block",
      "z-index": "8",
      top: tempY,
      left: tempX,
    });
  }
}
