//Variável para fixar a quantidade inicial de pizzas
let modalQt = 1;

//Funções paraa abreviar o document.querySelector
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//Mapeando as pizzas, clonando o modelo criado no HTML
pizzaJson.map((item, index) =>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //Tirando o efeito de atualização de tela ao cliclar nas pizaas
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        //Variável para exibir as informações da pizza clicada
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        //Variável para fixar a quantidade inicial de pizzas
        modalQt = 1;

        //Alterando as informações a serem exibidas no modal
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        //.forEach = Para cada um dos itens
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML = modalQt
        
        //criando animação ao clicar nas pizzas para abrir o modal de escolha
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    })

    //Puxando pizza-area e usando (.append) para adicionar o clone gerado na variavel (pizzaItem)
    c('.pizza-area').append(pizzaItem);
});