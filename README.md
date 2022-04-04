# Jogo de Dama  

Damas é um jogo popular de tabuleiro 8 x 8 em que as peças ocupam somente as casas de uma determinada cor. 


![Preview](picture.png)


Função que muda a cor da peças do tabuleiro, baseada na escolha do item selecionado.


    function changeColorAlfa(e) {
        e.preventDefault();
        if(e.target.tagName === 'INPUT'){
            $itemAlfa.forEach(item => {
                item.style.backgroundColor = e.target.value;
            })
        }
    }


Função que guarda a o indice das peças localizadas na parte escura do tabuleiro.

    const indexDragStar = (content) => {
        let indexDragged;
        content.forEach( (item, i) => {
            if(item.childNodes[0] === dragged){
                indexDragged = i;
            }
        })
        return indexDragged;
    }


<b>Este teste possui</b> 💥

- Estrutura básica da página
- Estado inicial
- Movimentos válidos



Para iniciar a aplicação:
    
    npm install
    
    npm start



### Obrigada pela visita 
