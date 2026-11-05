// OWNER PASSWORD
// Frontend demo only. Not secure authentication.
const OWNER_PASSWORD = "123jesi";

// DEFAULT PROJECTS
const defaultProjects = [
    {
        title: "Inventory Management System",
        description: "A project to manage products, sales and inventory.",
        technologies: "Python, Tkinter, SQLite",
        link: "https://github.com/tasnim802"
    },
    {
        title: "Student Management System",
        description: "A system to organize student information.",
        technologies: "Python, MySQL",
        link: "https://github.com/tasnim802"
    },
    {
        title: "Personal Portfolio Website",
        description: "My portfolio built with HTML, CSS, Bootstrap and JavaScript.",
        technologies: "HTML, CSS, Bootstrap, JavaScript",
        link: "https://github.com/tasnim802/Portfolio-c243482-"
    }
];

// LOAD DATA
function loadData(key, fallback) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : fallback;
    } catch {
        return fallback;
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

let projects = loadData("myProjects", defaultProjects);

let researchItems = loadData("myResearch", []);

let experiences = loadData("myExperience", [
    {
        role: "Entrepreneur",
        place: "Personal Business",
        period: "Ongoing",
        description: "Managing a small business and learning product presentation, customer communication and business operations."
    },
    {
        role: "Radio Program Host",
        place: "Bangladesh Betar — Sikkhangon",
        period: "",
        description: "Hosted an educational radio program and developed communication and presentation skills."
    }
]);

let certificates = loadData("myCertificates", []);

let isOwner = false;


// HELPER FUNCTIONS

function get(id) {
    return document.getElementById(id);
}

function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}

function validUrl(value, optional = false) {
    if (!value && optional) return true;

    try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
    } catch {
        return false;
    }
}

function createLink(url, label) {
    const link = createElement(
        "a",
        "btn btn-sm btn-outline-main",
        label
    );

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    return link;
}


// OWNER EDIT AND DELETE BUTTONS

function addOwnerButtons(card, index, editFunction, deleteFunction) {

    if (!isOwner) return;

    const actions = createElement("div", "project-actions");

    const edit = createElement(
        "button",
        "btn btn-sm btn-outline-secondary",
        "Edit"
    );

    const remove = createElement(
        "button",
        "btn btn-sm btn-outline-danger",
        "Delete"
    );

    edit.type = "button";
    remove.type = "button";

    edit.addEventListener("click", () => editFunction(index));

    remove.addEventListener("click", () => deleteFunction(index));

    actions.append(edit, remove);

    card.append(actions);
}


// DISPLAY PROJECTS

function displayProjects() {

    const list = get("projectList");

    list.replaceChildren();

    get("projectEmpty").hidden = projects.length > 0;

    projects.forEach((item, index) => {

        const col = createElement("div", "col-md-6 col-lg-4");

        const card = createElement("article", "card project-card");

        card.append(
            createElement("h3", "", item.title),
            createElement("p", "", item.description)
        );

        if (item.technologies) {
            card.append(
                createElement("div", "project-tech",
                    "Tools: " + item.technologies)
            );
        }

        if (validUrl(item.link)) {
            card.append(createLink(item.link, "View Project ↗"));
        }

        addOwnerButtons(card, index, editProject, deleteProject);

        col.append(card);
        list.append(col);
    });
}


// DISPLAY RESEARCH

function displayResearch() {

    const list = get("researchList");

    list.replaceChildren();

    get("researchEmpty").hidden = researchItems.length > 0;

    researchItems.forEach((item, index) => {

        const col = createElement("div", "col-md-6 col-lg-4");

        const card = createElement("article", "card research-card");

        card.append(
            createElement("span", "status-label", item.status),
            createElement("h3", "", item.title),
            createElement("p", "", "Research area: " + item.area),
            createElement("p", "", item.description)
        );

        if (item.link && validUrl(item.link)) {
            card.append(createLink(item.link, "View Research ↗"));
        }

        addOwnerButtons(card, index, editResearch, deleteResearch);

        col.append(card);
        list.append(col);
    });
}


// DISPLAY EXPERIENCE

function displayExperiences() {

    const list = get("experienceList");

    list.replaceChildren();

    get("experienceEmpty").hidden = experiences.length > 0;

    experiences.forEach((item, index) => {

        const col = createElement("div", "col-md-6");

        const card = createElement("article", "card experience-card");

        card.append(
            createElement("h3", "", item.role),
            createElement("p", "mb-1", item.place)
        );

        if (item.period) {
            card.append(
                createElement("span", "status-label", item.period)
            );
        }

        card.append(
            createElement("p", "", item.description)
        );

        addOwnerButtons(card, index, editExperience, deleteExperience);

        col.append(card);
        list.append(col);
    });
}


// DISPLAY CERTIFICATES

