function Cat(name,image) {
	this.name = name;
	this.image = image;
	this.count = 0;
};


function ViewModel() {

	//this.cats = ko.observableArray([]);
	//this.cats.push( new Cat("bill", "./img/cat1.jpg") );
	//this.cats.push( new Cat("bob", "./img/cat2.jpg") );

	this.clickCount = ko.observable(0);
	this.name = ko.observable("bill");
	this.imgSrc = ko.observable("./img/cat1.jpg");
	this.imgAttribution = ko.observable("http://www.flickr.com");

	this.incrementCount = function() {
		this.clickCount( this.clickCount() + 1 );
		}

	this.level = ko.computed( (function(_this) {
		return function() {
		if (_this.clickCount() > 25) {
			return "teen";
		}else if (_this.clickCount() > 10) {
			return "infant";
		}else{
			return "newborn";
		}};
		}) (this) );
}

ko.applyBindings( new ViewModel() );
