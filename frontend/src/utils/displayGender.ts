export function displayGender(gender: "m" | "f" | "o") {
  if (gender === "m") {
    return "Male";
  } else if (gender === "f") {
    return "Female";
  } else {
    return "Others";
  }
}
