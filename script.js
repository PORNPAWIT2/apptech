const companyList = document.getElementById("companyList");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("butClose");

function createCompanyCard(company) {
    const article = document.createElement("article");
    article.className = "card";

    const logo = document.createElement("img");
    logo.src = company.img;
    logo.alt = company.name;

    const title = document.createElement("h2");
    title.textContent = company.name;

    const desc = document.createElement("p");
    desc.textContent = company.desc;

    const button = document.createElement("button");
    button.textContent = "รายละเอียด";
    button.className = "open-btn";

    button.addEventListener("click", function() {
        document.getElementById("overlayTitle").textContent = company.name;
        document.getElementById("overlayDesc").textContent = company.desc;
        document.getElementById("overlayLogo").src = company.img;
        document.getElementById("overlayLink").href = company.url;
        overlay.classList.add("open");
        document.body.style.overflow = 'hidden';
    });

    article.appendChild(logo);
    article.appendChild(title);
    article.appendChild(desc);
    article.appendChild(button);

    return article;
}

function loadCompanies() {
    fetch("companies.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(company => {
                const card = createCompanyCard(company);
                companyList.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading companies:", error));
}

closeButton.addEventListener("click", () => {
    overlay.classList.remove("open");
    document.body.style.overflow = '';
});

overlay.addEventListener("click", (e) => {
    if (!e.target.closest(".overlay-box")) {
        overlay.classList.remove("open");
        document.body.style.overflow = '';
    }
});

loadCompanies();