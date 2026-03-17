console.log('Hello World!');

const name = "Sean Widner";
let downloadCount = 0;

const projectTitles = [
    "Senior Thesis",
    "Coursework",
    "Web App Project"
];

const projectDescriptions = [
    "You Could Be on Holiday Now: On the Importance of Freedom for Happiness",
    "Completed CodeStepByStep problems in python and collaborated on coding projects with peers",
    "Developing a web app project"
];

const projectDeadlines = [
    "May 1, 2024",
    "August 1, 2025",
    "April 1, 2026"
];

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
    updateDownloadCount();
});



window.addEventListener("load", function() {
    const message = showGreeting(name);
    document.getElementById("greeting").textContent = message;

    // var remainingDays = daysUntilDeadline("April 1, 2026")
    // document.getElementById("daysLeft").textContent = remainingDays + " days";

    document.getElementById("addSkillBtn").addEventListener("click", addSkill);

    // Create the project cards
    var projectContainer = document.getElementById("projectContainer");

    for (let i = 0; i < projectTitles.length; i++) {
        var daysRemaining = daysUntilDeadline(projectDeadlines[i]);
        var status = "";

        if (daysRemaining > 0) {
            status = "Ongoing";
        }
        else if (daysRemaining < 0) {
            status = "Completed";
        }
        else if (daysRemaining === 0) {
            status = "Due Today";
        }

        var projectCard = document.createElement("div");
        projectCard.className = "col-12 col-md-6";



        projectCard.innerHTML = `
            <div class="card h-100">
                <img src="" alt="" class="">
                
                <div class="card-body">
                    <h5 class="card-title text-center">${projectTitles[i]}</h5>
                    <p class="card-text">${projectDescriptions[i]}</p> 
                    <p class="card-text">Deadline: <span id="deadline">${projectDeadlines[i]}</span></p>
                    <p class="card-text">Status: ${status}</p> 
                </div>
            </div>
        `;

        projectContainer.appendChild(projectCard);
    }

    // create the education table
    var educationContainer = document.getElementById("educationTable");
    var eduTable = document.createElement("table");
    eduTable.className = "table table-bordered text-center";

    // head
    eduTable.innerHTML = `
    <tr>
        <th>School</th>
        <th>Program</th>
        <th>Graduation</th>
    </tr>`;
    // row1
    var row1 = document.createElement("tr");
    row1.innerHTML = `
    <td>Arete Preparatory Academy</td>
    <td>High School</td>
    <td>May 2024</td>
    `;
    eduTable.appendChild(row1);
    //row2
    var row2 = document.createElement("tr");
    row2.innerHTML = `
    <td>Northern Arizona University</td>
    <td>B.S. Software Engineering</td>
    <td>May 2028</td>
    `;
    eduTable.appendChild(row2);

    educationContainer.appendChild(eduTable);

    // create experience table
    var experienceContainer = document.getElementById("experienceTable");

    var expTable = document.createElement("table");
    expTable.className = "table table-bordered text-center";

    expTable.innerHTML = `
    <tr>
        <th>Company</th>
        <th>Role</th>
        <th>Start</th>
        <th>End</th>
    </tr>
    `;

    var expRow = document.createElement("tr");
    expRow.innerHTML = `
    <td>Wingstop</td>
    <td>Team Member</td>
    <td>2024</td>
    <td>Present</td>
    `;

    expTable.appendChild(expRow);

    experienceContainer.appendChild(expTable);
});

function addSkill() {
    var skillInput = document.getElementById("skillInput");
    var skillList = document.getElementById("skillList");

    var skillText = skillInput.value;

    if (skillText !== "") {
        var newSkill = document.createElement("li");
        newSkill.textContent = skillText;
        newSkill.classList.add("list-group-item");

        skillList.appendChild(newSkill);

        skillInput.value = "";
    }
}

function updateDownloadCount() {
    downloadCount++;
    document.getElementById("downloadCount").textContent = downloadCount;
}