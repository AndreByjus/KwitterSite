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
roomName = localStorage.getItem("roomName");

function logout() {
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
          window.location = "index.html";
      }

function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            name: userName,
            message:msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() { 
      firebase.database().ref("/"+roomName).on('value', function(snapshot){ 
      document.getElementById("output").innerHTML = ""; 
      snapshot.forEach(function(childSnapshot) 
       { childKey  = childSnapshot.key; 
            childData = childSnapshot.val();
             if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
         console.log(firebaseMessageId);
         console.log(messageData);
         userName = messageData['name'];
         message = messageData['message'];
         like = messageData['like'];
         nameWithTag = "<h4>" + userName + "<img class='user_tick' src='tick.png'> </h4>";
         messageWithTag = "<h4 class='message'>" + message + "</h4>";
         like_button = "<button class='btn btn-warning' id="+ firebaseMessageId +" value = "+ like +" onclick = 'updateLike(this.id)'>";
         spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'> like " + like + "</span></button> <hr>";
         row = nameWithTag + messageWithTag + like_button + spanWithTag;
         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function updateLike(messageId)
{
      console.log("Botão de Like pressionado - " + messageId);
      buttonId = messageId;
      likes = document.getElementById(buttonId).value;
      updateLikes = Number(likes) + 1;
      console.log(updateLikes);

      firebase.database().ref(roomName).child(messageId).update({
            like : updateLikes
      });
}
