document.addEventListener('DOMContentLoaded', (event) => {
    // Terminal window toggle
    const terminalElement = document.querySelector('.terminal');
    const terminalWindow = document.querySelector('.terminalwindow');

    terminalElement.addEventListener('click', function() {
        terminalWindow.classList.toggle('visible');
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



    

    // Dragging functionality for terminal window
    makeDraggable(terminalWindow);

    // Dragging functionality for projects folder window
    makeDraggable(projectsWindow);

    makeDraggable(resumeWindow);


    

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

