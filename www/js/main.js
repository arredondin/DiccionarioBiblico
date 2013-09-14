
function main() {
		document.addEventListener("deviceready", aplicacionIniciada, false); // Al inciar la app
		document.addEventListener("pause", aplicacionPausada, false);        // Al pausar la app
		document.addEventListener("resume", aplicacionReiniciada, false);    // Al reiniciar la app
		document.addEventListener("online", phonegapOnline, false);          // Phonegap tiene acceso a internet
		document.addEventListener("offline", phonegapOffline, false);        // Phonegap NO tiene acceso a internet
		document.addEventListener("backbutton", atrasPulsado, false);        // Se ha pulsado la tecla atrás
		document.addEventListener("menubutton", menuPulsado, false);         // Se ha pulsado la tecla menú
		document.addEventListener("searchbutton", menuPulsado, false);       // Se ha pulsado la tecla búsqued
		//CreaDB();
}

function aplicacionIniciada()
{

}
 
function aplicacionPausada()
{
}

function loadWord(word){
	change('result.html');
	consultar(word);
}

function loadSearch(){
	change('result.html');
	var palabra = $("#palabra").val();
	consultar(palabra);
	
}

function listAll(){
	change('list.html');
	listarAll();
}

function change(target){
	$("#main").load(target);
}

function aplicacionReiniciada()
{
}
 
function phonegapOnline()
{
}
 
function phonegapOffline()
{
}
 
function atrasPulsado()
{
}
 
function menuPulsado()
{
}
 
function busquedaPulsado()
{
}

