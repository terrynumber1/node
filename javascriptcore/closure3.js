var menu, outer_function,
food = 'cake';
outer_function = function () {
var fruit, inner_function;
fruit = 'apple';
inner_function = function () {
return { food: food, fruit: fruit };
}
return inner_function;
};
menu = outer_function();
// returns { food: 'cake', fruit: 'apple' }
menu();