var db = window.openDatabase("dict", "1.0", "Dictionary", 300 * 1024);
var palabra = null;

function CreaTablas(tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS Dictionary (Topic TEXT(100), Definition TEXT);');
}

function CreaDB() {
	db.transaction(CreaTablas, errorCB, successCB);
}

function successCB(){

}

function consultar(word){
	palabra = word;
	palabra = palabra.charAt(0).toUpperCase() + palabra.substring(1,palabra.length);
	db.transaction(ObtenerDefinicion, errorCB, successCB);
}

function listarAll(){
	db.transaction(ObtenerItems, errorCB, successCB);
}

function errorCB(err) {
	alert("ERROR de LECTURA"+ err.code + "-" + err.message);
}

function ObtenerItems(tx) {
    tx.executeSql('SELECT * FROM Dictionary;', [], Enumerar, errorCB);
}

function ObtenerDefinicion(tx) {
    tx.executeSql('SELECT * FROM Dictionary WHERE Topic="'+palabra+'";', [], Resultados, errorCB);
}

function stripRtf(html){
    //var basicRtfPattern = /\{\*?\\[^{}]+}|[{}]|\\[A-Za-z]+\n?(?:-?\d+)?[ ]?/g;
    do{
		html=html.replace("\\par","")
	}while(html.indexOf('\\par') >= 0);
    html=html.replace("{\\b\\i\\cf9 Diccionario Bíblico Digital, Grupo C Service & Design Ltda., Colombia, 2003}","")

    //var stripped = str.replace(basicRtfPattern,"");

    return html.trim();
}

function Resultados(tx, results){
	var len = results.rows.length;
	if(len==0){
		$("#main").append('<div id="main" class="container jumbotron" style="text-align:center; height:100%; width:100%; padding-top:0px;"><h4>'+ palabra +'</h4><p></p><p>NO SE ENCONTRÓ RESULTADO</p><button class="btn btn-primary" style="width:100%" onclick="'+"change('search.html')"+'"">Volver</button></div>');
	}
	else{	
	    $("#main").append('<div id="main" class="container jumbotron" style="text-align:center; height:100%; width:100%; padding-top:0px;"><h4>'+ palabra +'</h4><p></p><div style="overflow-y:scroll;"><p>'+ stripRtf(results.rows.item(0).Definition) +'</div></p><button class="btn btn-primary" style="width:100%" onclick="'+"change('search.html')"+'"">Volver</button></div>');
	}
}

function Enumerar(tx, results){
	var len = results.rows.length;
	for(var i=0;i<len;i++){
		$("#main").append('<p></p><button class="btn btn-default" style="width:100%" onclick="'+"loadWord('"+ results.rows.item(i).Topic +"')"+'"">'+ results.rows.item(i).Topic +'</button>');
	}
	$("#main").append('</div>');
}
