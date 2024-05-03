const chatToggler = document.querySelector(".chatbot-toggler");
const chatCloseBtn = document.querySelector(".custom-chatbot-close-btn");
const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chatbox");
const chatBotArea = document.querySelector(".chatbot-body-container");

const inputIniHeight = chatInput.scrollHeight;
const DEFAULT_TYPE = 'assistance';
let userMessage = null;
let firstIntent = true;
let scrollHeightBefore = chatBox.scrollHeight;

let intents = {};

fetch('https://croissantiuu.github.io/proyecto-dulccini/app/Data/bot-querys.json')
    .then(response => response.json())
    .then(data => {
        intents = data;
        // console.log(intents['Hola']);
        main(); // Llamar a la función principal cambiar a init
    })
    .catch(error => console.error('Error:', error));

function main() {
    const createChatLi = (message, className) => {
        //Crea un elemento li con base a un mensaje y una clase
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="solar--chef-hat-heart-outline"></span><p></p>`;
        chatLi.innerHTML = chatContent;
        //Validar que el texto ingresado se tome como solo texto
        chatLi.querySelector("p").textContent = message;
        return chatLi;
    }
    
    const handleOptionClick = (option) => {
        // Establece el texto de la opción en el input del usuario
        chatInput.value = option;
        // Llama a la función para manejar el chat después de seleccionar la opción
        handleChat();
    }
    
    const CreateChatOptCard = (intent) => {
        const cardContainerBox = document.createElement("div");
        cardContainerBox.classList.add("options-card-box");
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("options-card");
    
        if (intent.options && intent.options.length > 0) {
            const cardContainerHeader = document.createElement("div");
            cardContainerHeader.classList.add("options-card-header");
            cardContainerHeader.textContent = intent.title; 
            cardContainerBox.appendChild(cardContainerHeader);
            intent.options.forEach((option) => {
                const optionButton = document.createElement("a");
                optionButton.textContent = option;
                optionButton.addEventListener("click", () => handleOptionClick(option));
                cardContainer.appendChild(optionButton);
            });
        }
    
        cardContainerBox.appendChild(cardContainer);
        chatBox.appendChild(cardContainerBox);
        chatBox.scrollTo(0, chatBox.scrollHeight);
    }
    
    
    const generateResponse = (incomingChatLi) => {
        const messageElement = incomingChatLi.querySelector("p");
        messageElement.textContent = userMessage;
        if(DEFAULT_TYPE === "assistance"){
            // Obtiene el intent de la pregunta del usuario
            let intent = firstIntent ? intents['Hola'] : 
                        (messageElement.textContent === 'Revisar nuevamente las solicitudes' ? intents['Necesito ayuda'] : intents[messageElement.textContent]);
            if(messageElement.textContent == "Hacer pedido" || messageElement.textContent == "Solicitar contacto con un asesor") {
                 window.location = 'https://wa.link/t887dr';
            }
            firstIntent = false;
            if (!intent) {
                console.error(`No se encontró un intent para '${messageElement.textContent}'`);
                intent = intents['Default'];
                // return;
            }
            try {
                messageElement.innerHTML = intent.prompt;
                if(intent.options) {
                    CreateChatOptCard(intent);
                }
            } catch (err){
                messageElement.classList.add("error");
                messageElement.textContent = "Algo salió mal...";
            } finally {
                chatBox.scrollTo(0, chatBox.scrollHeight);
        
            }
    
    
        }
    }
    
    const handleChat = () => {
        userMessage = chatInput.value.trim();
        if(!userMessage) return; //No hay mensaje en el input
        chatInput.value = "";
        chatInput.style.height = `${inputIniHeight}px`;
        //Agrega el mensaje del usuario a la conversación
        chatBox.appendChild(createChatLi(userMessage, "outgoing"));
        chatBox.scrollTo(0, chatBox.scrollHeight);
        //Se muestra un mensaje predeterminado para procesar la respuesta que se le dará al usuario
        setTimeout(() => {
            const incomingChatLi = createChatLi("Un momento...", "incoming"); 
            chatBox.appendChild(incomingChatLi);
            chatBox.scrollTo(0, chatBox.scrollHeight);
    
            generateResponse(incomingChatLi);
        }, 600);
        // console.log(document.querySelector('.chatbox').scrollHeight);
    }
    
    
    chatInput.addEventListener("input", () => {
        //Método para ajustar el tamaño del input
        chatInput.style.height = `${inputIniHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });
    
    chatInput.addEventListener("keydown", (e) => {
        //Si se presiona enter, comienza la interacción
        if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });
    
    chatToggler.addEventListener("click", () => {
        if(firstIntent){
            handleChat();
        }
        chatBotArea.classList.toggle("show-chatbot");
    });
    chatCloseBtn.addEventListener("click", () => chatBotArea.classList.remove("show-chatbot"));
    sendChatBtn.addEventListener("click", handleChat);}
