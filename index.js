var ipname = document.getElementById('iptraname');
var amt = document.getElementById('traamt');
var status = document.getElementById('traptmsts');
var mode = document.getElementById('traptmmd');
var send = document.getElementById('trasend');
var receive = document.getElementById('trareceive');
var addinvoice = document.getElementById('Addinvoice');

var getdata={};

function getlocaldate(date){
   
    var date1 = date.toISOString();
    var newdate = date1.split('T')[0];
    var day = newdate.split('-')[2];
    var month = newdate.split('-')[1];
    var year = newdate.split('-')[0];
    var id = day+"-"+month+"-"+year+" "+parseInt(date.getHours())+":"+parseInt(date.getMinutes())+":"+parseInt(date.getSeconds());
    var id1 = day+month+year+date.getHours()+date.getMinutes()+date.getSeconds();
    return [id,id1];

  }

  var f={
      'traid':56566542,
      'name':"surya",
      'amt':24,
      'status':1,
      'mode':"paytm",
      's':0,
      'date':""
  }
addinvoice.addEventListener('click',function () {
   
var date = getlocaldate(new Date())[0]
var id = getlocaldate(new Date())[1]

    if(ipname.value.length>0){
        if(amt.value.length>0){
            if($('#traptmsts').val()!==0){
                if(mode.value.length>0){
                    if(send.checked || receive.checked ){

                        if(send.checked){
                            var e=0
                        }else{
                            var e = 1

                        }
                         getdata[id]= {'name':ipname.value,
                                    'amt':amt.value,
                                    'status':$('#traptmsts').val(),
                                    'mode':mode.value,
                                    's':e,
                                    'date':date.split(" ")[0],
                                    'time':date.split(" ")[1]
                                }
                            
                            window.localStorage.setItem('data',JSON.stringify(getdata))
                                
                    }

                }
            }
        }
    }
    
});

$(function() {
    if(window.localStorage.getItem('data')!==null){
        getdata = JSON.parse(window.localStorage.getItem('data'))
    }

     
var e=[]
console.log(getdata)
var key = Object.keys(getdata)

  for (let index = 0; index < key.length; index++) {
      var ele = getdata[key[index]];
      e.push(ele)
  }

  var sorted = e.sort((a, b) => {
    const aDate = new Date(a.date + ' ' + a.time)
    const bDate = new Date(b.date + ' ' + b.time)
    
    return bDate.getTime() - aDate.getTime()
  })
  

  
  for (let index = 0; index < sorted.length; index++) {
    var element = sorted[index];
   
   calculateInterval(element);
}


   });
  
  
   Date.getFormattedDateDiff = function(date1, date2) {
    var b = moment(date1),
        a = moment(date2),
        intervals = ['years','months','weeks','days'],
        out = [];
  
    for(var i=0; i<intervals.length; i++){
        var diff = a.diff(b, intervals[i]);
        b.add(diff, intervals[i]);
        out.push(diff);
    }
    return out.join(',');
  };
  
  function calculateInterval(e) {
     var start = new Date(),
         end   = new Date(e.date.split('-').reverse().join('-'));
    var data = Date.getFormattedDateDiff(start, end).split(',');
   console.log(data)

   if(data[0]!==0){//years ago

   }else if(data[1]!==0){//months ago

   }else if(data[2]!==0){//weeks ago

    }else if(data[3]!==0){//days ago

    }else{//today

    }

  }
  
  

