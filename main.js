
'use strict';

function startGame () {

    const $gameItems = document.querySelector('.game-items');
    const $reset = document.querySelector('#reset');
    const $colorAlfa = document.querySelector('.color-alfa');
    const $colorBeta = document.querySelector('.color-beta');
    const colorInputDefault = {
        alfa: '#FF0000',
        beta: '#000000'
    }
    let $itemAlfa;
    let $itemBeta;
    let dragged;
    let $fill;


    function startup(e) {
        e.preventDefault();
        const { alfa, beta } = colorInputDefault;
        clearColor(alfa, $colorAlfa);
        clearColor(beta,$colorBeta);
    }

    function createBoard(){

        let totalTab = 8;
        
        for(let i = 0; i < totalTab; i++){
            
            for(let j = 0; j < totalTab; j++){

                let divBoard = document.createElement('div');

                if(i % 2 === 0 && j % 2 === 0){
                    divBoard.setAttribute('class', 'fill box');  
                }
                if(i % 2 === 1 && j % 2 === 1){
                    divBoard.setAttribute('class', 'fill box');
                }
                
                $gameItems.appendChild(divBoard);
            } 
        }
    }


    function createItemPlayer(){

        const totalItemAlfa = 8;
        let divItemAlfa;
        let totalItemBeta = 8;
        let divItemBeta;
        $fill = document.querySelectorAll('.fill');

        for(let i = 0; i < $fill.length; i++){
            if(i < totalItemAlfa){
                divItemAlfa = document.createElement('div');
                divItemAlfa.setAttribute('class', 'item-alfa');
                divItemAlfa.setAttribute('draggable', 'true');
                $fill[i].appendChild(divItemAlfa);
            }
        }

        
        for(let i = $fill.length - totalItemBeta; i < $fill.length; i++){
            
            divItemBeta = document.createElement('div');
            divItemBeta.setAttribute('class', 'item-beta');
            divItemBeta.setAttribute('draggable', 'true');
            $fill[i].appendChild(divItemBeta);
        }
    }


    function clearColor(color, colorInput){
        colorInput.value = color;
    }


    function watchColor(colorInput, colorItem, classItem) {
        const newColor = colorInput.value;
        colorItem = document.querySelectorAll(classItem);
        colorItem.forEach(item => 
            item.style.backgroundColor = newColor
        )
    }

    function changeColorAlfa(e) {
        e.preventDefault();
        if(e.target.tagName === 'INPUT'){
            $itemAlfa.forEach(item => {
                item.style.backgroundColor = e.target.value;
            })
        }
    }

    function changeColorBeta(e) {
        e.preventDefault();
        if(e.target.tagName === 'INPUT'){
            $itemBeta.forEach(item => {
                item.style.backgroundColor = e.target.value;
            })
        }
    }


    function cleanItems(event){
        event.preventDefault();
        
        $fill.forEach(item => { 
            while (item.hasChildNodes()) {
                item.removeChild(item.lastChild);
            }
        })
        event.stopPropagation();
        createItemPlayer();
        watchColor($colorAlfa, $itemAlfa, '.item-alfa');
        watchColor($colorBeta, $itemBeta, '.item-beta');
        dragStartEndGame();
        dragDropGame();
    }


    // const diagonalMove = () => {

        

    //     return diagonal;
    // }


    const moveItems = (content, move, element) => {

        if( content[move] === element ) {
            element.append(dragged);
        }
    }


    const indexDragStar = (content) => {
        let indexDragged;
        content.forEach( (item, i) => {
            if(item.childNodes[0] === dragged){
                indexDragged = i;
            }
        })
        return indexDragged;
    }


    function dragStart(event) {
        dragged = event.target;
        event.target.style.opacity = 0.5;
        indexDragStar($fill);
    }


    function dragEnd(event) {
        event.preventDefault();
        event.target.style.opacity = 1;
    }


    function dragOver( event ) {
        event.preventDefault();
    }


    function dragLeave(event) {
        event.preventDefault();
    }


    function dragEnter( event ) {
        event.preventDefault();
    }


    function dragDrop( event ) {
        event.preventDefault();
        if(event.target.classList.contains('fill')){
            if(!event.target.hasChildNodes()){

                const diagonal = [
                    indexDragStar($fill) + 3, 
                    indexDragStar($fill) + 4, 
                    indexDragStar($fill) + 5,
                    indexDragStar($fill) - 3, 
                    indexDragStar($fill) - 4, 
                    indexDragStar($fill) - 5
                ];
                const [x,y,z,a,b,c] = diagonal;

                const sideMove = [7,8,15,16,23,24];
                const firstCenterMove = [1,2,3,9,10,11,17,18,19,25,26,27];
                const centerMove = [4,5,6,12,13,14,20,21,22,28,29,30];
                
                for(let i = 0; i < $fill.length; i++) {

                    if(i === indexDragStar($fill)){

                        if(i === 0){
                            moveItems($fill, y, event.target);
                        }
                        if(i === 31){
                            moveItems($fill, b, event.target);
                        }
                       
                        centerMove.filter((item) =>  {
                           if(item === i){
                                moveItems($fill, y, event.target); 
                                moveItems($fill, z, event.target);
                                moveItems($fill, a, event.target);  
                                moveItems($fill, b, event.target); 
                                moveItems($fill, c, event.target);
                           }
                        });

                        firstCenterMove.filter((item) =>  {
                            if(item === i){
                                moveItems($fill, x, event.target);
                                moveItems($fill, y, event.target);
                                moveItems($fill, a, event.target); 
                                moveItems($fill, b, event.target); 
                                moveItems($fill, c, event.target); 
                            }
                        });

                        sideMove.filter((item) =>  {
                            if(item === i){
                                moveItems($fill, y, event.target);
                                moveItems($fill, b, event.target); 
                            }
                         });
                    }
                }           
            }   
        }
    }


    window.addEventListener("load", startup);


    function dragStartEndGame(){
        $itemAlfa = document.querySelectorAll('.item-alfa');
        $itemAlfa.forEach(item => {
            item.addEventListener('dragstart', dragStart)
            item.addEventListener('dragend', dragEnd)
        });

        $itemBeta = document.querySelectorAll('.item-beta');
        $itemBeta.forEach(item => {
            item.addEventListener('dragstart', dragStart)
            item.addEventListener('dragend', dragEnd)
        });
    }

    $colorAlfa.addEventListener("change", changeColorAlfa);
    $colorBeta.addEventListener("change", changeColorBeta);

    $reset.addEventListener('click', cleanItems);

    function dragDropGame(){

        $fill.forEach(f => {
            f.addEventListener('dragover', dragOver);
            f.addEventListener('dragenter', dragEnter);
            f.addEventListener('dragleave', dragLeave);
            f.addEventListener('drop', dragDrop);
        });
    }


    createBoard();
    createItemPlayer();
    dragStartEndGame();
    dragDropGame();
}

startGame();



