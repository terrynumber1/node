// Class definition
function someClass() {
    // Properties goes here
    this.someProperty = 'initial value';
}

// Member functions go here:
someClass.prototype.someMemberFunction = function () {
    /* Do something using this */
    this.someProperty = 'modified value';
};

// Creation
var o1 = new someClass();

console.log(o1.someProperty);
o1.someMemberFunction();

console.log(o1.someProperty);