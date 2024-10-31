export interface IPersonalData {
  id?: number;
  cpf: string;
  name: string;
  email: string;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
}