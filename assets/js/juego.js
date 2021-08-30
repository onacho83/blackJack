
let deck =[];
const tipos = ['C','H','D','S'];
const especiales = ['J','Q','K','A'];
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

    console.log(deck);
    console.log(carta);
    
    return carta;

}



const valorCarta = (carta ='')=>{
    const  valor = carta.substring(0, carta.length - 1 );
    return ( isNaN(valor) ) ?
            (valor === 'A')? 11 : 10
            : valor;
        
}


const valor = valorCarta(pedirCarta());
console.log({valor});