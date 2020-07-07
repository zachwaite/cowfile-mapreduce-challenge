Toy data analysis problem using cows :)
===========================================

I used to maintain herd records in yaml files. Each cow had 1 file. This
is based on the ancient tradition of dairy farmers keeping records on 'cowcards'.
The challenge with this approach is that every summary report requires reading
each file. Since IO can get expensive and could be theoretically blocking,
I thought it might be a good example to use for promises and asynchronous
programming. While it might be better if the files were e.g. on a remote server,
I think the pattern holds.

The toy example I used was to summarize the number of cows in my herd by their
current reproductive state (pregnant, open, bred). The example uses explicit
promise construction, async/await, an IIFE and lots of higher order functions.


Usage
=======

```
npm install
node .
```
