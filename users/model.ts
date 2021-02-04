type Name = {
  firstName: string;
  middleName?: string;
  lastName: string;
  title: 'Mr' | 'Ms' | 'Mrs' | 'Dr';
}

export type User = {
  id: string;
  name: Name;
  dateOfBirth: Date;
  isEnabled: boolean;
}