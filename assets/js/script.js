//Array a ser utilizado como carrinho de compras
let cart = [];
//Variável para fixar a quantidade inicial de pizzas
let modalQt = 1;
//Variável para armazenar a memória da pizza selecionada ao abrir o modal, para que as mesmas informações sejam repassadas para o carrinho
let modalKey = 0;

//Funções paraa abreviar o document.querySelector
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//Mapeando as pizzas em lista, clonando o modelo criado no HTML
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
        //Puxando a variável modalKey que irá memorizar qual key foi selecionado, para posteriormente utilizar esta memória para o carrinho 
        modalKey = key;

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

//Eventos do modal
//função para eexecutar os botões que fecham o modal
function closeModal () {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

//Criando ações dos botõs de + e - no modal
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {
        //Usando a variável modalQt com --, para reduzir um numero a cada click
        modalQt--;
        //Alterando o novo valor de modalQt
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    //Usando a variável modalQt com ++, para adicionar um numero a cada click
    modalQt++;
    //Alterando o novo valor de modalQt
    c('.pizzaInfo--qt').innerHTML = modalQt
});

//Criando ações dos botões de seleção de tamanho
cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
   size.addEventListener('click', (e)=>{
    c('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
   });
});

//Criando ação do carrinho de compras
c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    //Adicionando itens ao array do carrinho
    cart.push({
        id:pizzaJson[modalKey].id,
        size,
        qt:modalQt
    });

    //fechando modal após clilcar em "adicionar ao carrinho"
    closeModal();
});