console.log('Hello World!');

const name = "Sean Widner";
let hasDownloadedResume = false;

function daysUntilDeadline(deadline) {
    var today = new Date();
    const dueDate = new Date(deadline);
    var difference = dueDate - today;
    var days = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return days;
}

function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}

document.getElementById("resumeBtn").addEventListener("click", function() {
    if(hasDownloadedResume == false) {
        alert("Your resume is downloaded successfully!");
        hasDownloadedResume = true;
    }
});



window.addEventListener("load", function() {
    const message = showGreeting(name);
    document.getElementById("greeting").textContent = message;

    var remainingDays = daysUntilDeadline("April 1, 2026")
    document.getElementById("daysLeft").textContent = remainingDays + " days";
});

