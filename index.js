document.addEventListener('DOMContentLoaded', (event) => {

    
    // Terminal window toggle
    const terminalElement = document.querySelector('.terminal');
    const terminalWindow = document.querySelector('.terminalwindow');
    

    terminalElement.addEventListener('click', function() {
        terminalWindow.classList.toggle('visible');
        if (terminalWindow.classList.contains('visible')) {
            const terminalInput = document.querySelector('.terminaldabba2');
            if (terminalInput) {
                terminalInput.focus();
            }
        }
    });

    const photoelement = document.querySelector('.myphoto');
    const aboutmewin = document.querySelector('.aboutmeanimationwindow');

    photoelement.addEventListener('click', function() {
        aboutmewin.classList.toggle('visible');
    });

    // Projects folder window toggle
    const projectsElement = document.querySelector('.projecticon');
    const projectsWindow = document.querySelector('.projectsfolderwindow');
    let zIndex = 1;
    projectsElement.addEventListener('click', function() {
        projectsWindow.classList.toggle('visible');
    });

    const resumeFile = document.querySelector('.cvicon');
    const resumeWindow = document.querySelector('.resumewindow');

    resumeFile.addEventListener('click', function() {
        resumeWindow.classList.toggle('show');
    });

    const resclosebutton = document.querySelector('.resclosebutton');
    const terminalclose= document.querySelector('.terminalclosebutton')
    const ankithclose = document.querySelector('.ankithclosebutton')

    resclosebutton.addEventListener('click', function() {
        resumeWindow.classList.toggle('show');
    });

    terminalclose.addEventListener('click', function() {
        terminalWindow.classList.toggle('visible');
    });
    const projectclose = document.querySelector('.projectclosebutton');
    projectclose.addEventListener('click', function() {
        projectsWindow.classList.toggle('visible');
    });
     
    ankithclose.addEventListener('click', function() {
        aboutmewin.classList.toggle('visible');
    });



    // Add event listeners to each project
    const projects = document.querySelectorAll('.projectsfolderwindow .project');

    projects.forEach(project => {
        project.addEventListener('click', function() {
            const repoUrl = this.getAttribute('data-repo-url');
            if (repoUrl) {
                window.open(repoUrl, '_blank');
            }
        });
    });

    terminalWindow.addEventListener('click', function() {
        this.style.zIndex = ++zIndex;
    });

    projectsWindow.addEventListener('click', function() {
        this.style.zIndex = ++zIndex;
    });

    resumeWindow.addEventListener('click',function(){
        this.style.zIndex=  ++zIndex;
    });

    aboutmewin.addEventListener('click',function(){
        this.style.zIndex=  ++zIndex;
    });

    

    // Dragging functionality for terminal window
    makeDraggable(terminalWindow);

    // Dragging functionality for projects folder window
    makeDraggable(projectsWindow);

    makeDraggable(resumeWindow);

    makeDraggable(aboutmewin);
    

});

let zIndex = 1;

function makeDraggable(element) {
    let isDragging = false;
    let dragStartX, dragStartY;

    const onMouseDown = (e) => {
        isDragging = true;
        dragStartX = e.clientX - element.offsetLeft;
        dragStartY = e.clientY - element.offsetTop;

        element.style.zIndex = ++zIndex;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        element.style.left = `${e.clientX - dragStartX}px`;
        element.style.top = `${e.clientY - dragStartY}px`;
    };

    const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    element.addEventListener('mousedown', onMouseDown);
}

document.addEventListener('mousemove', function(event) {
    const ankith = document.querySelector('.ankith'); 
    const eyes = document.querySelectorAll('.eye-r, .eye-l');

    eyes.forEach(eye => {
        const { left, top, width, height } = eye.getBoundingClientRect();
        const eyeCenterX = left + width / 2;
        const eyeCenterY = top + height / 2;
        const deltaX = event.clientX - eyeCenterX;
        const deltaY = event.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const maxDistance = Math.min(width, height) / 10; 
        const distance = Math.min(maxDistance, Math.hypot(deltaX, deltaY));
        
        const moveX = distance * Math.cos(angle) + 'px';
        const moveY = distance * Math.sin(angle) + 'px';

        ankith.style.setProperty('--eye-move-x', moveX);
        ankith.style.setProperty('--eye-move-y', moveY);
    });
});


