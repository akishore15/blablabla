document.addEventListener("DOMContentLoaded", function () {
    const emailList = [
        { subject: "Welcome to Outlook", body: "This is your first email!" },
        { subject: "Meeting Reminder", body: "Don't forget about the meeting tomorrow at 10 AM." },
        { subject: "Holiday Plans", body: "Let's plan for the holiday trip next month." }
    ];

    const emailListElement = document.getElementById("email-list");
    const emailViewElement = document.getElementById("email-view");
    const emailSubjectElement = document.getElementById("email-subject");
    const emailBodyElement = document.getElementById("email-body");
    const emailComposeElement = document.getElementById("email-compose");

    function displayEmail(email) {
        emailSubjectElement.textContent = email.subject;
        emailBodyElement.textContent = email.body;
        emailViewElement.classList.add("active");
        emailComposeElement.classList.remove("active");
    }

    function sendEmail() {
        const subject = document.getElementById("compose-subject").value;
        const body = document.getElementById("compose-body").value;
        emailList.push({ subject: subject, body: body });
        renderEmailList();
        document.getElementById("compose-subject").value = '';
        document.getElementById("compose-body").value = '';
    }

    function renderEmailList() {
        emailListElement.innerHTML = '';
        emailList.forEach((email, index) => {
            const li = document.createElement("li");
            li.textContent = email.subject;
            li.onclick = () => displayEmail(email);
            emailListElement.appendChild(li);
        });
    }

    document.getElementById("email-compose-button").onclick = function () {
        emailViewElement.classList.remove("active");
        emailComposeElement.classList.add("active");
    };

    renderEmailList();
});
