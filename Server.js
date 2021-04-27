var express = require("express");
var session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);


var app = express();

var estado = 0;
var buscar = "";
var id_rec_act = "";
var id_usu_secreta_xd_carganding__ = "";

var server = require("http").createServer(app);
var mysql = require("mysql");
var path = require('path');
var fs = require('fs');

var nombreapp = "";
var  apps ="";
var cat="";

var subCadena = "";
var name_buscar = "";
var regis = true;

var cambia_user = "",
  cambia_nom = "",
  cambia_app = "",
  cambia_apm = "",
  cambia_correo = "",
  cambia_contra = "",
  cambia_genero = "";

var nombre = "",
  apps = "",
  apm = "",
  usu = "",
  contra = "",
  email = "",
  genero = "",
  genero_admin = "",
  user = "",
  pass = "";


 var mens= "";


app.configure(function(){
  app.set('img', __dirname + '/public/img');
  app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + "/public/img" }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


var io = require("socket.io").listen(server);


var connection = mysql.createConnection({
  host: "localhost",
  user: "root2",
  password: "root2",
  database: "harmonydef",
  port: 3306
});

connection.connect(function(error) {
  if (error) {
    console.log("No se conectó con la Base", error);
  } else {
    console.log("Éxito");
  }
});


//consola
io.sockets.on("connection", function(socket) {


  socket.on("check pass", function(data) {
    pass = data.toString();
    console.log("password: ", pass);
  })
  socket.on("check user", function(data) {
    user = data.toString();
    console.log("user: ", user);
    confirmar();
  })



  socket.on("Elimina_usu", function(data) {
    name_buscar = data;
    Eliminar_usuario();
  })


  socket.on("Busca_usu", function(data) {
    name_buscar = data;
    buscar_usuario();
  })
});

//modificar y primer socket perfil
io.sockets.on("connection", function(socket) {

 socket.on("datos-plox", function() {
    regresadatos();
 })


  socket.on("cambia_user", function(data) {
    cambia_user = data;
    })
  socket.on("cambia_nom", function(data) {
    cambia_nom = data;
  })
  socket.on("cambia_app", function(data) {
    cambia_app = data;
  })
  socket.on("cambia_apm", function(data) {
    cambia_apm = data;
  })
  socket.on("cambia_correo", function(data) {
    cambia_correo = data;
  })
  socket.on("cambia_contra", function(data) {
    cambia_contra = data;
  })
  socket.on("cambia_genero", function(data) {
    cambia_genero = data;
    modificardatos();
    })
 
});
//registro usuario
io.sockets.on("connection", function(socket) {

  socket.on("send name", function(data) {
    nombre = data;
  })
  socket.on("send app", function(data) {
    apps = data;
  })
  socket.on("send apm", function(data) {
    apm = data;
  })
  socket.on("send usuario", function(data) {
    usu = data;
  })
  socket.on("send contra", function(data) {
    contra = data;
  })
  socket.on("send email", function(data) {
    email = data;
  })
  socket.on("send genero", function(data) {
    genero = data;
    matapenas();
  })
});
//registro admin
io.sockets.on("connection", function(socket) {

  socket.on("name_admin", function(data) {
    nombre = data;
    console.log("Name", nombre);
  })
  socket.on("apellidop_admin", function(data) {
    apps = data;
    console.log("App");
  })
  socket.on("apellidom_admin", function(data) {
    apm = data;
    console.log("Apm");
  })
  socket.on("name_usu_admin", function(data) {
    user = data;
    console.log("Usu");
  })
  socket.on("correo_admin", function(data) {
    email = data;
    console.log("Cor");
  })
   socket.on("pass_admin", function(data) {
    contra = data;
    console.log("pass");
   })
   socket.on("genero_admin", function(data) {
    genero = data;
    console.log("Gen", genero); 
    registrar_administrador();
  })


});

//registro app
io.sockets.on("connection", function(socket) {
  
  socket.on("nombreapp", function(data) {
    nombreapp = data;
   console.log("nombreapp" , nombreapp);

  })
  
  socket.on("ofrecido", function(data) {
   apps = data;
    console.log("apps", apps)
    
  }) 
  socket.on("cat", function(data) {
    cat = data;
   console.log("categoria" , cat);
    subirimg() ;
  })
});
//apps
io.sockets.on("connection", function(socket) {

  socket.on("buscar_app", function(data) {
    nom_app = data;
    regresarimg();
 })

    socket.on("mostrar",function(){
      regresarjuegos();
   
    })
     socket.on("mostrar2",function(){
    
      regresardeporte();
    

    })
      socket.on("mostrar3",function(){
     
      regresarsociales();
    ;

    })
       socket.on("mostrar4",function(){

      regresarterror();

    })

 

});

function regresadatos() {

  var sql = "Select * from usuario Where id_usu=" + mysql.escape(id_usu_secreta_xd_carganding__) + ";";
  var query = connection.query(sql, function(error, result) {
    for (var i = 0; i < result.length; i++) {
      var tipo = result[i].id_tiu;
      var nombre_sol = result[i].nom_usu;
      var nomrea_sol = result[i].rea_usu;
      var cor_sol = result[i].cor_usu;
      var gen_sol = result[i].gen_usu;
      var pas_sol = result[i].pas_usu;
      var app_sol = result[i].app_usu;
      var apm_sol = result[i].apm_usu;
      io.sockets.emit("nom_usu", nombre_sol);
      io.sockets.emit("rea_usu", nomrea_sol);
      io.sockets.emit("cor_usu", cor_sol);
      io.sockets.emit("gen_usu", gen_sol);
      io.sockets.emit("pas_usu", pas_sol);
      io.sockets.emit("app_usu", app_sol);
      io.sockets.emit("apm_usu", apm_sol);
      io.sockets.emit("tipo", tipo);
    }
  });
}

function modificardatos() {
  console.log("si entro a modificar");
    var sql = "UPDATE usuario SET nom_usu=" + mysql.escape(cambia_user) + ", rea_usu=" + mysql.escape(cambia_nom) + ",cor_usu=" + mysql.escape(cambia_correo) + ",gen_usu=" + mysql.escape(cambia_genero) + ",pas_usu=" + mysql.escape(cambia_contra) + ",app_usu=" + mysql.escape(cambia_app) + ",apm_usu=" + mysql.escape(cambia_apm) + " where nom_usu=" + mysql.escape(name_buscar) + " ;";
  var query = connection.query(sql, function(error, result) {
    if (error) {
      console.log("No se modifico", error);
    } else {
      console.log("modificado");
         }
  });
}

function Eliminar_usuario() {
  var sql = "Delete from usuario where nom_usu=" + mysql.escape(name_buscar) + ";";
  var query = connection.query(sql, function(error, result) {
    console.log(error);
  });
}

function buscar_usuario() {
  var sql = "Select * from usuario where nom_usu=" + mysql.escape(name_buscar) + ";";
  var query = connection.query(sql, function(error, result) {
    if (result == null || result == "") {
      console.log("No sirvio");
      io.sockets.emit("No sirvio", result);
    } else {
      for (var i = 0; i < result.length; i++) {
        var nombrecito_real = result[i].nom_usu;
        var nombrecito = result[i].rea_usu;
        var correo_usuario = result[i].cor_usu;
        var genero_usu = result[i].gen_usu;
        var password_usu = result[i].pas_usu;
        var apellido_paterno = result[i].app_usu;
        var apellido_materno = result[i].apm_usu;
      }
      io.sockets.emit("usuario_nom", nombrecito_real);
      io.sockets.emit("nombre_usu", nombrecito);
      io.sockets.emit("Correo_usu", correo_usuario);
      io.sockets.emit("genero_usu", genero_usu);
      io.sockets.emit("password_usu", password_usu);
      io.sockets.emit("apellido_paterno", apellido_paterno);
      io.sockets.emit("apellido_materno", apellido_materno);
    }
  });
}


function registrar_administrador() {
  console.log ("si hay genero y es ",genero);
  var sql = "Insert into usuario (id_tiu,nom_usu,rea_usu,app_usu,apm_usu,cor_usu,gen_usu,pas_usu) VALUES ('1'," + mysql.escape(user) + "," + mysql.escape(nombre) + "," + mysql.escape(apps) + "," + mysql.escape(apm) + "," + mysql.escape(email) + "," + mysql.escape(genero) + "," + mysql.escape(contra) + ");";
  var query = connection.query(sql, function(error, result) {
      if (error) {
      console.log("No se registró", error);
      io.sockets.emit("Ya_existe", error);
    } else {
      console.log("Nuevo usuario registrado");
      io.sockets.emit("listo", regis);
    }
  });
}

function matapenas() {
  if (nombre == "" || apps == "" || apm == "" || usu == "" || contra == "" || email == "") {} else {
    inserta();
  }
}


function confirmar() {
  var sql = "Select id_usu,id_tiu from usuario where nom_usu=" + mysql.escape(user) + "and pas_usu=" + mysql.escape(pass) + " COLLATE utf8_bin;";
  var query = connection.query(sql, function(error, result) {
    if (result == null || result == "") {
      console.log("No está registrado");
      estado = 0;
    } else {
      console.log("Está registrado");
      for (var i = 0; i < result.length; i++) {
        estado = result[i].id_tiu;
        id_usu_secreta_xd_carganding__ = result[i].id_usu;
      }
    }
    io.sockets.emit("verficado", estado);
  });
}


function inserta() {
  var sql = "Insert into usuario (id_tiu,nom_usu,rea_usu,app_usu,apm_usu,cor_usu,gen_usu,pas_usu) VALUES ('2'," + mysql.escape(usu) + "," + mysql.escape(nombre) + "," + mysql.escape(apps) + "," + mysql.escape(apm) + "," + mysql.escape(email) + "," + mysql.escape(genero) + "," + mysql.escape(contra) + ");";
  var query = connection.query(sql, function(error, result) {
    if (error) {
      console.log("No se registró", error);
      io.sockets.emit("Ya_existe", error);
    } else {
      console.log("Nuevo usuario registrado");
      io.sockets.emit("listo", regis);
    }
  });
}

function subirimg() {
  console.log("la imagen es",subCadena); 

  if(subCadena != ""){
  var sql = "Insert into app (nomapp,provedor,img,categoria) VALUES ("+mysql.escape(nombreapp) +","+mysql.escape(apps) +","+mysql.escape(subCadena)+","+mysql.escape(cat)+");";
  var query = connection.query(sql, function(error, result) {
    if (error) {
      console.log("No se registró", error);
    } else {
      console.log("Nueva imagen registrada");
    }
  });
  }else{
    console.log("la imagen esta vacia");
  }

}

function regresarimg(){
  var sql = 'Select img from app where nomapp='+mysql.escape(nom_app)+";";
  var query = connection.query(sql, function(error, result) {
     if (result == null || result == "") {
      console.log(result);
    } else {
     for (var i = 0; i < result.length; i++) {
      var reimg = result[i].img;
 
      io.sockets.emit("reimg", reimg);
      console.log(reimg);
      
    }
  }
  });
}


function regresarjuegos(){
  var sql = 'Select img from app where categoria = "juegos";'
  var query = connection.query(sql, function(error, result) {
     if (result == null || result == "") {
      console.log(result);
    } else {
     for (var i = 0; i < result.length; i++) {
      var reimg = result[i].img;
 
      io.sockets.emit("regresarjuegos", reimg);
      
      
    }
  }
  });
}


function regresardeporte(){
   var sql = 'Select img from app where categoria = "deporte";'
  var query = connection.query(sql, function(error, result) {
     if (result == null || result == "") {
      console.log(result);
    } else {
     for (var i = 0; i < result.length; i++) {
      var reimg = result[i].img;
 
      io.sockets.emit("regresardeporte", reimg);
   
      
    }
  }
  });
}


function regresarsociales(){
 var sql = 'Select img from app where categoria = "sociales";'
  var query = connection.query(sql, function(error, result) {
     if (result == null || result == "") {
      console.log(result);
    } else {
     for (var i = 0; i < result.length; i++) {
      var reimg = result[i].img;
 
      io.sockets.emit("regresarsociales", reimg);

      
    }
  }
  });
}


function regresarterror(){
var sql = 'Select img from app where categoria = "terror";'
  var query = connection.query(sql, function(error, result) {
     if (result == null || result == "") {
      console.log(result);
    } else {
     for (var i = 0; i < result.length; i++) {
      var reimg = result[i].img;
 
      io.sockets.emit("regresarterror", reimg);
    
      
    }
  }
  });
}




app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html')
});




app.post("/upload", function(req, res){

  var file = req.files.image,
      name = file.name,
      inicio = 56,
      path = file.path ;
      subCadena = path.substring(inicio);
      console.log("subCadena",subCadena);
 //res.end("<a href='/img/"+ subCadena + "'>Ver imagen</a>");
 //res.end("<a href=/index-admin.html> Ver imagen</a>");
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write('<!doctype html><html><head> </head> <script language="javascript">setTimeout(function(){location.href="indexadmin.html"},0000)</script><body>' +
      '</body></html>');
    res.end();

});

server.listen(process.env.PORT || 3000);
console.log("Esta Vivo :u");
