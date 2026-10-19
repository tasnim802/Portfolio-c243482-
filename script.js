
const OWNER_PASSWORD = "123jesi";

const initialProjects = [
    {
        title: "Inventory Management System",
        description: "A project to manage products, sales and inventory.",
        link: "https://github.com/yourusername/project-one"
    },
    {
        title: "Student Management System",
        description: "A simple system to organize student information.",
        link: "https://github.com/yourusername/project-two"
    },
    {
        title: "Personal Portfolio Website",
        description: "My portfolio built with HTML, CSS, Bootstrap and JavaScript.",
        link: "https://github.com/yourusername/project-three"
    }
];

let projects;

try {
    const saved = localStorage.getItem("myProjects");
    projects = saved === null ? initialProjects : JSON.parse(saved);

    if (!Array.isArray(projects)) projects = initialProjects;
} catch {
    projects = initialProjects;
}

function displayProjects() {
    const list = document.getElementById("projectList");
    list.replaceChildren();

    projects.forEach(({ title, description, link }) => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        const card = document.createElement("div");
        card.className = "card p-3 h-100";

        const name = document.createElement("h5");
        name.textContent = title;
        name.style.color = "#49345F";

        const desc = document.createElement("p");
        desc.textContent = description;

        const btn = document.createElement("a");
        btn.href = link;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
        btn.className = "btn btn-outline-primary mt-auto";
        btn.textContent = "View Project";

        card.append(name, desc, btn);
        col.appendChild(card);
        list.appendChild(col);
    });
}

function login() {
    if (prompt("Enter owner password:") === OWNER_PASSWORD) {
        document.getElementById("ownerPanel").hidden = false;
        document.getElementById("ownerLoginBtn").hidden = true;
        alert("Owner mode enabled.");
    } else {
        alert("Incorrect password.");
    }
}


function logout() {
    document.getElementById("ownerPanel").hidden = true;
    document.getElementById("ownerLoginBtn").hidden = false;
}

// Add and save a project
document.getElementById("projectForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("pTitle").value.trim();
    const description = document.getElementById("pDescription").value.trim();
    const link = document.getElementById("pLink").value.trim();

    if (!/^https?:\/\//i.test(link)) {
        alert("Enter a valid HTTP or HTTPS URL.");
        return;
    }

    projects.push({ title, description, link });

    try {
        localStorage.setItem("myProjects", JSON.stringify(projects));
    } catch {
        projects.pop();
        alert("Could not save the project in this browser.");
        return;
    }

    displayProjects();
    this.reset();
    alert("Project added!");
});


document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! This is a demo form; your message was not emailed.");
    this.reset();
});

displayProjects();
