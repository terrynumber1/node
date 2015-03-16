var add = (function() {
    var counter = 0;
    return function() {
        return counter = counter + 1;
    }
})();