import { ICredential } from '../../modules/auth/domain/models/ICredential';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../consts/secret';
export const generateAccessTokens = (credential: ICredential) => {
  const token = jwt.sign(
    { user: { id: credential.employee_id?.id, username: credential.username } },
    SECRET_KEY,
    {
      expiresIn: '30m'
    }
  );
  return token;
};
