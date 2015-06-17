function Cat(name, image){
 this.name = name;
 this.image = image;
 this.count = 0;
 this.headertext = function(){
	 return this.name + " has " + this.count + " clicks!";}
this.clicked = function(){ this.count = this.count + 1; }
 }


function Model(){
	
		this.init = function() {
			// load up cats here
			this.cats = [];
			this.cats.push(new Cat("Bob", "./thecat.jpg"));
			this.cats.push(new Cat("Jack", "./thecat2.jpg"));
			this.cats.push(new Cat("Jason", "./thecat3.jpg"));
			this.cats.push(new Cat("Puss", "./thecat2.jpg"));
			this.cats.push(new Cat("Kelly", "./thecat.jpg"));
		};

	this.GetDefaultCat = function(){return this.cats[0]; }
	this.getAllCats = function() { return this.cats; }
}


function CatListView(){
	this.init = function() {},
	this.render = function (cats){
	
		elem = $('ul#catlist');
		elem.empty();
		for(i = 0 ; i<cats.length ; i++) {
			var liid = cats[i].name+'selected'; 
			elem.append('<li id=' +liid+ '>' +
							cats[i].name + 
							'</li>');
			$('#'+liid).click( (function(thiscat) {
					return function() {controller.catSelected(thiscat);}

					})(cats[i]));
			}
		}
}

function CatClickerView(){
	this.init = function() {
		$('#adminbtn').click( function() {
				$('div#catadmin').toggleClass('hidden');
				thiscat = controller.currentCat;
				$(':input[name=catname]').val(thiscat.name);
				$(':input[name=caturl]').val(thiscat.image);
				$(':input[name=catcount]').val(thiscat.count);
			});
		$('#admincancel').click( function() {
				$('div#catadmin').toggleClass('hidden');
			});	

		$('#adminapply').click( function() {
			thiscat = controller.currentCat;
			
			data = $('#adminform').serializeArray().map( function(v) { return[v.name,v.value];} );
			obj = new Object();
			for (i = 0 ; i < data.length; i++){
				obj[data[i][0]] = data[i][1];}

			thiscat.name = obj['catname'];
			thiscat.count = Number(obj['catcount']);
			thiscat.image = obj['caturl'];
	
			controller.onCatsUpdated();	
			$('div#catadmin').toggleClass('hidden');
			});
		
		}

	this.render = function(cat) {
		$('#current_catname').text(cat.name);
		$('#current_clicks').text(cat.count + ' clicks!');
		$('#current_catpic').attr('src', cat.image);
		$('#current_catpic').unbind().click(
			(function(thiscat) { return function() {controller.catClicked(thiscat);}})(cat))

		}
}

function Octopus(){
	this.init = function(model, view){
				this.model = new Model();
				this.viewList = new CatListView();
				this.viewClicker = new CatClickerView();
				
				this.model.init();
				this.viewList.init();
				this.viewClicker.init();

				this.currentCat = this.model.GetDefaultCat();
				this.onCatsUpdated();
				//this.viewClicker.render(this.currentCat);
				//this.viewList.render( this.model.getAllCats() );
			}
	this.catSelected = function(clickedCat) {
				this.currentCat = clickedCat;
				this.viewClicker.render(this.currentCat);
			}
	this.catClicked = function(clickedCat)	{
				clickedCat.clicked();
				this.viewClicker.render(clickedCat);
			}
	this.onCatsUpdated = function() {
				this.viewClicker.render(this.currentCat);
				this.viewList.render( this.model.getAllCats() );
			}
}

var controller = new Octopus();
controller.init();