function displayCertificates() {

    const list = get("certificateList");

    list.replaceChildren();

    get("certificateEmpty").hidden = certificates.length > 0;

    certificates.forEach((item, index) => {

        const col = createElement("div", "col-md-6 col-lg-4");

        const card = createElement("article", "card certificate-card");

        card.append(
            createElement("h3", "", item.name),
            createElement("p", "", item.issuer)
        );

        if (item.date) {
            card.append(
                createElement("span", "status-label", item.date)
            );
        }

        if (item.link && validUrl(item.link)) {
            card.append(createLink(item.link, "View Credential ↗"));
        }

        addOwnerButtons(card, index, editCertificate, deleteCertificate);

        col.append(card);
        list.append(col);
    });
}


// REFRESH ALL SECTIONS

function refreshDisplays() {
    displayProjects();
    displayResearch();
    displayExperiences();
    displayCertificates();
}


// OWNER LOGIN

function login() {

    const entered = prompt("Enter owner password:");

    if (entered === OWNER_PASSWORD) {

        isOwner = true;

        get("ownerPanel").hidden = false;
        get("ownerLoginBtn").hidden = true;

        refreshDisplays();

        get("ownerPanel").scrollIntoView({
            behavior: "smooth"
        });

    } else if (entered !== null) {

        alert("Incorrect password.");
    }
}


// OWNER LOGOUT

function logout() {

    isOwner = false;

    get("ownerPanel").hidden = true;
    get("ownerLoginBtn").hidden = false;

    resetAllForms();

    refreshDisplays();
}

get("ownerLoginBtn").addEventListener("click", login);

get("logoutBtn").addEventListener("click", logout);


// FORM HELPER FUNCTIONS

function setFormMode(prefix, heading, index) {

    get(prefix + "EditIndex").value = index;

    get(prefix + "FormHeading").textContent = heading;

    get("cancel" + prefix[0].toUpperCase() +
        prefix.slice(1) + "Edit").hidden = false;
}

function resetForm(prefix, heading) {

    get(prefix + "Form").reset();

    get(prefix + "EditIndex").value = "-1";

    get(prefix + "FormHeading").textContent = heading;

    get("cancel" + prefix[0].toUpperCase() +
        prefix.slice(1) + "Edit").hidden = true;
}

function resetAllForms() {

    resetForm("project", "Add a Project");

    resetForm("research", "Add Research");

    resetForm("experience", "Add Experience");

    resetForm("certificate", "Add Certificate / Course");
}


// EDIT PROJECT

function editProject(i) {

    const x = projects[i];

    get("pTitle").value = x.title;
    get("pDescription").value = x.description;
    get("pTech").value = x.technologies || "";
    get("pLink").value = x.link;

    setFormMode("project", "Edit Project", i);

    get("ownerPanel").scrollIntoView({ behavior: "smooth" });
}


// DELETE PROJECT

function deleteProject(i) {

    if (confirm("Delete this project?")) {

        projects.splice(i, 1);

        saveData("myProjects", projects);

        displayProjects();
    }
}


// EDIT RESEARCH

function editResearch(i) {

    const x = researchItems[i];

    get("rTitle").value = x.title;
    get("rArea").value = x.area;
    get("rDescription").value = x.description;
    get("rStatus").value = x.status;
    get("rLink").value = x.link || "";

    setFormMode("research", "Edit Research", i);

    get("ownerPanel").scrollIntoView({ behavior: "smooth" });
}


// DELETE RESEARCH

function deleteResearch(i) {

    if (confirm("Delete this research?")) {

        researchItems.splice(i, 1);

        saveData("myResearch", researchItems);

        displayResearch();
    }
}


// EDIT EXPERIENCE

function editExperience(i) {

    const x = experiences[i];

    get("eRole").value = x.role;
    get("ePlace").value = x.place;
    get("ePeriod").value = x.period || "";
    get("eDescription").value = x.description;

    setFormMode("experience", "Edit Experience", i);

    get("ownerPanel").scrollIntoView({ behavior: "smooth" });
}


// DELETE EXPERIENCE

function deleteExperience(i) {

    if (confirm("Delete this experience?")) {

        experiences.splice(i, 1);

        saveData("myExperience", experiences);

        displayExperiences();
    }
}


// EDIT CERTIFICATE

function editCertificate(i) {

    const x = certificates[i];

    get("cName").value = x.name;
    get("cIssuer").value = x.issuer;
    get("cDate").value = x.date || "";
    get("cLink").value = x.link || "";

    setFormMode("certificate", "Edit Certificate / Course", i);

    get("ownerPanel").scrollIntoView({ behavior: "smooth" });
}


// DELETE CERTIFICATE

function deleteCertificate(i) {

    if (confirm("Delete this certificate?")) {

        certificates.splice(i, 1);

        saveData("myCertificates", certificates);

        displayCertificates();
    }
}


// ADD OR UPDATE PROJECT

