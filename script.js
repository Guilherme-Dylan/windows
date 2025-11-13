const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResultDiv = document.getElementById('weather-result');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const apiUrl = `https://wttr.in/${city}?format=j1`;
    weatherResultDiv.innerHTML = `<p>Buscando dados...</p>`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Cidade não encontrada ou erro na API.');
        }
        const data = await response.json();
        displayWeather(data); // Chama a próxima função em caso de sucesso
    } catch (error) {
        weatherResultDiv.innerHTML = `<p class="weather-error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const currentCondition = data.current_condition[0];
    const temperatura = currentCondition.temp_C;
    const descricao = currentCondition.weatherDesc[0].value;
    const cidade = data.nearest_area[0].areaName[0].value;
    
    weatherResultDiv.innerHTML = `
        <h4 id="#teste">Tempo atual em ${cidade}</h4>
        <p class="temperatura">${temperatura}°C</p>
    `;
}


const textoCitacaoEl = document.getElementById('textoCitacao');
const autorCitacaoEl = document.getElementById('autorCitacao');
const btnNovaCitacao = document.getElementById('btnNovaCitacao');

const citacoes = [
    {
        texto: "A única maneira de fazer um ótimo trabalho é amar o que você faz.",
        autor: "Steve Jobs"
    },
    {
        texto: "A persistência é o caminho do êxito.",
        autor: "Charles Chaplin"
    },
    // ... mais citações
];

function gerarNovaCitacao() {
    // Gera um número aleatório entre 0 e o tamanho do array - 1
    const indiceAleatorio = Math.floor(Math.random() * citacoes.length);
    
    // Seleciona uma citação aleatória do array
    const citacaoSorteada = citacoes[indiceAleatorio];

    // Atualiza o HTML com o texto e o autor
    textoCitacaoEl.textContent = `"${citacaoSorteada.texto}"`;
    autorCitacaoEl.textContent = `— ${citacaoSorteada.autor}`;
}

btnNovaCitacao.addEventListener('click', gerarNovaCitacao);

// Gera a primeira citação ao carregar a página
gerarNovaCitacao();

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Carrega as tarefas do localStorage ou inicializa um array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para SALVAR as tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    todoList.innerHTML = ''; // Limpa a lista atual

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" data-id="${task.id}">Remover</button>
        `;
        li.dataset.id = task.id;
        todoList.appendChild(li);
    });
}

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = todoInput.value.trim();

    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        todoInput.value = '';
    }
});

todoList.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('delete-btn')) {
        const taskId = parseInt(target.dataset.id);
        tasks = tasks.filter(task => task.id !== taskId);
    } else if (target.closest('li')) {
        const taskId = parseInt(target.closest('li').dataset.id);
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
    }
    
    saveTasks();
    renderTasks();
});