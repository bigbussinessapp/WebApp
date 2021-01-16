var sortarray={};

function Bigbiz(){
    this.domjson={};

    this.finance={}
    this.finance.history={}

    this.finance.history.create=(data,e)=>{
        if(data[0]!=='0'){//years ago
            if(data[0].replaceAll('-','')=='1'){
                var aa = '_year_ago1'
                var bb = '1 year ago'
            }else{
                var aa = '_years_ago'+data[0].replaceAll('-','')
                var bb = data[0].replaceAll('-','')+' years ago'
                
            }
            sortarray['y']=data[0]
            this.finance.history.UI(aa,bb,'','',e)

        }else if(data[1]!=='0'){//months ago
           
            if(data[1].replaceAll('-','')=='1'){
                var aa = '_xmonth_ago1'
                var bb = '1 month ago'
            }else{
                var aa = '_xmonths_ago'+data[1].replaceAll('-','')
                var bb = data[1].replaceAll('-','')+' months ago'
                
            }
            sortarray['m']=data[1]
             this.finance.history.UI(aa,bb,'','',e)
             
     
        }else if(data[2]!=='0'){//weeks ago
            

            if(data[2].replaceAll('-','')=='1'){
                var aa = '_week_ago1'
                var bb = '1 week ago'
            }else{
                var aa = '_weeks_ago'+data[2].replaceAll('-','')
                var bb = data[2].replaceAll('-','')+' weeks ago'
                
            }
            sortarray['w']=data[2]

             this.finance.history.UI(aa,bb,'','',e)
     
         }else if(data[3]!=='0'){//days ago
            if(data[3].replaceAll('-','')=='1'){
                var aa = '_day_ago1'
                var bb = 'Yesterday'
            }else{
                var aa = '_days_ago'+data[3].replaceAll('-','')
                var bb = data[3].replaceAll('-','')+' days ago'
                
            }
            sortarray['d']=data[3]

             this.finance.history.UI(aa,bb,'','',e)

           
         }else if(data[4]!=='0'){//today
            sortarray['td']=data[4]
            
            this.finance.history.UI('_aToday0','Today','collapsed','show',e)
         }

    }

    this.finance.history.UI=(maincardid,daytext, class1,class2,e)=>{//5days,5days ago,collapsed,show,tradata

        
            var q = document.getElementById(maincardid+'card');
            if(q==null){
                
                var a=document.createElement('div');
                     a.setAttribute('class','card');
                     a.setAttribute('id','card'+maincardid);

                var b = document.createElement('div');
                        b.setAttribute('style','height:3rem;');
                        b.setAttribute('id','btn'+maincardid);
                        b.setAttribute('class','card-header');

                var c = document.createElement('h5');
                        c.setAttribute('class','mb-0');

                var d = document.createElement('button');
                        d.setAttribute('class','btn '+class1)
                        d.setAttribute('style','margin-top:-.3rem;margin-bottom: 1rem;width: 100%;height:2rem;')
                        d.setAttribute('data-toggle',"collapse");
                        d.setAttribute("data-target","#list"+maincardid)
                        d.setAttribute('aria-expanded',"true");
                        d.setAttribute('aria-controls',"list"+maincardid);
                        d.innerHTML = daytext;

                        c.append(d);
                        b.append(c);
                        a.append(b);
                var f = document.createElement('div');
                        f.setAttribute('id','list'+maincardid);
                        f.setAttribute('class','collapse '+class2);
                        f.setAttribute('aria-labelledby',"btn"+maincardid)
                        f.setAttribute('data-parent',"#accordion");
                var g = document.createElement('div');
                        g.setAttribute('class','card-body');
                        f.append(g);
                        a.append(f)
                        
                        q=a;
                
            }
            var h = q.childNodes[1].childNodes[0];

            if(e.s == 0){//payment send
                var aa = 'Paid to'
                var bb = 'Debited from '
            }else{//payment received
                var aa = 'Received from'
                var bb = 'Credited to '
            }

            if(e.status == '1'){//paid
                var clr = '#26ff26'
            }else if(e.status == '2'){//pending
                var clr = '#ffff26'

            }else if(e.status == '3'){//failed
                var clr = '#ff2626'

            }

            var i = document.createElement('div');
                    i.setAttribute('class','card rounded mb-0');
                    i.setAttribute('style','height: 4rem;');
            var j = document.createElement('div');
                    j.setAttribute('class','cardshow');

            var k = document.createElement('p');
                    k.setAttribute('class','cardshow1');
                    k.innerHTML = aa

             var l = document.createElement('p');
                    l.setAttribute('class','cardshow2');
                    l.innerHTML = e.name;
             var m = document.createElement('p');
                    m.setAttribute('class','cardshow3');
                    m.innerHTML = e.date+' '+e.time;

             var n = document.createElement('p');
                    n.setAttribute('class','cardshow4');
                    n.innerHTML = 'Rs: '+e.amt+'/-'
             var o = document.createElement('p');
                    o.setAttribute('class','cardshow5');
                    o.innerHTML = bb+e.mode
             var p = document.createElement('h6');
                    p.setAttribute('class','cardshow6');
                    p.setAttribute('style','background-color:'+clr+';height:20px;width:20px')

                    j.append(k)
                    j.append(l)
                    j.append(m)
                    j.append(n)
                    j.append(o)
                    j.append(p)
                    i.append(j)
                    h.prepend(i)
                  
if(Bigbiz.domjson[q.id]==undefined){
    Bigbiz.domjson[q.id]=q
    
}else{

    Bigbiz.domjson[q.id].childNodes[1].childNodes[0].append(q.childNodes[1].childNodes[0].childNodes[0])

}
  

    }

}
var Bigbiz= new Bigbiz();

var f = {'11025548':{'name':'vishva',
                'amt':'400',
                'status':'3',
                'mode':'icici',
                's':0,
                'date':"12-01-2021",
                'time':'20:06:13',
                'id':'11025548'
        },
        '544534656':{
            'name':'asana',
            'amt':'2000',
            'status':'1',
            'mode':'sbi',
            's':1,
            'date':'12-01-2021',
            'time':'10:05:10',
            'id':'11025548'
        },
        '15412574':{
            'name':'tejash',
            'amt':'356',
            'status':'2',
            'mode':'Axis',
            's':1,
            'date':'13-01-2021',
            'time':'13:05:10',
            'id':'15412574'
        },
        '1':{
            'name':'arryan',
            'amt':'20',
            'status':'2',
            'mode':'American express',
            's':1,
            'date':'13-01-2021',
            'time':'02:05:10',
            'id':'1'
        },
        '2':{
            'name':'rohith',
            'amt':'64',
            'status':'2',
            'mode':'Paytm',
            's':1,
            'date':'06-01-2021',
            'time':'02:05:10',
            'id':'2'
        },
        '3':{
            'name':'surya',
            'amt':'54',
            'status':'2',
            'mode':'upi',
            's':1,
            'date':'20-12-2020',
            'time':'09:30:10',
            'id':'3'
        },
        '4':{
            'name':'vasanth',
            'amt':'605',
            'status':'2',
            'mode':'Dcc',
            's':1,
            'date':'04-06-2020',
            'time':'02:05:10',
            'id':'4'
        },
        '5':{
            'name':'parimala',
            'amt':'2540',
            'status':'2',
            'mode':'APGVB',
            's':1,
            'date':'13-01-2020',
            'time':'04:05:10',
            'id':'5'
        }
        }

        if(window.localStorage.getItem('data')==null){
            window.localStorage.setItem('data',JSON.stringify(f))
        console.log(JSON.stringify(f))
        }
       