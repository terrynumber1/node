function Class1() {
    this.name = 'Jim';
    this.number = 1;
}

// class < link < method = function() {}
Class1.prototype.method1 = function () {
    this.name = 'Met1';
};

var o1 = new Class1();

console.log(o1.name);

o1.method1();
console.log(o1.name);