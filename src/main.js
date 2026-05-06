import "./style.css";

const API_BASE = "/api/api/v1/users";

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-5xl grid md:grid-cols-2 gap-6">

      <section class="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h1 class="text-3xl font-bold mb-2">FreeAPI Auth App</h1>
        <p class="text-slate-400 mb-6">Register, login, logout, and view user profile.</p>

        <div id="message" class="mb-4 hidden p-3 rounded-lg text-sm"></div>

        <form id="registerForm" class="space-y-4 mb-8">
          <h2 class="text-xl font-semibold">Register</h2>

          <input id="regEmail" type="email" placeholder="Email" class="input" required />
          <input id="regUsername" type="text" placeholder="Username" class="input" required />
          <input id="regPassword" type="password" placeholder="Password" class="input" required />

          <select id="regRole" class="input">
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>

          <button type="submit" class="btn bg-blue-600 hover:bg-blue-700">
            Register
          </button>
        </form>

        <form id="loginForm" class="space-y-4">
          <h2 class="text-xl font-semibold">Login</h2>

          <input id="loginUsername" type="text" placeholder="Username" class="input" required />
          <input id="loginPassword" type="password" placeholder="Password" class="input" required />

          <button type="submit" class="btn bg-green-600 hover:bg-green-700">
            Login
          </button>
        </form>
      </section>

      <section class="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 class="text-2xl font-bold mb-4">Current User</h2>

        <div id="userProfile" class="text-slate-400">
          No logged-in user found.
        </div>

        <div class="mt-6 space-y-3">
          <button id="getUserBtn" type="button" class="btn bg-purple-600 hover:bg-purple-700">
            Get Current User
          </button>

          <button id="logoutBtn" type="button" class="btn bg-red-600 hover:bg-red-700">
            Logout
          </button>
        </div>
      </section>

    </div>
  </main>
`;

const messageBox = document.querySelector("#message");
const userProfile = document.querySelector("#userProfile");

const showMessage = (text, type = "success") => {
  messageBox.classList.remove("hidden");

  messageBox.className =
    type === "success"
      ? "mb-4 p-3 rounded-lg text-sm bg-green-900 text-green-200 border border-green-700"
      : "mb-4 p-3 rounded-lg text-sm bg-red-900 text-red-200 border border-red-700";

  messageBox.textContent = text;
};

const setLoading = (button, text, isLoading) => {
  if (isLoading) {
    button.disabled = true;
    button.dataset.oldText = button.innerText;
    button.innerText = text;
    button.classList.add("opacity-60", "cursor-not-allowed");
  } else {
    button.disabled = false;
    button.innerText = button.dataset.oldText || button.innerText;
    button.classList.remove("opacity-60", "cursor-not-allowed");
  }
};

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: options.body,
  });

  const data = await response.json();

  console.log("API RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

const getCurrentUser = async () => {
  try {
    const data = await apiRequest("/current-user");

    const user = data.data?.user || data.data;

    userProfile.innerHTML = `
      <div class="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
        <p><span class="font-semibold text-white">Username:</span> ${user.username || "N/A"}</p>
        <p><span class="font-semibold text-white">Email:</span> ${user.email || "N/A"}</p>
        <p><span class="font-semibold text-white">Role:</span> ${user.role || "N/A"}</p>
      </div>
    `;

    showMessage("Current user loaded successfully");
  } catch (error) {
    userProfile.textContent = "No logged-in user found.";
    showMessage(error.message, "error");
  }
};

document.querySelector("#registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = e.target.querySelector("button");

  const userData = {
    email: document.querySelector("#regEmail").value,
    username: document.querySelector("#regUsername").value,
    password: document.querySelector("#regPassword").value,
    role: document.querySelector("#regRole").value,
  };

  try {
    setLoading(button, "Registering...", true);

    const data = await apiRequest("/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    showMessage(data.message || "Registered successfully");
    e.target.reset();
  } catch (error) {
    showMessage(error.message, "error");
  } finally {
    setLoading(button, "Register", false);
  }
});

document.querySelector("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = e.target.querySelector("button");

  const loginData = {
    username: document.querySelector("#loginUsername").value,
    password: document.querySelector("#loginPassword").value,
  };

  try {
    setLoading(button, "Logging in...", true);

    const data = await apiRequest("/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    showMessage(data.message || "Login successful");
    await getCurrentUser();
    e.target.reset();
  } catch (error) {
    showMessage(error.message, "error");
  } finally {
    setLoading(button, "Login", false);
  }
});

document.querySelector("#getUserBtn").addEventListener("click", async (e) => {
  const button = e.target;

  try {
    setLoading(button, "Loading user...", true);
    await getCurrentUser();
  } finally {
    setLoading(button, "Get Current User", false);
  }
});

document.querySelector("#logoutBtn").addEventListener("click", async (e) => {
  const button = e.target;

  try {
    setLoading(button, "Logging out...", true);

    const data = await apiRequest("/logout", {
      method: "POST",
    });

    userProfile.textContent = "No logged-in user found.";
    showMessage(data.message || "Logout successful");
  } catch (error) {
    showMessage(error.message, "error");
  } finally {
    setLoading(button, "Logout", false);
  }
});