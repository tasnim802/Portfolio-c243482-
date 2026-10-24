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

let projects = initialProjects;

try {
    const saved = JSON.parse(localStorage.getItem("myProjects"));
    if (Array.isArray(saved)) projects = saved;
} catch {
    projects = initialProjects;
}

// Display projects
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

// Owner login
function login() {
    if (prompt("Enter owner password:") === OWNER_PASSWORD) {
        document.getElementById("ownerPanel").hidden = false;
        document.getElementById("ownerLoginBtn").hidden = true;
    } else {
        alert("Incorrect password.");
    }
}

// Owner logout
function logout() {
    document.getElementById("ownerPanel").hidden = true;
    document.getElementById("ownerLoginBtn").hidden = false;
}

// Add a new project
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
    localStorage.setItem("myProjects", JSON.stringify(projects));

    displayProjects();
    this.reset();
    alert("Project added!");
});

// Contact form demo
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you! This is a demo form; your message was not emailed.");
    this.reset();
});

// Show projects when the page loads
displayProjects();