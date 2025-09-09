const users = [
  { email: "fake@example.com", password: "123456", name: "Fake User" },
];

export const register = (email, password, name) => {
  return new Promise((resolve, reject) => {
    const exists = users.some((u) => u.email === email);
    if (exists) {
      reject({ error: "The" });
    } else {
      users.push({ email, password, name });
      resolve({ success: true });
    }
  });
};

export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      resolve({ token: "a-fake-token" });
    } else {
      reject({ error: "Invalid credentials" });
    }
  });
};

export const checkToken = (token) => {
  return new Promise((resolve) => {
    resolve({
      data: { name: "Fake User", email: "fake@example.com", _id: "fake-id" },
    });
  });
};
