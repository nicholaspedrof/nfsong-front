const USERS_KEY = "users";
const SESSION_KEY = "session";

export function register(user) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const exists = users.find((u) => u.email === user.email);
  if (exists) {
    throw new Error("Email já cadastrado");
  }

  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function login(email, password) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return !!localStorage.getItem(SESSION_KEY);
}