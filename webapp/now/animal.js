// Class
function Animal(name) {
    this.name = name;
}

// Methods
Animal.prototype.walk = function(destination) {
    console.log(this.name + ' is walking to ' + destination);
};

var o1 = new Animal('Patrick');
var o2 = new Animal('Ford');

o1.walk('Kennesaw');
o2.walk('Florida');


