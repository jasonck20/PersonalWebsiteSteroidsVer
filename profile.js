document.querySelectorAll('.project-list a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.fontWeight = 'bold';
    });
    link.addEventListener('mouseleave', function() {
        this.style.fontWeight = 'normal';
    });
});

document.getElementById('dark-mode-toggle').addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
});

function openDialog(projectId) {
    document.getElementById('dialog').style.display = 'flex';
}

function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}