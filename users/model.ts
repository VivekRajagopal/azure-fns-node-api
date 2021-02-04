export type User = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
    title: 'Mr' | 'Ms' | 'Mrs' | 'Dr';
  };
  dateOfBirth: Date;
}