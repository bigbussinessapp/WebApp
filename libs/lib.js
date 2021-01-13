function Bigbiz(){

    this.finance={}
    this.finance.history={}

    this.finance.history.create=(data,e)=>{
        if(data[0]!=='0'){//years ago
            if(data[3].replaceAll('-','')=='1'){
                var aa = '1_year_ago'
                var bb = '1 year ago'
            }else{
                var aa = data[3].replaceAll('-','')+'_years_ago'
                var bb = data[3].replaceAll('-','')+' years ago'
                
            }
             this.finance.history.UI(aa,bb,'','',e)

        }else if(data[1]!=='0'){//months ago
           
            if(data[3].replaceAll('-','')=='1'){
                var aa = '1_month_ago'
                var bb = '1 month ago'
            }else{
                var aa = data[3].replaceAll('-','')+'_months_ago'
                var bb = data[3].replaceAll('-','')+' months ago'
                
            }
             this.finance.history.UI(aa,bb,'','',e)
     
        }else if(data[2]!=='0'){//weeks ago
            

            if(data[3].replaceAll('-','')=='1'){
                var aa = '1_week_ago'
                var bb = '1 week ago'
            }else{
                var aa = data[3].replaceAll('-','')+'_weeks_ago'
                var bb = data[3].replaceAll('-','')+' weeks ago'
                
            }
             this.finance.history.UI(aa,bb,'','',e)
     
         }else if(data[3]!=='0'){//days ago
            if(data[3].replaceAll('-','')=='1'){
                var aa = '1_day_ago'
                var bb = 'Yesterday'
            }else{
                var aa = data[3].replaceAll('-','')+'_days_ago'
                var bb = data[3].replaceAll('-','')+' days ago'
                
            }
             this.finance.history.UI(aa,bb,'','',e)

           
         }else{//today
            
            this.finance.history.UI('Today0','Today','collapsed','show',e)
         }

    }

    this.finance.history.UI=(maincardid,daytext, class1,class2,e)=>{//5days,5days ago,collapsed,show,tradata

        var main = document.getElementById('accordion');
            var q = document.getElementById('card'+maincardid);
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

                    console.log(q)
     main.prepend(q)

    }

}
var Bigbiz= new Bigbiz();