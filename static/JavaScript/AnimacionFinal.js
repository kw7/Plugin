window.onload = draw;
var x=245,y=75,movBolas=0,movRayos=0, movCeniza=40;//variables globales
//coordenadas de las bolas de fuego:
var vx = [245,200,140,270,310,365];
var vy = [75,50,60,75,50,55];
//coordenadas de los rayos de fuego:
var vectorRayos = [210,60,170,90,220,30,140,60,300,60,340,90,290,30,370,60];
//variable bicarbonato:
var bicarb =0;

function draw(){
	nubesBlancas()
	var canvas = document.getElementById("canvas");
	var capaCanvas = canvas.getContext("2d");
	var iniciar=false, intervalo, iniciarNub=false, intervalo2;		
	//capaCanvas.scale(1.1, 1.1);//escalado de imagen	
	capaCanvas.beginPath();
	//capaCanvas.rotate(Math.PI/(-80));//rotar imagen
	//colorear relleno:
	capaCanvas.fillStyle = "#A0522D";/*"rgba(0,110,46,1)";*/
	
	//posicion inicial
	capaCanvas.moveTo(230,90);//quadraticCurveTo(puntx, punty,x,y)
	capaCanvas.quadraticCurveTo(220,210,10,280);
	capaCanvas.quadraticCurveTo(250,350,500,278);
	capaCanvas.quadraticCurveTo(300,250,280,90);
	capaCanvas.bezierCurveTo(210,100,290,90,280,90);		
	capaCanvas.fill();
	document.getElementById("boton").addEventListener("click",function(){	
	if (iniciar){
		this.value="Iniciar";
		window.clearInterval(intervalo);
		iniciar=false;
		//limpia (posx, posx, ancho, alto)
		capaCanvas.clearRect(0,0,400,91);
		var bol = document.getElementById("bolasFuego");
		var bolasFueg = bol.getContext("2d");
		bolasFueg.clearRect(0,0,400,91);
		/*codigo que limpia el id ceniza:*/
		var ceniz = document.getElementById("ceniza");
		var ceniza = ceniz.getContext("2d");	
		//limpia (posx, posx, ancho, alto)
		ceniza.clearRect(0,0,400,200);
		}
	else{
		this.value="Detener";
		intervalo = window.setInterval(function(){moverBolasFuego(capaCanvas)},200);//200 fotogramas*seg.
		iniciar=true;
		}
	});
	
	//boton nube:
	document.getElementById("btonNube").addEventListener("click",function(){	
	if (iniciarNub){
		this.value="Iniciar";
		window.clearInterval(intervalo2);
		iniciarNub=false;
		var ceniz = document.getElementById("ceniza");
		var ceniza = ceniz.getContext("2d");	
		//limpia (posx, posx, ancho, alto)
		ceniza.clearRect(0,0,400,200);
		}
	else{
		this.value="Detener";
		intervalo2 = window.setInterval(function(){moverCeniza()},200);//200 fotogramas*seg.
		iniciarNub=true;
		}
	});
	}	
	
function moverBolasFuego(capaCanvas){
	bolasFuego()//llamada a la funcion
	rayosFuego(capaCanvas)
	if(x == vx[movBolas] && movBolas <6){
		movBolas+=1;;
		x = vx[movBolas];
		y = vy[movBolas];
	}
	else{					
		x = 245;
		y = 75;
		movBolas =0;
	}
}
	
function bolasFuego(){
	var bol = document.getElementById("bolasFuego");
	var bolaFuego = bol.getContext("2d");
	//limpia o borra las bolitas ya dibujadas (posx, posx, ancho, alto)
	bolaFuego.clearRect(125,38,280,53);
	bolaFuego.beginPath();		
	//ancho de linea:
	bolaFuego.lineWidth = 2;
	bolaFuego.beginPath();
	//colorear relleno:
	bolaFuego.fillStyle = "red";
	//colorear trazado:
	bolaFuego.strokeStyle = "yellow";
	//circulo usando arc (x,y,radio,anguloInicio,anguloFin,boolean)
	bolaFuego.arc(x, y, 10, 0, 2 * Math.PI, true);
	bolaFuego.fill();
	bolaFuego.stroke();
	moverCeniza()
}
	
function rayosFuego(capaCanvas){
	capaCanvas.beginPath();
	//ancho de linea:
	capaCanvas.lineWidth = 3;
	//colorear trazado:
	capaCanvas.strokeStyle = "red";
	capaCanvas.moveTo(255,90);	
	capaCanvas.quadraticCurveTo(vectorRayos[movRayos],vectorRayos[movRayos+1],vectorRayos[movRayos+2],vectorRayos[movRayos+3]);
	//contexto.moveTo(250,90);
	movRayos+=4;
	if(movRayos>16){
		movRayos=0;
	}
	capaCanvas.stroke();		
}
	
