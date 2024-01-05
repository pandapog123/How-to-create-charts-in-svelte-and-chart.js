export type User = {
  id: number;
  age: number;
  height: number;
  weight: number;
  firstName: string;
  lastName: string;
};

export function validateUser(data: any): data is User {
  const idValid = typeof data.id === "number";
  const ageValid = typeof data.age === "number";
  const heightValid = typeof data.height === "number";
  const weightValid = typeof data.weight === "number";
  const firstNameValid = typeof data.firstName === "string";
  const lastNameValid = typeof data.lastName === "string";

  return (
    idValid &&
    ageValid &&
    heightValid &&
    weightValid &&
    firstNameValid &&
    lastNameValid
  );
}
