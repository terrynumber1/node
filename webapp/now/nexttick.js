// nexttick.js

process.nextTick(function() {
    console.log('next tick');
});

console.log('immediate');