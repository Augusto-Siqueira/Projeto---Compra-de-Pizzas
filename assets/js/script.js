//Funções paraa abreviar o document.querySelector
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//Mapeando as pizzas, clonando o modelo criado no HTML
pizzaJson.map((item, index) =>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //Puxando pizza-area e usando (.append) para adicionar o clone gerado na variavel (pizzaItem)
    c('.pizza-area').append(pizzaItem);
});