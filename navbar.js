document.addEventListener("DOMContentLoaded", function () {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "checksession.php", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let response = JSON.parse(this.responseText);

            if (response.loggedIn) {
                let profileHTML = `
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white d-flex align-items-center" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="${response.photo}" alt="Profile" class="rounded-circle me-2" width="30" height="30">
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="profile.html">Update Profile</a></li>
                            <li><a class="dropdown-item" href="changepassword.html">Change Password</a></li>
                            <li><a class="dropdown-item" href="settings.html">Settings</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="logout.php">Logout</a></li>
                        </ul>
                    </li>
                `;

                document.getElementById("loginContainer").innerHTML = profileHTML;
            }
        }
    };
    xhr.send();
});