function moverCeniza(){	
	var desplazar=-5;
	var ceniz = document.getElementById("ceniza");
	var cenizza = ceniz.getContext("2d");	
	//limpia (posx, posx, ancho, alto)
	//cont.clearRect(100,29,380,82);
	cenizza.beginPath();	
	cenizza.lineHeight = 3;
	cenizza.strokeStyle = "black";
	cenizza.fillStyle = "rgba(89,106,114,1)";
	cenizza.moveTo(230,90);
	cenizza.bezierCurveTo(55,155,105,15,205,65);
	cenizza.bezierCurveTo(205,35,295,15,305,65);
	cenizza.bezierCurveTo(375,5,485,155,285,95);	
	if(movCeniza>0){
		cenizza.translate(0,desplazar);
		movCeniza+= desplazar;
	}
	else{
		movCeniza=40;
		cenizza.translate(0,movCeniza);
	}
	cenizza.fill();
	cenizza.stroke();
}

function nubesBlancas(){
	var nubBla = document.getElementById("nubBlanca");
	var NubBlanca = nubBla.getContext("2d");	
	NubBlanca.beginPath();
	//fillStyle="rgba(rojo, verde, azul, transparencia)"
	NubBlanca.fillStyle="rgba(232,236,247,0.5)";
	NubBlanca.arc(100,100,40,0,Math.PI*2, false);		
	NubBlanca.arc(154,110,30,0,Math.PI*2, false);
	NubBlanca.moveTo(185,109);
	NubBlanca.arc(232,90,62,0,Math.PI*2, false);		
	NubBlanca.arc(300,95,25,0,Math.PI*2, false);
	NubBlanca.arc(320,60,34,0,Math.PI*2, false);		
	NubBlanca.arc(340,80,30,0,Math.PI*2, false);
	NubBlanca.arc(400,100,41,0,Math.PI*2, false);
	NubBlanca.fill();
}

//funcion que muestra un # al deslizar la barra (range) en el html
function vinagreSlider(vin){
	document.querySelector('#vinagreSalida').value = vin;
	
	var fila2colum2 = document.getElementById("fil2colm2");
	var fila2colum3 = document.getElementById("fil2colm3");
	var fila3colum2 = document.getElementById("fil3colm2");
	var fila3colum3 = document.getElementById("fil3colm3");
	var fila4colum2 = document.getElementById("fil4colm2");
	var fila4colum3 = document.getElementById("fil4colm3");	
	
	if(vin>99 && vin<151){	
		fila3colum2.style.backgroundColor="transparent";//asigna transparencia la celda
		fila4colum2.style.backgroundColor="transparent";//asigna transparencia la celda
		fila2colum2.style.backgroundColor="pink";			
	}
	
	if(vin>49 && vin<100){
		fila2colum2.style.backgroundColor="transparent";//asigna transparencia la celda
		fila4colum2.style.backgroundColor="transparent";//asigna transparencia la celda
		fila3colum2.style.backgroundColor="pink";//asigna color a la celda
	}
	
	if(vin<51 || vin >150){		
		fila2colum2.style.backgroundColor="transparent";//asigna transparencia la celda
		fila3colum2.style.backgroundColor="transparent";//asigna transparencia la celda
		fila4colum2.style.backgroundColor="pink";//asigna color a la celda		
	}
	//alert(bicarb);//muestra un mensaje en pantalla
}

function bicarbonatoSlider(bic) {
	bicarb=bic;	
	document.querySelector('#bicarbonatoSalida').value = bic;
	
	var fila2colum2 = document.getElementById("fil2colm2");
	var fila2colum3 = document.getElementById("fil2colm3");
	var fila3colum2 = document.getElementById("fil3colm2");
	var fila3colum3 = document.getElementById("fil3colm3");
	var fila4colum2 = document.getElementById("fil4colm2");
	var fila4colum3 = document.getElementById("fil4colm3");		
	
	if(bicarb>19 && bicarb<41){
		fila3colum3.style.backgroundColor="transparent";//asigna transparencia la celda
		fila4colum3.style.backgroundColor="transparent";//asigna transparencia la celda
		fila2colum3.style.backgroundColor="pink";//asigna color a la celda
	}				
	
	if(bicarb>7 && bicarb<20){
		fila2colum3.style.backgroundColor="transparent";//asigna transparencia la celda
		fila4colum3.style.backgroundColor="transparent";//asigna transparencia la celda
		fila3colum3.style.backgroundColor="pink";//asigna color a la celda
	}		
	
	if(bicarb>40 || bicarb<8){
		fila2colum3.style.backgroundColor="transparent";//asigna transparencia la celda
		fila3colum3.style.backgroundColor="transparent";//asigna transparencia la celda
		fila4colum3.style.backgroundColor="pink";//asigna color a la celda
	}
}