document.addEventListener('DOMContentLoaded', function() {

    let currentDirectory = 'home'; 
    const terminalWindow = document.querySelector('.terminalwindow');
   

    function createInputLine() {
        const terminalInputContainer = document.createElement('div');
        terminalInputContainer.className = 'terminalinfocontainer';

        terminalInputContainer.innerHTML = `
            <div class="terminalinside">Ankith's@website~/home${currentDirectory !== 'home' ? '/' + currentDirectory : ''} : ~ </div>
            <div class="dollarinside">$</div>
            <input class="terminaldabba2" type="text">
        `;

        terminalWindow.appendChild(terminalInputContainer);

        const inputField = terminalInputContainer.querySelector('.terminaldabba2');
        if (inputField) {
            inputField.focus();
        }

        inputField.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const command = inputField.value.trim();
                inputField.disabled = true;

                executeCommand(command, terminalWindow, terminalInputContainer);
            }
        });
    }

    function executeCommand(command, terminalWindow, inputContainer) {
        const output = document.createElement('div');
        output.className = 'terminaloutput';

        switch (command.toLowerCase()) {
            case 'ls':
                if (currentDirectory === 'home') {
                    output.innerHTML = 'resume projects';
                } else if (currentDirectory === 'projects') {
                    output.innerHTML = 'cashehe cloudnativeapp pebblesmartwatchapp rentaway ';
                }
                break;
            case 'cd resume':
                output.innerHTML = 'resume is not a directory.';
                break;
            case 'cd ..':
                currentDirectory = 'home'; 
            
                break;
            case 'nano resume':
                const resumeWindow = document.querySelector('.resumewindow');
                resumeWindow.classList.add('show');
                break;
            case 'cd projects':
                currentDirectory = 'projects';
                break;
            case 'nano cashehe':
                window.open('https://cashehe.ankithreddy.me', '_blank');
                break;
            case 'nano cloudnativeapp':
                window.open('https://github.com/CloudNativeWebApplication', '_blank');
                break;
            case 'nano pebblesmartwatchapp':
                window.open('https://github.com/Scribesync', '_blank');
                break;
            case 'nano rentaway':
                window.open('https://github.com/neu-mis-info-6150-spring-2023/final-project-group-rentaway', '_blank');
                break;
            case 'help':
                output.innerHTML = 'Available commands:<br>ls: List directories/files<br>cd [directory]: Change directory<br>nano [file]: Open file or project source website<br>cd ..: Go back to the home directory';
                break;
            default:
                output.innerHTML = `Unknown command: ${command}`;
                break;
        }

        terminalWindow.appendChild(output);
        createInputLine(); 

        terminalWindow.scrollTop = terminalWindow.scrollHeight;
    }
     function showInitialHelp() {
        const helpOutput = document.createElement('div');
        helpOutput.className = 'terminaloutput';
        helpOutput.innerHTML = '<div class="terminalinfocontainer">' +
                               '<div class="terminalinside">>> Ankith\'s@website~/home : ~ </div>' +
                               '<div class="dollarinside">$</div>' +
                               '<div class="commandline">help</div>' +
                               '</div>' +
                               'Available commands:ls: List directories/files<br>' +
                               'cd [directory]: Change directory<br>' +
                               'nano [file]: Open file or project source website<br>' +
                               'cd ..: Go back to the home directory';
        terminalWindow.appendChild(helpOutput);
    }

    showInitialHelp();
    createInputLine();


});



document.addEventListener('DOMContentLoaded', function() {
    const aboutMeWindow = document.querySelector('.aboutmeanimationwindow');
    aboutMeWindow.classList.add('visible');
});


document.addEventListener('DOMContentLoaded', () => {
    const greetings = [
        'Hello', 
        'नमस्ते', 
        '안녕하세요', 
        '你好', 
        'Hola', // Spanish
        'Bonjour', // French
        'Hallo', // German
        'Ciao', // Italian
        'Привет', // Russian
         'வணக்கம்'
    ];

    const greetingElement = document.querySelector('.greeting');
    let currentGreeting = 0;

    function changeGreeting() {
        greetingElement.textContent = greetings[currentGreeting];
        currentGreeting = (currentGreeting + 1) % greetings.length;
    }

    setInterval(changeGreeting, 2000);

    changeGreeting();
});

