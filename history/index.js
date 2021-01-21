offline();

var payarray= [
    {
        'TransID':123456789,
        'Name':"surya",
        'Date':"21/01/2021",
        'amount':'1250',
        'bank':'sbi',
        'status':'pending',
        'options':'http://google.com'
    },
    {
        'TransID':987456321,
        'Name':"shiva",
        'Date':"20/01/2021",
        'amount':'254',
        'bank':'sbi',
        'status':'failed',
        'options':'http://google.com'
    },
    {
        'TransID':561234789,
        'Name':"shivani",
        'Date':"19/01/2021",
        'amount':'124',
        'bank':'sbi',
        'status':'send',
        'options':'http://google.com'
    },
    {
      'TransID':8424768,
      'Name':"teja",
      'Date':"15/01/2021",
      'amount':'100',
      'bank':'sbi',
      'status':'send',
      'options':'http://google.com'
  },
  {
    'TransID':344287,
    'Name':"swamy",
    'Date':"01/01/2021",
    'amount':'124',
    'bank':'sbi',
    'status':'send',
    'options':'http://google.com'
},
{
  'TransID':874338786,
  'Name':"ovi",
  'Date':"07/01/2021",
  'amount':'124',
  'bank':'sbi',
  'status':'send',
  'options':'http://google.com'
}
]
var sorted = payarray.sort((a, b) => {
  const aDate = new Date(a.Date )
  const bDate = new Date(b.Date )
  
  return bDate.getTime() - aDate.getTime()
})
console.log(sorted);

for (let i = 0; i < sorted.length; i++) {
    createtd(sorted[i])
    
}

function createtd(data){
    var a = document.getElementById('ttbody');
    var tr = document.createElement('tr');
    var b = document.createElement('td'); b.innerHTML=data.TransID;
    var c = document.createElement('td'); c.innerHTML=data.Name;
    var d = document.createElement('td'); d.innerHTML=data.amount;
    var e = document.createElement('td'); e.innerHTML=data.Date;

   tr.append(b)
   tr.append(c)
   tr.append(d)
   tr.append(e)

   a.append(tr)

}



$("#filtername").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#ttbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });


  

 
    $("#traid").on('click', function() {
        var rows = $("#ttbody tr").get();
        rows.sort(sortTable);
        $.each(rows, function(index, row) {
            $("#ttbody").append(row);
        });
        if (ascending) {
            ascending = false;
        } else {
            ascending = true;
        }
    });

    $("#dateid").on('click', function() {
        var rows = $("#ttbody tr").get();
        rows.sort(sortTable1);
        $.each(rows, function(index, row) {
            
            $("#ttbody").append(row);
        });
        if (ascending) {
            ascending = false;
        } else {
            ascending = true;
        }
    });

    $("#amtid").on('click', function() {
        var rows = $("#ttbody tr").get();
        rows.sort(sortTable2);
        $.each(rows, function(index, row) {
            
            $("#ttbody").append(row);
        });
        if (ascending) {
            ascending = false;
        } else {
            ascending = true;
        }
    });


var ascending = false;

function sortTable(a, b) {
    var A = parseInt($(a).children('td').eq(0).text(), 10);
    var B = parseInt($(b).children('td').eq(0).text(), 10);


    if (ascending) {
        if (A > B) return 1;
        if (A < B) return -1;
    } else {
        if (A > B) return -1;
        if (A < B) return 1;
    }
    return 0;

}

function sortTable1(a, b) {
    var A = parseInt($(a).children('td').eq(3).text(), 10);
    var B = parseInt($(b).children('td').eq(3).text(), 10);


    if (ascending) {
        if (A > B) return 1;
        if (A < B) return -1;
    } else {
        if (A > B) return -1;
        if (A < B) return 1;
    }
    return 0;

}

function sortTable2(a, b) {
    var A = parseInt($(a).children('td').eq(2).text(), 10);
    var B = parseInt($(b).children('td').eq(2).text(), 10);


    if (ascending) {
        if (A > B) return 1;
        if (A < B) return -1;
    } else {
        if (A > B) return -1;
        if (A < B) return 1;
    }
    return 0;

}

$("#nameid").on('click', function() {
    SortTable();
});

