export type User = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
    title: "Mr" | "Mrs" | "Ms" | "Dr";
  };
  dateOfBirth: Date;
};
