  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var mostrarErrores = 1;
var app = new Framework7({


    // App root element
    root: '#app',
    // App Name
    name: 'Student',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'false',
    },

    
    // Add default routes
    routes: [
      {
        path: '/foro/',
        url: 'foro.html',
      },
       {
        path: '/horarios/',
        url: 'horarios.html',
      },
          {
        path: '/forologin/',
        url: 'forologin.html',
      },

      {
        path: '/fororegister2/',
        url: 'fororegister2.html',
      },

         {
        path: '/fororegister/',
        url: 'fororegister.html',
      },
         {
        path: '/inicioforo/',
        url: 'inicioforo.html',
      },
      {
        path: '/forogeneral/',
        url: 'forogeneral.html',
      },
         {
        path: '/perfil/',
        url: 'perfil.html',
      },
           {
        path: '/forotema/',
        url: 'forotema.html',
      },
             {
        path: '/recuperarcuenta/',
        url: 'recuperarcuenta.html',
      },

         {
        path: '/prueba/',
        url: 'prueba.html',
      },

         {
        path: '/creartema/',
        url: 'creartema.html',
      },

         {
        path: '/publicacion/',
        url: 'publicacion.html',
      },




    ]
    // ... other parameters
  } );

var mainView = app.views.create('.view-main');
var elnombre;
var email="lucho.campos@outlook.com";
var nombre;
var usuario;
var db, refUsuarios, refDatos,refForo;
var contgeneral= "klñasd";
var carrera, localidad, institucion, provincia;
var contenidotema,titulotema;
var publicar= Date.now();

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

db = firebase.firestore();
refUsuarios=db.collection("USUARIOS");
refDatos=db.collection("DATOS");
refForo=db.collection("FORO");


$$('#publicar').on('click', fnPublicar);

   $$('#continuar').on('click', fnContinuar );

      
      $$('#login').on('click', fnLogin);
      
      $$('.btn-facebook').on('click', fnFacebook);

      $$('#btn-register').on('click', fnRegister);

       $$('.btn-google').on('click', fnGoogle);



});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
        fnMostrarError(e);
$$('#publicar').on('click', fnPublicar);
   $$('#continuar').on('click', fnContinuar);
      $$('#login').on('click', fnLogin);
      $$('.btn-facebook').on('click', fnFacebook);
      $$('#btn-register').on('click', fnRegister);
      $$('.next').on('click', fnNext);
      $$('.btn-google').on('click', fnGoogle);
    //   $$('#continuar').on('click', buscarEnBase );



$$('.open-confirm').on('click', function () {
  app.dialog.confirm('Publicar tema?', function callbackok(){
mainView.router.navigate("/forogeneral/");

  }  )}) 



 





 /*
function fnAgregaAPrincipal() {
console.log("entro a la funcion fnAgregaAPrincipal");
 console.log("ACUMULADOR GLOBAL PAI"+ acumGlobal); 
  var db = firebase.firestore();
  db.collection("personas").doc(elmail).collection("auto").doc(lapatente).collection("trabajos")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    //en mi caso genero el codigo HTML para visualizarlo en pantalla
    if(acumGlobal==0)
    { 
    if( acumGlobal<doc.data().fechaCodigo){
    $$(".contenidoTrabajos").append(
      "<div class='card card-outline tarjetaTrabajo'>"+
       "<div class='card-content card-content-padding '>"+
          "<ul>"+
           "<li>TRABAJO  : "+`${doc.data().nombreTrabajo}`+"</li>"+
           "<li>KILOMETRAJE  : "+`${doc.data().kmActualTrabajo}`+"</li>"+
           "<li>MONTO  : "+`${doc.data().montoTrabajo}`+"</li>"+
           "<li>FECHA : "+`${doc.data().fechaActual}`+"</li>"+
           "<li>LUGAR  : "+`${doc.data().lugarTrabajo}`+"</li>"+
           "<li>DIRECCION : "+`${doc.data().direccionTrabajo}`+"</li>"+
          "</ul>"+
          "</div>"+
        "</div>"
          );
          console.log("SALIO . APPEND"); 
             acumGlobal=doc.data().fechaCodigo;
                }
              
           console.log("consulta "+ acumGlobal); 
        }
        else{
        $$(".contenidoTrabajos").html(
          "<ul>"+
           "<li>Trabajo : "+`${doc.data().nombreTrabajo}`+"</li>"+
           "<li>Kilometraje  : "+`${doc.data().kmActualTrabajo}`+"</li>"+
           "<li>Montod el Trabajo : "+`${doc.data().montoTrabajo}`+"</li>"+
           "<li>Fecha del trabajo : "+`${doc.data().fechaActual}`+"</li>"+
           "<li>Lugar  : "+`${doc.data().lugarTrabajo}`+"</li>"+
           "<li>Direccion : "+`${doc.data().direccionTrabajo}`+"</li>"+
          "</ul>");
          console.log("SALIO . HTML ESTIMO CONSULTA =1");
          console.log("consulta "+ acumGlobal);
       } 
      })
    })
   .catch(function(error) {
      console.log("Error de obtencion de documentos de Trabajos :() ", error); }) 
    

*/




})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="forogeneral"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized

