function Cat(name, image){
 this.name = name;
 this.image = image;
 this.count = 0;
 this.headertext = function(){
	 return this.name + " has " + this.count + " clicks!";}
 }

var cat1 = new Cat("Bob", "./thecat.jpg");
var cat2 = new Cat("Jack", "./thecat2.jpg");
var cat3 = new Cat("Jason", "./thecat3.jpg");
var cat4 = new Cat("Puss", "./thecat2.jpg");
var cat5 = new Cat("Kelly", "./thecat.jpg");
var allcats=[cat1,cat2,cat3,cat4,cat5];

for(i=0;i<allcats.length;i++){
	// populate list here
	// on click call show cat
	var id = allcats[i].name + "select";
	var elem = "<li id='" +id+ "'>" + allcats[i].name + "</li>";
	$('#catlist-list').append(elem);
	id = '#' + id;
	$(id).click( 
		(function(thiscat){
	 		return function() {
		 	showCat(thiscat);
		 	}
	 	})(allcats[i]));
};

function showCat(cat){
 var header="<h1 class='" +cat.name+"h1"+ "'>"+cat.headertext()+"</h1>";
 var img="<img class='" +cat.name+"img"+ "' src='" + cat.image + "'></img>";
 $('#clicker').empty();
 $('#clicker').append(header+img);
 var cls='.' +cat.name+'img'; 
 $(cls).click( 
	 
	 (function(thiscat){
	 return function() {
		 thiscat.count+=1;
		 $('.'+thiscat.name+'h1').text(thiscat.headertext());}
	 })(cat));
};
 
showCat(allcats[1]);
