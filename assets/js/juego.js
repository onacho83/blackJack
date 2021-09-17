(()=>{
    'use strict'
    
    let deck =[];
    const tipos = ['C','H','D','S'],
        especiales = ['J','Q','K','A'];

    let puntosJugadores = [];

    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
         btnDetener = document.querySelector('#btnDetener'),
         btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelectorAll('.divCartas'),
         puntosHTML = document.querySelectorAll('small');


    const inicializarJuego = (cantJugadores = 2)=>{
        deck = crearDeck();
        
        puntosJugadores=[];
        for (let i = 0; i < cantJugadores; i++) {
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugador.forEach(elem => elem.innerHTML = '')

       
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        

        
       



    }

    // Esta función crea un nuevo deck
    const crearDeck = () => {

        deck =[];

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
       
        return _.shuffle( deck );
        
    }
    
    

    const pedirCarta = ()=>{

        if( deck === 0 ){
            throw 'No hay cartas en el  deck';
        };
        return deck.pop();
        

    }


    const valorCarta = (carta ='')=>{
        const  valor = carta.substring(0, carta.length - 1 );
        return ( isNaN(valor) ) ?
                (valor === 'A')? 11 : 10
                : valor*1;       
    }
    //Turno: 0 es el primer jugador y el ultimo es la computadora
    const acumularPuntos = (carta, turnoJugador)=>{
    puntosJugadores[turnoJugador] = puntosJugadores[turnoJugador] + valorCarta(carta);
    puntosHTML[turnoJugador].innerText= puntosJugadores[turnoJugador];
        return puntosJugadores[turnoJugador];
    }

    const crearCarta = (carta, turnoJugador)=>{
        const imgCarta = document.createElement('img'); 
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turnoJugador].append( imgCarta );
    }

    const determinarGanador = () =>{
        const [puntosMinimo, puntosComputadora] = puntosJugadores;

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
    
    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimo)=>{
        let puntosComputadora = 0;
        do {

        const carta = pedirCarta();
        
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
        
        crearCarta(carta, puntosJugadores.length-1);
            
        } while ((puntosComputadora < puntosMinimo) && puntosMinimo<=21);
        determinarGanador();
    };

        let puntosJugador= 0;
    //Eventos
    btnPedir.addEventListener('click', ()=>{
        
        const carta = pedirCarta();
        
         puntosJugador = acumularPuntos(carta, 0 ) ;
        crearCarta(carta, 0);
        

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
        
        inicializarJuego();

    });
}) ();