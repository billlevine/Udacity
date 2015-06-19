var initialCats = [
		{	name: "Bill",
			imgSrc: "./img/cat1.jpg",
			imgAttribution: "http://www.crestron.com",
			nickNames:["billy", "bilbo", "will", "willy", "shitter"]	},
		{	name: "Jason",
			imgSrc: "./img/cat2.jpg",
			imgAttribution: "http://www.crestron.com",
			nickNames:["billy", "bilbo", "will", "willy", "shitter"]	},
		{	name: "Jill",
			imgSrc: "./img/cat4.jpg",
			imgAttribution: "http://www.crestron.com",
			nickNames:["billy", "bilbo", "will", "willy", "shitter"]	},
		{	name: "Criag",
			imgSrc: "./img/cat5.jpg",
			imgAttribution: "http://www.crestron.com",
			nickNames:["billy", "bilbo", "will", "willy", "shitter"]	},
		{	name: "Tippy",
			imgSrc: "./img/cat6.jpg",
			imgAttribution: "http://www.crestron.com",
			nickNames:["billy", "bilbo", "will", "willy", "shitter"]	},
];

function Cat(data) {
	this.clickCount = ko.observable(0);
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAttribution = ko.observable(data.imgSrc);
	this.nickNames = ko.observableArray(data.nickNames);

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
};

function ViewModel() {
	_this = this;
	_this.catList = ko.observableArray([]);
	initialCats.forEach( function(item) {
		_this.catList.push( new Cat(item) ); } );
	_this.currentCat = ko.observable(_this.catList()[0]);

	_this.incrementCount = function() {
		_this.currentCat().clickCount( _this.currentCat().clickCount() + 1 );
		}
	_this.catClicked = function() {
		_this.currentCat(this);	
		};
}

ko.applyBindings( new ViewModel() );
