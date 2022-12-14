//             __.                                              
//         .-".'                      .--.            _..._    
//       .' .'                     .'    \       .-""  __ ""-. 
//      /  /                     .'       : --..:__.-""  ""-. \
//     :  :                     /         ;.d$$    sbp_.-""-:_:
//     ;  :                    : ._       :P .-.   ,"TP        
//     :   \                    \  T--...-; : d$b  :d$b        
//      \   `.                   \  `..'    ; $ $  ;$ $        
//       `.   "-.                 ).        : T$P  :T$P        
//         \..---^..             /           `-'    `._`._     
//        .'        "-.       .-"                     T$$$b    
//       /             "-._.-"               ._        '^' ;   
//      :                                    \.`.         /    
//      ;                                -.   \`."-._.-'-'     
//     :                                 .'\   \ \ \ \         
//     ;  ;                             /:  \   \ \ . ;        
//    :   :                            ,  ;  `.  `.;  :        
//    ;    \        ;                     ;    "-._:  ;        
//   :      `.      :                     :         \/         
//   ;       /"-.    ;                    :                    
//  :       /    "-. :                  : ;                    
//  :     .'        T-;                 ; ;        
//  ;    :          ; ;                /  :        
//  ;    ;          : :              .'    ;       
// :    :            ;:         _..-"\     :       
// :     \           : ;       /      \     ;      
// ;    . '.         '-;      /        ;    :      
// ;  \  ; :           :     :         :    '-.      
// '.._L.:-'           :     ;          ;    . `. 
//                      ;    :          :  \  ; :  
//                      :    '-..       '.._L.:-'  
//                       ;     , `.                
//                       :   \  ; :                
//                       '..__L.:-'

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
