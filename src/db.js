const DB_PASSWORD = "secret123"; // Security issue

export function connect() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Connected with password:", DB_PASSWORD);
      resolve({ connected: true });
    }, 1000);
  });
}

export function query(sql) {
  console.log("Executing SQL:", sql);
  return [];
}
