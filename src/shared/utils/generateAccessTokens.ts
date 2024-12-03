import { ICredential } from '../../modules/credentials/domain/models/ICredential';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../consts/secret';
import { IEmployee } from '@modules/employees/domain/models/IEmployee';
export const generateAccessTokens = (
  credential: ICredential,
  employee: IEmployee
) => {
  const token = jwt.sign(
    {
      user: {
        id: credential.employee_id,
        username: credential.username,
        role: employee?.role
      }
    },
    SECRET_KEY,
    {
      expiresIn: '30m'
    }
  );
  return token;
};
