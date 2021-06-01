let og_div=document.querySelector('#og_div');
let btn_div=document.querySelector('#btn_div')
let main_amt=[],c=1,prev_amt=[],nested_amt=[],nested_prev=[],names=[],init_obj={},x={},arr=[];
let count=parseInt(sessionStorage.getItem("count"));


if(sessionStorage.getItem("trip_name")!==null)
{
    h3=document.createElement('h1');
    h3.innerText=`Trip ${sessionStorage.getItem("trip_name")}`;
    h3.id="h3";
    og_div.insertAdjacentElement("beforebegin",h3);
}


function bySortedValue(obj, callback, context) {
    var tuples = [];
  
    for (var key in obj) tuples.push([key, obj[key]]);
  
    tuples.sort(function(a, b) {
      return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0
    });
  
    var length = tuples.length;
    while (length--) callback.call(context, tuples[length][0], tuples[length][1]);
  }

function creat(obj,iter,nested=false)
{
    retval=[];
    let what=document.createElement("input");
    what.setAttribute("type","text");
    what.setAttribute("placeholder","Purpose");

    let amt=document.createElement("input");
    amt.setAttribute("type","number");
    amt.setAttribute("placeholder","Amount");
    amt.min=0;

    let sub_btn=document.createElement('button');
    sub_btn.innerText="-";
    sub_btn.style.backgroundColor="red";
    sub_btn.style.color="oldlace"
    sub_btn.addEventListener('click',()=>{
        if(c===1)
        alert("You can't delete all input fields of a person. Please put 0 if the contribution of that person is zero.");
        else
        {
            c--;
            sub_btn.previousSibling.remove();
            sub_btn.previousSibling.remove();
            sub_btn.remove();
        }
    })
    
    amt.addEventListener('change',()=>{
        if(nested===false)
        {
            main_amt[iter]=main_amt[iter]+parseInt(amt.value)-prev_amt[iter];
            console.log(main_amt[iter]);
            prev_amt[iter]=parseInt(amt.value);
            console.log("array",main_amt);
            console.log(' ');
        }
        else
        {
            nested_amt[iter]=nested_amt[iter]+parseInt(amt.value)-nested_prev[iter];
            nested_prev[iter]=parseInt(amt.value);
            main_amt[iter]=main_amt[iter]+nested_amt[iter];
            console.log("array",main_amt);
            console.log(' ');
        }
        
    })

    obj.appendChild(what);
    obj.appendChild(amt);
    obj.appendChild(sub_btn);
  
}

for(let i=0;i<count;i++)
{
    main_amt[i]=0;
    prev_amt[i]=0;
    nested_amt[i]=0;
    nested_prev[i]=0;

    new_div=document.createElement("div");
    new_div.setAttribute("id","new_div");

    let name_val=document.createElement("input");
    name_val.setAttribute("type","text");
    name_val.setAttribute("placeholder",`Name of person ${i+1}`);
    name_val.style.display="block";
    name_val.addEventListener('change',()=>{
    names[i]=name_val.value;
    })
    

    og_div.appendChild(new_div);
    new_div.appendChild(name_val);

    creat(new_div,i);
    
    let add_btn=document.createElement('button');
    add_btn.innerText="+";
    add_btn.id="add_btn";

    add_btn.addEventListener('click',()=>
    {
        c++;
        new_div1=document.createElement("div");
        add_btn.insertAdjacentElement("beforebegin",new_div1);

        creat(new_div1,i,true);
    })

    new_div.appendChild(add_btn);
    
}

let calc_btn=document.querySelector('#calc');
calc_btn.addEventListener('click',()=>
{
    if(main_amt.indexOf(0)!==-1 || (names.filter(x => x !== null).length)!=count)
    {
        alert("Invalid fields. Please enter the name and amount paid for all entries.");
    }
    else
    {
    window.scrollTo(0,0);
    let tot_bill=main_amt.reduce((a, b) => a + b, 0);
    console.log("bill",tot_bill);
  
    for(let i=0;i<count;i++)
    arr.push(main_amt[i]-(tot_bill/count));
    
    for(let i=0;i<count;i++)
    init_obj[names[i]]=arr[i];
    
    bySortedValue(init_obj, function(key, value) {x[key]=value;});
   
    while (Object.values(x)[0]>0.001)
    {
        let  diff_highest_lowest = Object.values(x)[0]+Object.values(x)[count-1] ;
        let text=document.createElement('li');
        text.id="text";

        if (diff_highest_lowest > 0)
        {
           
           text.innerText=`${Object.keys(x)[count-1].toUpperCase()} pays ${Object.keys(x)[0].toUpperCase()} : Rs ${Math.round((Math.abs(Object.values(x)[count-1])*100)/100)}`;
           init_obj[Object.keys(x)[count-1]]=0 ;
           init_obj[Object.keys(x)[0]] = diff_highest_lowest;

        }
        else
        {
           text.innerText=`${Object.keys(x)[count-1].toUpperCase()} pays ${Object.keys(x)[0].toUpperCase()} : Rs ${Math.round((Math.abs(Object.values(x)[0])*100)/100)}`;
           init_obj[Object.keys(x)[count-1]]=diff_highest_lowest ;
           init_obj[Object.keys(x)[0]]=0 ;
           
        } 
       
        x={};
        bySortedValue(init_obj, function(key, value) {x[key]=value;});
        document.querySelector('#final').appendChild(text);    
       
    }
}
})