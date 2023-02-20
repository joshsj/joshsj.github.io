IConfiguration config = null;

// Value access
config.GetValue<bool>("SomeBool");

// Nested values
config.GetValue<string>("NestedBool:AnotherBool");

// Section scope
var faveDrinks = config.GetSection("Favourites:Drinks");
var faveHotDrink = faveDrinks.GetValue<string>("Hot");