cargarforogeneral(e); 
fnPublicar();

})
$$(document).on('page:init', '.page[data-name="inicioforo"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized

     cargarinicioforo(e);


})




function fnPublicar(){

 publicar= Date.now();

 publicar= publicar.toString();


 var contenidotema = $$('#contenidotema').text();
 var titulotema = $$('#titulotema').val();
        var data = {
      
      contenidotema: contenidotema,
      titulotema : titulotema,


     }

refForo.doc(publicar).set(data);
$$('#postear').append(

'<div class="publicar list media-list">'+
'<ul>'+
'<li>'+
'<a href="/forotema/" class="item-link item-content page">'+
'<div class="item-media"><img src="https://www.pngitem.com/pimgs/m/78-786420_icono-usuario-joven-transparent-user-png-png-download.png" width="80" height="80" /></div>'+
'<div class="item-inner">'+
'<div class="item-title-row">'+
'<div class="item-title"><h3 id="titulogeneral"></h3></div>'+
'<div class="item-after"></div>'+
'</div>'+
'<div class="item-subtitle"></div>'+
'<div class="item-text"><div id="contenidogeneral"></div></div>'+
'</div>'+
'</a>'+
'</li>'+
'</ul>'+
'</div>');



}




function cargarforogeneral(e){


var refForo = db.collection("FORO").doc(publicar);
//(email es la variable donde tengo el mail del usuario logueado, que a la vez es el documento clave en la base de datos)//

refForo.get().then(function(doc) {
  if (doc.exists) {
      contenidotema = doc.data().contenidotema;
      titulotema = doc.data().titulotema;
$$("#titulogeneral").text(titulotema);

$$("#contenidogeneral").text(contenidotema);

      //(acá arriba le digo que si encuentra un documento con esa clave -o sea con ese email- me cargue cada dato en cada variable)//
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});


}









  function cargarinicioforo(){


 var refUsuarios = db.collection("USUARIOS").doc(email);
//(email es la variable donde tengo el mail del usuario logueado, que a la vez es el documento clave en la base de datos)//

refUsuarios.get().then(function(doc) {
  if (doc.exists) {
      nombre = doc.data().nombre;
      usuario = doc.data().usuario;
$$("#lblnombre").text('BIENVENIDO ' + usuario);   
 
      //(acá arriba le digo que si encuentra un documento con esa clave -o sea con ese email- me cargue cada dato en cada variable)//
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});


 var refDatos = db.collection("DATOS").doc(email);
//(email es la variable donde tengo el mail del usuario logueado, que a la vez es el documento clave en la base de datos)//

refDatos.get().then(function(doc) {
  if (doc.exists) {
      carrera = doc.data().carrera;
      institucion = doc.data().institucion;
      localidad = doc.data().localidad;
     provincia = doc.data().provincia;
   
$$("#lblcarrera").text(carrera);   
 
      //(acá arriba le digo que si encuentra un documento con esa clave -o sea con ese email- me cargue cada dato en cada variable)//
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});

  }




/** FUNCIONES PROPIAS **/


var swiper = new Swiper(".swiper-container",{
spaceBetween:0,
    pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },

}
);
 


function fnRegister() {

    var elMail = $$('#email').val(); // es un input... uso val!
    var laClave = $$('#clave').val(); // es un input... uso val!
    var elNombre = $$('#nombre').val();
    var elUsuario = $$('#id').val();
     email = elMail;
     usuario=elUsuario;
    var huboError = 0;

    firebase.auth().createUserWithEmailAndPassword(elMail, laClave)          
      .catch(function(error) {       
        // Handle Errors here.
        huboError = 0;
        var errorCode = error.code;
        var errorMessage = error.message; 
        
        fnMostrarError(errorCode);
        fnMostrarError(errorMessage);
      })
      .then(function(){
          if(huboError == 0){
            // alert('OK');
            // lo seteo en el panel.... contenedor lblEmail

     var data = {

      nombre: elNombre,
      usuario: elUsuario,
      clave: laClave,

     } 
     
     refUsuarios.doc(email).set(data);

mainView.router.navigate("/fororegister2/");
          }
      });


}



function fnMostrarError(txt) {
  if (mostrarErrores == 1) {
      console.log("ERROR: " + txt);
  }
}

 function fnGoogle(){
    if (!firebase.auth().currentUser){

      const provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope ('https://www.googleapis.com/auth/cloud-platform');

      firebase.auth().signInWithPopup(provider).then (function(result){

        var token = result.credential.accesstoken;
        var user = result.user;
        console.log(user);

      }).catch (function (error) {

        var errorCode = error.Code
        var errorMessage = error.message;
        var erroremail = error.email;
        var credential = error.credential;

        if (errorCode=== 'auth/account-exists-with-different-credential'){
          alert('Es el mismo usuario')
        }
      })

    }else {
      alert("ok");
      firebase.auth().signOut();
          mainView.router.navigate("/fororegister2/");

    }
  }
  


function fnFacebook(){
  
   if (!firebase.auth().currentUser){

      const provider = new firebase.auth.FacebookAuthProvider();

      provider.addScope ('public_profile');

      firebase.auth().signInWithPopup(provider).then (function(result){

        var token = result.credential.accesstoken;
        var user = result.user;
        console.log(user);
        
      }).catch (function (error) {

        var errorCode = error.Code
        var errorMessage = error.message;
        var erroremail = error.email;
        var credential = error.credential;

        if (errorCode=== 'auth/account-exists-with-different-credential'){
          alert('Es el mismo usuario')
        }
      })

    }else {
      firebase.auth().signOut();
    mainView.router.navigate("/fororegister2/");

    }
  }



function fnLogin() {

    email = $$('#email').val();
    var clave = $$('#clave').val();
       
//Se declara la variable huboError (bandera)
    var huboError = 0;

  
    firebase.auth().signInWithEmailAndPassword(email, clave)
        .catch(function(error){
//Si hubo algun error, ponemos un valor referenciable en la variable huboError
            huboError = 1;
            var errorCode = error.code;
            var errorMessage = error.message;
            fnMostrarError(errorMessage);
            fnMostrarError(errorCode);
        })
        .then(function(){   
//En caso de que esté correcto el inicio de sesión y no haya errores, se dirige a la siguiente página
            if(huboError == 0){

            mainView.router.navigate("/inicioforo/");

                      } else {
                          // doc.data() will be undefined in this case
                          //console.log("No such document!");
                      }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });   }



function fnNext(){
swiper.slideNext()


};
  
function fnContinuar(){
   var provincia = $$('#provincia').val();
 var localidad = $$('#localidad').val();
 var institucion = $$('#institucion').val();
 var carrera = $$('#carrera').val();
     var prueba="XDDDDD";
     var data = {
      
      provincia: provincia,
      localidad: localidad,
      institucion: institucion,
      carrera : carrera,


     } 

//refDatos.doc(email).set(data);

};




/*function fnPublicar() {
  var acumGlobal=0
console.log("entro a la funcion fnPublicar");
console.log("ACUMULADOR GLOBAL PAI"+ acumGlobal); 
  var db = firebase.firestore();
  db.collection("FORO").doc(publicar)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    //en mi caso genero el codigo HTML para visualizarlo en pantalla
   //  if(acumGlobal==0)
    
  if( acumGlobal<doc.data().publicar){
   alert('sasd');
    $$(".publicar").append(

 

          ) ;
          console.log("SALIO . APPEND"); 
             acumGlobal=doc.data().fechaCodigo;
               } };
              } 
          /* console.log("consulta "+ acumGlobal); */
       /* }
        else{
        $$(".contenidoTrabajos").html(
          "<ul>"+
           "<li>Trabajo : "+`${doc.data().nombreTrabajo}`+"</li>"+
           "<li>Kilometraje  : "+`${doc.data().kmActualTrabajo}`+"</li>"+
           "<li>Montod el Trabajo : "+`${doc.data().montoTrabajo}`+"</li>"+
           "<li>Fecha del trabajo : "+`${doc.data().fechaActual}`+"</li>"+
           "<li>Lugar  : "+`${doc.data().lugarTrabajo}`+"</li>"+
           "<li>Direccion : "+`${doc.data().direccionTrabajo}`+"</li>"+
          "</ul>");
          console.log("SALIO . HTML ESTIMO CONSULTA =1");
          console.log("consulta "+ acumGlobal);
       }       })
    })
   .catch(function(error) {
      console.log("Error de obtencion de documentos de Trabajos :() ", error); }) 
    
*/






/*
 function buscarEnBase () {
 var db = firebase.firestore()
 var  refdatos = db.collection("USUARIOS").doc(nombre)
//(email es la variable donde tengo el mail del usuario logueado, que a la vez es el documento clave en la base de datos)//

refDatos.get().then(function(doc) {
  if (doc.exists) {
      nombre = doc.data().nombre;
      usuario = doc.data().usuario;
     
      alert('asasd)');
      //(acá arriba le digo que si encuentra un documento con esa clave -o sea con ese email- me cargue cada dato en cada variable)//
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});

};

function buscarEnBase(){
  var db=firebase.firestore();
  refDatos = db.collection("USUARIO").doc(nombre).collection("Luciano Campos");
  datoRef.get()
  .then(function(querySnapshot){querySnapshot.forEach(function(doc){
    console.log("data:" + doc.data().nombre);
    elnombre = doc.data().nombre;
    console.log("el nombre es " + elnombre);
    $$('#lblnombre').text(elnombre);
  });


})
  .catch (function(error){
    console.log("Error: " + error)
  })
} */