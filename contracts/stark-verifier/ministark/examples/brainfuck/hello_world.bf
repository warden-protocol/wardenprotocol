// Source: https://esolangs dot org/wiki/Brainfuck
+++++ +++++             // initialize counter to 10
[                       // use loop to set 70/100/30/10
    > +++++ ++          //     add  7 to cell #1
    > +++++ +++++       //     add 10 to cell #2
    > +++               //     add  3 to cell #3
    > +                 //     add  1 to cell #4
<<<< -                  // decrement counter
]
> ++ .                  // print 'H'
> + .                   // print 'e'
+++++ ++ .              // print 'l'
.                       // print 'l'
+++ .                   // print 'o'
> ++ .                  // print ' '
<< +++++ +++++ +++++ .  // print 'W'
> .                     // print 'o'
+++ .                   // print 'r'
----- - .               // print 'l'
----- --- .             // print 'd'