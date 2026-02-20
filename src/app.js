const API_KEY = "hardcoded123"; // Security issue

export function init() {
  console.log(" Initializing app with key:", API_KEY);
}

export function getData() {
  return fetch("/api/data");
}
