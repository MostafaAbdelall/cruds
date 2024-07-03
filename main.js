


let title = document.getElementById('t1');
let price = document.getElementById('p1');
let taxes = document.getElementById('tax');
let ads = document.getElementById('ad');
let descount = document.getElementById('des');
let total = document.getElementById('total');
let count = document.getElementById('c1');
let category = document.getElementById('c2');
let submit = document.getElementById('sub');

let mood = 'create'
let tmp;



function getTotal(){
    if(price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value ) - +descount.value ;
        total.innerHTML = result;
        total.style.backgroundColor = '#deb887';
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = '#e74c3c';
    }
};

let dataP;

if(localStorage.product !=null){
    dataP = JSON.parse(localStorage.product)
}else{
    dataP = []
}

submit.onclick = function(){




if(title.value === ''){
    title.placeholder = 'Please Enter Title'
    title.focus()
}else if(price.value == ''){
    price.placeholder = 'Please Enter Price'
    price.focus()
}
else if(mood ==='creat' && count.value == ''){
    count.placeholder = 'Please Enter Count'
    count.focus()
}
else if(category.value == ''){
    category.placeholder = 'Please Enter Category'
    category.focus()
}

else{
    let newp = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        descount: descount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if (mood === 'create'){




        
        
        if(newp.count > 1){
            for(i = 0 ; i < newp.count ; i++ ){
                dataP.push(newp)
            }
        }else{
            dataP.push(newp)
        }

    }
    else{
        dataP [ tmp ] = newp;
    
        mood = 'create';
        submit.innerHTML= 'create';
        count.style.display = 'block';
    
    
    
    }


    
    localStorage.setItem('product', JSON.stringify(dataP))
    cleard()
    showd()
}
};
function cleard(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    descount.value = ''
    total.innerHTML = ''
    total.style.background = '#e74c3c'
    count.value = ''
    category.value = ''
}

function showd(){


    let table = '';
    for(let i = 0; i < dataP.length ; i++)
    {

        table += `
        <tr>
        <td>${i}</td>
        <td>${dataP[i].title}</td>
        <td>${dataP[i].category}</td>
        <td>${dataP[i].price}</td>
        <td>${dataP[i].taxes}</td>
        <td>${dataP[i].ads}</td>
        <td>${dataP[i].descount}</td>
        <td class="tot">${dataP[i].total}</td>

        <td><button id="up"  onclick = upDate(${i})>update</button></td>
        <td><button id="dele" onclick = dele(${i})>delete</button></td>
        <td><button id="dele"
         onclick = showm(${i}) 
         data-bs-toggle="modal"
         data-bs-target="#m6">show</button>
        </td>
        </tr>
    
    `;

    }

    document.getElementById('tbody').innerHTML = table;
    if(dataP.length > 0 ){
       btnD = document.getElementById('delete')
       btnD.innerHTML = `<button onclick = deleq()>delete all  (${dataP.length})</button>`
    }else{
        btnD.innerHTML = ''
    }

}
showd()


function showm(i){
    let show = '';
    let titleh = '';
    show = `
    <table>
        <tr>
            <th>ID</th>
            <td>${i}</td>
        </tr>
        <tr>
            <th>TITLE</th>
            <td>${dataP[i].title}</td>
        </tr>
        <tr>
            <th>CATEGORY</th>
            <td>${dataP[i].category}</td>
        </tr>				
        <tr>
            <th>PRICE</th>
            <td>${dataP[i].price}</td>
        </tr>
        <tr>
            <th>TAXES</th>
            <td>${dataP[i].taxes}</td>
        </tr>
        <tr>
            <th>ADS</th>
            <td>${dataP[i].ads}</td>
        </tr>
        <tr>
            <th>DESCOUNT</th>
            <td>${dataP[i].descount}</td>
        </tr>
        <tr>
            <th>TOTAL</th>
            <td id="tot">${dataP[i].total}</td>
        </tr>
    </table>
    `
    titleh = `<h5>${dataP[i].title}</h5>`


    document.getElementById('modal-body').innerHTML = show;
    document.getElementById('modal-title').innerHTML = titleh;
}

function upDate(i){
    console.log(i)

    title.value = dataP[i].title;
    price.value = dataP[i].price;
    taxes.value = dataP[i].taxes;
    ads.value = dataP[i].ads;
    descount.value = dataP[i].descount;
    count.style.display = 'none';
    category.value = dataP[i].category;
    submit.innerHTML = 'Update'
    mood = 'Update'
    
    tmp = i ;
    getTotal()
    scroll({
        top: 0,
        behavior: "smooth"
    })
};


function dele(i){
    dataP.splice(i,1)
    localStorage.product = JSON.stringify(dataP)
    showd()
}
function deleq(){
    ask = confirm('Are you sure for delete all items')
if(ask == true){
deleteAll()
}

}

function deleteAll(){
    dataP.splice(0)
    localStorage.product = JSON.stringify(dataP)
    showd()
}


let searchMoode = 'title';

function getSearchMoode(id){
    let search = document.getElementById('sr')
    if(id == 'sbt'){
        searchMoode = 'title';
        search.placeholder= 'Search By Title';
    }else{
        searchMoode = 'category';
        search.placeholder= 'Search By Category';
    }
    search.focus()
    search.value = '';
    showd()


}

function Search(value){

    let table = '';
    if( searchMoode == 'title'){

        for(let i = 0 ; i < dataP.length ; i ++){
            if(dataP[i].title.includes(value)){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataP[i].title}</td>
                <td>${dataP[i].category}</td>
                <td>${dataP[i].price}</td>
                <td>${dataP[i].taxes}</td>
                <td>${dataP[i].ads}</td>
                <td>${dataP[i].descount}</td>
                <td class="tot">${dataP[i].total}</td>
        
                <td><button id="up"  onclick = upDate(${i})>update</button></td>
                <td><button id="dele" onclick = dele(${i})>delete</button></td>
                <td><button id="dele"
                 onclick = showm(${i}) 
                 data-bs-toggle="modal"
                 data-bs-target="#m6">show</button>
                </td>
                </tr>
            
            `;





            }
        }
    }else{
        for(let i = 0 ; i < dataP.length ; i ++){
            if(dataP[i].category.includes(value)){
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataP[i].title}</td>
                <td>${dataP[i].category}</td>
                <td>${dataP[i].price}</td>
                <td>${dataP[i].taxes}</td>
                <td>${dataP[i].ads}</td>
                <td>${dataP[i].descount}</td>
                <td class="tot">${dataP[i].total}</td>
        
                <td><button id="up"  onclick = upDate(${i})>update</button></td>
                <td><button id="dele" onclick = dele(${i})>delete</button></td>
                <td><button id="dele"
                 onclick = showm(${i}) 
                 data-bs-toggle="modal"
                 data-bs-target="#m6">show</button>
                </td>
                </tr>
            
            `;

            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}