var TableIDvalue = "tableid";
var TableLastSortedColumn = -1;
var CompareRowOfNumbers;
function SortTable(a,b) {
  var sortColumn = 1;
  var type = 'T'
  var dateformat = '';
  var table = document.getElementById(TableIDvalue);
  var tbody = document.getElementById('ttbody');
  var rows = tbody.getElementsByTagName("tr");

  var arrayOfRows = new Array();

  type = type.toUpperCase();

  dateformat = dateformat.toLowerCase();

  for (var i = 0, len = rows.length; i < len; i++) {
    arrayOfRows[i] = new Object;
    arrayOfRows[i].oldIndex = i;
    var celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g, "");
    if (type == 'D') {
      arrayOfRows[i].value = GetDateSortingKey(dateformat, celltext);
    } else {
      var re = type == "N" ? /[^\.\-\+\d]/g : /[^a-zA-Z0-9]/g;
      arrayOfRows[i].value = celltext.replace(re, "").substr(0, 25).toLowerCase();
    }
  }

  if (sortColumn == TableLastSortedColumn) {
    arrayOfRows.reverse();
  } else {
    TableLastSortedColumn = sortColumn;
    switch (type) {
      case "N":
        arrayOfRows.sort(CompareRowOfNumbers);
        break;
      case "D":
        arrayOfRows.sort(CompareRowOfNumbers);
        break;
      default:
        arrayOfRows.sort(CompareRowOfText);
    }
  }
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute('id','ttbody')

  for (var i = 0, len = arrayOfRows.length; i < len; i++) {
    newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
  }
  table.replaceChild(newTableBody, tbody);
}

function CompareRowOfText(a, b) {
  var aval = a.value;
  var bval = b.value;
  return (aval == bval ? 0 : (aval > bval ? 1 : -1));
}


document.getElementById('sortdate').addEventListener('change',function() {
    
    console.log(this.value)
    var a = String(this.value.split('-').reverse().join('/'))
    datefilter(a,a)
});

function datefilter(from,to){
    var from = stringToDate(from);
    var to = stringToDate(to);
  
    $("#ttbody tr").each(function() {
      var row = $(this);
      var date = stringToDate(row.find("td").eq(3).text());
      
      //show all rows by default
      var show = true;
  
      //if from date is valid and row date is less than from date, hide the row
      if (from && date < from)
        show = false;
      
      //if to date is valid and row date is greater than to date, hide the row
      if (to && date > to)
        show = false;
  
      if (show)
        row.show();
      else
        row.hide();
    });
  };
  
  //parse entered date. return NaN if invalid
  function stringToDate(s) {
    var ret = NaN;
    var parts = s.split("/");
    date = new Date(parts[2], parts[0], parts[1]);
    if (!isNaN(date.getTime())) {
      ret = date;
    }
    return ret;
  }

  offline();

    
    function offline(params) {
        
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  
   
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js', {scope: ''})
      .then((reg) => {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope);
        self.addEventListener('install', (event) => {
          event.waitUntil(
            caches.open('v1').then((cache) => {
              return cache.addAll([
                  '/history/index.html',
                  '/history/index.js',
                  '/history/index.css'
              ]);
            })
          );
        });
       
      
        self.addEventListener('activate', function(event) {
          event.waitUntil(
            caches.keys().then(function(cacheNames) {
              return Promise.all(
                cacheNames.map(function(cacheName) {
                  if (cacheName.startsWith('pages-cache-') && staticCacheName !== cacheName) {
                    return caches.delete(cacheName);
                  }
                })
              );
            })
          );
        });
      
        self.addEventListener('fetch', function(event) {
          console.log('Fetch event for ', event.request.url);
          event.respondWith(
            caches.match(event.request).then(function(response) {
              if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response;
              }
              console.log('Network request for ', event.request.url);
              return fetch(event.request).then(function(response) {
                if (response.status === 404) {
                  return caches.match('fourohfour.html');
                }
                return caches.open(cached_urls).then(function(cache) {
                 cache.put(event.request.url, response.clone());
                  return response;
                });
              });
            }).catch(function(error) {
              console.log('Error, ', error);
              return caches.match('offline.html');
            })
          );
        });
      }).catch((error) => {
        // registration failed
        console.log('Registration failed with ' + error);
      });
    }
  
    }




  