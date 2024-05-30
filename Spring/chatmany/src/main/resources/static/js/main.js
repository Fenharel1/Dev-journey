//'use strict';

console.log('hola la rcdth')
let usernamePage = document.querySelector("#username-page");
let chatPage = document.querySelector("#chat-page");
let usernameForm = document.querySelector("#usernameForm")
let messageForm = document.querySelector("#messageForm")
let messageInput = document.querySelector("#message")
let messageArea = document.querySelector("#messageArea")
let connectingEl = document.querySelector(".connecting")

let stompClient = null;
let username = null;

let colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

const connect = (event) => {
  console.log("here")
  username = document.querySelector("#name").ariaValueMax.trim();
  if(username){
    usernamePage.classList.add('hidden')
    chatPage.classList.remove('hidden')

    let socket = new SocketJS('/ws')
    stompClient = Stomp.over(socket);
    stompClient.connect({},onConnect, onError);
  }
  event.preventDefault()
}

const onConnect = () => {
  // subscribe to the public Topic
  stompClient.subscribe('/topic/public',onMessageReceived);
  // tell username to the server
  stompClient.send('/app/chat.addUser',{},JSON.stringify({sender: username, type: 'JOIN'}))

  connectingEl.classList.add('hidden')
}

const onError = () => {
  connectingEl.textContent = 'Could not connect to web socket'
  connectingEl.style.color = 'red';
}

const onMessageReceived = () => {

}

const sendMessage = (event) => {
  event.preventDefault();
  let messageContent = messageInput.value.trim();
  if(messageContent && stompClient){
    let chatMessage = {
      sender: username,
      content: messageContent,
      type: 'CHAT'
    }
    stompClient.send('/app/chat/sendMessage', {} , JSON.stringify(chatMessage));
    messageInput.content = '';
  }
}

usernameForm.addEventListener('submit',connect, true)
messageForm.addEventListener('submit',sendMessage, true)