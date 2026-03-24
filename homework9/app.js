console.log('Hello World!');

const name = "Sean Widner";
let downloadCount = 0;

let skills = ["Python", "Java", "C#", "Basic Command Line"];

const navItems = [
    { name: "Education", target: "#education" },
    { name: "Projects", target: "#projects" },
    { name: "Skills", target: "#skills" },
    { name: "Introduction", target: "#intro" }
];

const projects = [
    {
        title: "Senior Thesis",
        description: "You Could Be on Holiday Now: On the Importance of Freedom for Happiness",
        deadline: new Date("May 1, 2024"),
        imageURL: "https://upload.wikimedia.org/wikipedia/commons/5/56/The_Thinker%2C_Rodin.jpg"
    },
    {
        title: "Coursework",
        description: "Completed CodeStepByStep problems in Python and collaborated on coding projects with peers",
        deadline: new Date("August 1, 2025"),
        imageURL: "./Turtlepy.png"
    },
    {
        title: "Web App Project",
        description: "Developing a web app project",
        deadline: new Date("April 1, 2026"),
        imageURL: "./web.jpg"
    }
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


// Load Page
window.addEventListener("load", function() {
    const message = showGreeting(name);
    document.getElementById("greeting").textContent = message;

    // var remainingDays = daysUntilDeadline("April 1, 2026")
    // document.getElementById("daysLeft").textContent = remainingDays + " days";
    
    renderSkills();
    renderNav();
    renderProjects(projects);

    sortProjectsByDeadline("asc");

    // add skill with jQuery
    $("#addSkillBtn").click(addSkill);

    // Edit skill
    $("#skillList").on("click", ".edit-btn", function() {
        const li = $(this).closest("li");
        const index = li.data("index");

        const newSkill = prompt("Edit skill:", skills[index]);

        if (newSkill && newSkill.trim() !== "") {
            skills[index] = newSkill.trim();
            renderSkills();
        }
    });
    // Delete Skill
    $("#skillList").on("click", ".delete-btn", function() {
        const li = $(this).closest("li");
        const index = li.data("index");

        li.slideUp(300, function() {
            skills.splice(index, 1);
            renderSkills();
        });
    });

    // Smooth Scrolling (Step 2)
    $("#navList").on("click", "a", function(e) {
        const target = $(this).attr("href"); 
        if (!target.startsWith("#")) return;
        e.preventDefault(); 
        const section = $(target);

        $("html, body").animate(
            {
                scrollTop: section.offset().top
            },
            600
        );
    });

    // Add keyboard functionality to the input form (Step 4)
    $("#skillInput").keydown(function(e) {
        const key = e.key;
        if (key === "Enter") {  
            e.preventDefault();
            addSkill(); 
        } 
        else if (key === "Escape") {
            e.preventDefault();  
            $("input").val("");
        }
    });

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
}); // End of Page Load

// Step 1
function addSkill() {
    const skillText = $("#skillInput").val().trim();

    validateSkill(skillText, function(isValid) {
        if (isValid) {
            skills.push(skillText);
            renderSkills();
            $("#skillInput").val("");
        } else {
            alert("Skill is empty or already exists.");
        }
    });
}

function updateDownloadCount() {
    downloadCount++;
    document.getElementById("downloadCount").textContent = downloadCount;
}

// Step 1
function renderSkills() {
    const skillList = $("#skillList");
    skillList.empty();

    // Create Edit and Delete buttons
    skills.forEach((skill, index) => {
        const li = $(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="skill-text">${skill}</span>
                <div>
                    <button class="btn btn-sm btn-warning edit-btn">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn">X</button>
                </div>
            </li>
        `);

        li.data("index", index);

        li.hide().fadeIn(); 
        skillList.append(li);
    });
}
// Step 1
function validateSkill(skill, callback) {
    const exists = skills.some(s => s.toLowerCase() === skill.toLowerCase());

    if (skill === "" || exists) {
        callback(false);
    } else {
        callback(true);
    }
}
// Step 2
function renderNav() {
    const navList = $("#navList"); 
    navList.find(".dynamic-item").remove();

    navItems.forEach(item => {
        const li = $(`
            <li class="nav-item dynamic-item">
                <a class="nav-link px-3" href="${item.target}">
                    ${item.name}
                </a>
            </li>
        `);

        navList.prepend(li);
    });
}
// Step 3
function renderProjects(projectArray) {
    const projectContainer = $("#projectContainer");
    projectContainer.empty(); 

    for (let i = 0; i < projectArray.length; i++) {
        const proj = projectArray[i];
        const daysRemaining = daysUntilDeadline(proj.deadline);
        let status = "";
        if (daysRemaining > 0) status = "Ongoing";
        else if (daysRemaining < 0) status = "Completed";
        else status = "Due Today";

        const card = $(`
            <div class="col-12 col-md-6">
                <div class="card h-100">
                    <img src="${proj.imageURL}" alt="${proj.title}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-center">${proj.title}</h5>
                        <p class="card-text">${proj.description}</p>
                        <p class="card-text">Deadline: <span class="deadline">${proj.deadline.toDateString()}</span></p>
                        <p class="card-text">Status: ${status}</p>
                    </div>
                </div>
            </div>
        `);

        projectContainer.append(card);
    }
}
// Step 3
function sortProjectsByDeadline(order = "asc") {
    projects.sort((a, b) => {
        if (order === "asc") {
            return a.deadline - b.deadline; 
        } else {
            return b.deadline - a.deadline; 
        }
    });

    renderProjects(projects); 
}