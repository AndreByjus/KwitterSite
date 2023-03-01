
const firebaseConfig = {
  apiKey: "AIzaSyBKGWZG-QeTGZjUZyDveGDcMpxMx8V4Xqc",
  authDomain: "vamosconversar-ac2dd.firebaseapp.com",
  databaseURL: "https://vamosconversar-ac2dd-default-rtdb.firebaseio.com",
  projectId: "vamosconversar-ac2dd",
  storageBucket: "vamosconversar-ac2dd.appspot.com",
  messagingSenderId: "752518283507",
  appId: "1:752518283507:web:f9277eab49c85a50213786"
};

firebase.initializeApp(firebaseConfig);


userName = localStorage.getItem("userName");
document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";


function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "adicionar nome da sala"
  });

  localStorage.setItem("roomName", roomName);

  window.location = "kwitterPage.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
