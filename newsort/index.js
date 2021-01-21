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
console.log(sorted)

$(function () {
    createCustomConditionsFilteringGrid();
    
    document.addEventListener('click',function(e){
      console.log(e.target.parentNode.childNodes[1])
        if(e.target.getAttribute('aria-describedby') == 'gridCustomConditions_options'){
            if(e.target.innerText.length>0){
                console.log(e.target.parentNode.childNodes[1].innerText)
                window.open(e.target.innerText);
            }
           
        }
        


    })
    
});
var date = new Date('2021-01-19')
console.log(date)
function createCustomConditionsFilteringGrid() {
    $("#gridCustomConditions").igGrid({
        autoGenerateColumns: false,
        columns: [ 
            { headerText: "Trans ID", key: "TransID", dataType: "no" },
            { headerText: " Name", key: "Name", dataType: "string" },
            { headerText: "Date", key: "Date", dataType: "date" },
            { headerText: "amount", key: "amount", dataType: "number" },
            { headerText: "bank", key: "bank", dataType: "string" },
            { headerText: "status", key: "status", dataType: "string" },
            { headerText: "invoice", key: "options", dataType: "no" }
        ],
        dataSource: sorted,
        renderCheckboxes: true,
        responseDataKey: "results",
        features: [
            {
                name: "Filtering",
                mode: "simple",
                filterDialogContainment: "window",
                columnSettings: [
                {
                    columnKey: "Country",
                    customConditions: {
                       USA: {
                            key: 'USA',
                            labelText: 'USA',
                            expressionText: "USA"
                       },
                       Canada:{
                             key: 'Canada',
                             labelText: 'Canada',
                             expressionText: "Canada"
                       },
                    }
                },
                {
                    columnKey: "Age",
                    customConditions: {
                        Over21: {
                            labelText: 'Over 21',
                            expressionText: 'Over 21',
                            requireExpr: false
                        }
                    },
                    defaultExpressions: [
                        { cond: "Over21" }
                    ]
                }
            ]
            },
            {
                name: "Paging",
                type: "local",
                pageSize: 10
            }
        ]
    });
}


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
    navigator.serviceWorker.register('./sw.js', {scope: './'})
    .then((reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
      self.addEventListener('install', (event) => {
        event.waitUntil(
          caches.open('v1').then((cache) => {
            return cache.addAll([
                '/newsort/index.html',
                '/newsort/index.html',
                '/newsort/TRAlib/core.css',
                '/newsort/TRAlib/core.js',
                '/newsort/TRAlib/lob.js',
                '/newsort/TRAlib/theme.css',
                '/newsort/TRAlib/images/igLoadingSmall.gif',
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

  