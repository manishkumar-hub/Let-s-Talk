const socket = io('http://localhost:8000')

// document.write("Hope it runs seccesfuly!");
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')
const music = new Audio('src/notification.mp3')
// add the message in the message container
const append = (message, position) => {
  const messageElemnt = document.createElement('div')
  messageElemnt.innerText = message
  messageElemnt.classList.add('message')
  messageElemnt.classList.add(position)
  messageContainer.append(messageElemnt)
  // if (position == 'left') {
  //   music.play()
  // }
}
// append the client message to the container and also emit the message 
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const message = messageInput.value
  append(`You:${message}`, 'right')
  socket.emit('send', message) 
  messageInput.value = ''
})

const name = prompt('Enter your name')
socket.emit('new-user-joined', name)


socket.on('new-user-joined', (name) => {
  append(`${name} joined`, 'left')
})



socket.on('user-joined', (name) => {
  append(`${name} joined`, 'left')
})

socket.on('receive', (data) => {
  append(`${data.name}:${data.message}`, 'left')
})

socket.on('left', (name) => {
  append(`${name} left`, 'left')
})