get("projectForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const link = get("pLink").value.trim();

    if (!validUrl(link)) {
        alert("Enter a valid project URL.");
        return;
    }

    const item = {
        title: get("pTitle").value.trim(),
        description: get("pDescription").value.trim(),
        technologies: get("pTech").value.trim(),
        link: link
    };

    const i = Number(get("projectEditIndex").value);

    if (i >= 0) {
        projects[i] = item;
    } else {
        projects.push(item);
    }

    saveData("myProjects", projects);

    resetForm("project", "Add a Project");

    displayProjects();
});


// ADD OR UPDATE RESEARCH

get("researchForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const link = get("rLink").value.trim();

    if (!validUrl(link, true)) {
        alert("Enter a valid research URL.");
        return;
    }

    const item = {
        title: get("rTitle").value.trim(),
        area: get("rArea").value.trim(),
        description: get("rDescription").value.trim(),
        status: get("rStatus").value,
        link: link
    };

    const i = Number(get("researchEditIndex").value);

    if (i >= 0) {
        researchItems[i] = item;
    } else {
        researchItems.push(item);
    }

    saveData("myResearch", researchItems);

    resetForm("research", "Add Research");

    displayResearch();
});


// ADD OR UPDATE EXPERIENCE

get("experienceForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const item = {
        role: get("eRole").value.trim(),
        place: get("ePlace").value.trim(),
        period: get("ePeriod").value.trim(),
        description: get("eDescription").value.trim()
    };

    const i = Number(get("experienceEditIndex").value);

    if (i >= 0) {
        experiences[i] = item;
    } else {
        experiences.push(item);
    }

    saveData("myExperience", experiences);

    resetForm("experience", "Add Experience");

    displayExperiences();
});


// ADD OR UPDATE CERTIFICATE

get("certificateForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const link = get("cLink").value.trim();

    if (!validUrl(link, true)) {
        alert("Enter a valid credential URL.");
        return;
    }

    const item = {
        name: get("cName").value.trim(),
        issuer: get("cIssuer").value.trim(),
        date: get("cDate").value.trim(),
        link: link
    };

    const i = Number(get("certificateEditIndex").value);

    if (i >= 0) {
        certificates[i] = item;
    } else {
        certificates.push(item);
    }

    saveData("myCertificates", certificates);

    resetForm("certificate", "Add Certificate / Course");

    displayCertificates();
});


// CANCEL EDIT BUTTONS

get("cancelProjectEdit").addEventListener("click", () => {
    resetForm("project", "Add a Project");
});

get("cancelResearchEdit").addEventListener("click", () => {
    resetForm("research", "Add Research");
});

get("cancelExperienceEdit").addEventListener("click", () => {
    resetForm("experience", "Add Experience");
});

get("cancelCertificateEdit").addEventListener("click", () => {
    resetForm("certificate", "Add Certificate / Course");
});


// PROFILE PHOTO CHANGE

const profileImage = get("profileImage");

const defaultPhoto = "image/my-photo (2).JPG";

const oldPhoto = localStorage.getItem("myProfilePhoto");

if (oldPhoto) {
    profileImage.src = oldPhoto;
}

get("photoInput").addEventListener("change", function() {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        alert("Choose an image file.");

        this.value = "";

        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {

        const image = new Image();

        image.onload = function() {

            const canvas = document.createElement("canvas");

            const scale = Math.min(
                1,
                750 / Math.max(image.width, image.height)
            );

            canvas.width = Math.round(image.width * scale);

            canvas.height = Math.round(image.height * scale);

            canvas.getContext("2d").drawImage(
                image,
                0,
                0,
                canvas.width,
                canvas.height
            );

            try {

                const data = canvas.toDataURL("image/jpeg", 0.82);

                localStorage.setItem("myProfilePhoto", data);

                profileImage.src = data;

            } catch {

                alert("Could not save this image. Try a smaller photo.");
            }
        };

        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
});


// RESET PROFILE PHOTO

get("resetPhotoBtn").addEventListener("click", function() {

    localStorage.removeItem("myProfilePhoto");

    profileImage.src = defaultPhoto;

    get("photoInput").value = "";
});


// LIGHT AND DARK THEME

const themeSelect = get("themeSelect");

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(choice) {

    if (choice === "dark" ||
        (choice === "system" && systemTheme.matches)) {

        document.documentElement.dataset.theme = "dark";

    } else {

        document.documentElement.dataset.theme = "light";
    }

    themeSelect.value = choice;
}

applyTheme(localStorage.getItem("portfolioTheme") || "system");

themeSelect.addEventListener("change", function() {

    localStorage.setItem("portfolioTheme", this.value);

    applyTheme(this.value);
});

systemTheme.addEventListener("change", function() {

    if ((localStorage.getItem("portfolioTheme") || "system") === "system") {
        applyTheme("system");
    }
});


// CONTACT FORM DEMO

get("contactForm").addEventListener("submit", function(event) {

    event.preventDefault();

    alert(
        "Thank you! This demo form does not send emails yet. Please use the email link."
    );

    this.reset();
});


// INITIAL DISPLAY

refreshDisplays();