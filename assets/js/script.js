'use strict';

var submit = document.querySelector(".submit");
var display = document.querySelector(".display");
var form = document.querySelector("form");
var search = null;
var result = null;
var Data = null;
var country = null;
var jpg = null;
var key = "2790c7c906014ddad919cfb3a389e1c7";

submit.addEventListener("click", getdata);

function getdata(e){
  e.preventDefault();
  search = document.querySelector(".location").value;

  var url = "https://api.openweathermap.org/data/2.5/weather?q="+search+"&APPID="+key+"&units=metric";

  fetch(url).then(
    function (responce) {
      console.log(responce);
      return responce.json();
    }
  ).then(
    function (data) {
      Data = data;
      console.log(Data);

      if(Data.cod == "404" || Data.cod == "400"){
        debugger;
        alert("ENTER THE CORRECT INPUTS");
        return false;
      }
      sort();
      dispaly();
    }
  )
};



function sort(){
  debugger;
  country = Data.sys.country;
  if(country == "IN"){
    country = "INDIA";
  }
  else{
    country = "DEFAULT";
  }

  var icon = Data.weather[0].icon;
  var background = { 
  	'01d' : 'clear' ,
  	'02d' : 'fewclouds' ,
  	'03d' : 'scatteredclouds' ,
  	'04d' : 'brokenclouds' ,
  	'09d' : 'showerrain' ,
  	'10d' : 'rain' ,
  	'11d' : 'thunderstorm' ,
  	'13d' : 'snow' ,
  	'50d' : 'mist' ,
  	'01n' : 'clear' ,
  	'02n' : 'fewclouds' ,
  	'03n' : 'scatteredclouds' ,
  	'04n' : 'brokenclouds' ,
  	'09n' : 'showerrain' ,
  	'10n' : 'rain' ,
  	'11n' : 'thunderstorm' ,
  	'13n' : 'snow' ,
  	'50n' : 'mist'
  };

  for (var specs in background ) {
		if( specs == icon) {
			jpg = background[specs]+".png";
		}
	}
}



function dispaly(){
  display.innerHTML = "";
  form.reset();
  debugger;

  // var articleNode = document.createElement("article");
  // var headingNode = document.createElement("h3");
  // var dateSpanNode = document.createElement("span");
  // var conditionSpanNode = document.createElement("span");
  // var tempSpanNode = document.createElement("span");
  // var humiditySpanNode = document.createElement("span");
  // var windSpanNode = document.createElement("span");
  // var ulNode = document.createElement("ul");
  // var iconliNode = document.createElement("li");
  // var descriptionliNode = document.createElement("li");
  // var iconFigureNode = document.createElement("figure");
  // var iconImgNode = document.createElement("img");
  // var figureNode = document.createElement("figure");
  // var imgNode = document.createElement("img");

  // display.appendChild(articleNode);
  // figureNode.appendChild(imgNode);
  // display.appendChild(figureNode);
  // articleNode.appendChild(headingNode);
  // articleNode.appendChild(dateSpanNode);
  // articleNode.appendChild(conditionSpanNode);
  // articleNode.appendChild(ulNode);
  // ulNode.appendChild(iconliNode);
  // iconliNode.appendChild(iconFigureNode);
  // iconFigureNode.appendChild(iconImgNode);
  // iconliNode.appendChild(tempSpanNode);
  // ulNode.appendChild(descriptionliNode);
  // descriptionliNode.appendChild(humiditySpanNode);
  // descriptionliNode.appendChild(windSpanNode);


  // iconImgNode.setAttribute ( 'src',"http://openweathermap.org/img/wn/"+Data.weather[0].icon+"@2x.png" );
  // iconImgNode.setAttribute ( 'alt',"Icon" );

  // imgNode.setAttribute ( 'src',"assets/img/"+jpg );
  // imgNode.setAttribute ( 'alt', Data.weather[0].main );

  // conditionSpanNode.setAttribute ( 'class',"condition" );
  // tempSpanNode.setAttribute ( 'class', "temp" );

  display.classList.add("display-active");

  var heading = Data.name+", "+country;
  var date = Data.weather[0].description;
  var condition = Data.weather[0].main;
  var temp = Data.main.temp+"&deg c";
  var humidity = "humidity : &nbsp;&nbsp;" +Data.main.humidity+ " %";
  var wind = "wind : &nbsp;&nbsp;" +Data.wind.speed+ " km/h";



  var iconSrc = "http://openweathermap.org/img/wn/"+Data.weather[0].icon+"@2x.png";
  var bgSrc = "assets/img/"+jpg ;


  function createNode(node , place , result ,source){
    debugger;
    var elementNode = document.createElement(node);
    elementNode.innerHTML = result;
    place.appendChild(elementNode);
    if (elementNode.localName == 'img'){
      elementNode.setAttribute("src" , source);
      elementNode.setAttribute("alt" , Data.weather[0].main);
    }
    return elementNode;
  }

  var article = createNode("article" , display , "");
  var bgfigure = createNode("figure" , display , "");
  createNode("img" , bgfigure , "" , bgSrc);
  createNode("h3" , article , heading);
  createNode("span" , article , date);
  var conditionNode = createNode("span" , article , condition);
  var ulNode = createNode("ul" , article , " ");
  var iconliNode = createNode("li" , ulNode , " ");
  var iconFigureNode = createNode("figure" , iconliNode , " ");
  createNode("img" , iconFigureNode , " " , iconSrc);
  var tempNode = createNode("span" , iconliNode , temp);
  var descriptionliNode = createNode("li" , ulNode , " ");
  createNode("span" , descriptionliNode , humidity);
  createNode("span" , descriptionliNode , wind);

  conditionNode.setAttribute ( 'class',"condition" );
  tempNode.setAttribute ( 'class', "temp" );

}
















