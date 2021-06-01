
let tp_count=document.querySelector('#count');
tp_count.addEventListener('change',function(ev){
    console.log('first page',tp_count.value);
    sessionStorage.setItem("count", tp_count.value);
})
let tp_name=document.querySelector('#name');
tp_name.addEventListener('change',function(ev){
    console.log('first page',tp_name.value);
    sessionStorage.setItem("trip_name", tp_name.value);
})

