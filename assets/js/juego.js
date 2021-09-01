
let deck =[];
const tipos = ['C','H','D','S'];
const especiales = ['J','Q','K','A'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartaJugador = document.querySelector('#jugador-cartas');
const divCartaComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');



// Esta función crea un nuevo deck
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo);
        }
    }
    // console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}
crearDeck();

const pedirCarta = ()=>{

    if( deck === 0 ){
        throw 'No hay cartas en el  deck';
    };
    const carta = deck.pop();
    return carta;

}


const valorCarta = (carta ='')=>{
    const  valor = carta.substring(0, carta.length - 1 );
    return ( isNaN(valor) ) ?
            (valor === 'A')? 11 : 10
            : valor*1;
        
}

// Turno de la computadora
const turnoComputadora = (puntosMinimo)=>{

    do {

    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText= puntosComputadora;

    //<img class="carta" src="assets/cartas/3C.png" alt="">
    const imgCarta = document.createElement('img'); 
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartaComputadora.append( imgCarta );

    if(puntosMinimo > 21){
        
        break;
    }
           
    } while ((puntosComputadora < puntosMinimo) && puntosMinimo<=21);

   setTimeout(()=>{
    if(puntosComputadora === puntosMinimo){
        alert('Empate!');
    } else if (puntosComputadora > 21){
        alert('Genial, Ganaste!');
    } else if(puntosMinimo>21){
        alert ('Computadora Gana');
    }else {
        alert ('Computadora Gana');
    }
   }, 100)

};


//Eventos
btnPedir.addEventListener('click', ()=>{

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText= puntosJugador;

    //<img class="carta" src="assets/cartas/3C.png" alt="">
    const imgCarta = document.createElement('img'); 
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartaJugador.append( imgCarta );

    if(puntosJugador > 21 ) {
        console.warn('lo siento mucho, perdiste');
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21 ){
        console.warn('21, Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', ()=>{
    
    deck =[];
    crearDeck();

    puntosJugador = 0,
    puntosComputadora = 0;

    //Referencias del HTML
     btnPedir.disabled = false;
     btnDetener.disabled = false;
    

     divCartaJugador.innerText = '';
     divCartaComputadora.innerText = '';
     puntosHTML[0].innerText = 0;
     puntosHTML[1].innerText = 0;
});