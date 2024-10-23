import { DeleteResult } from 'typeorm';
import { IRefreshToken } from '../models/IRefreshToken';

export interface IRefreshTokenRepository {
  findRefreshToken(refresh_token: string): Promise<IRefreshToken | null>;
  findById(id: number): Promise<IRefreshToken | null>;
  createRefreshToken(credential_id: number): Promise<IRefreshToken | null>;
  updateRefreshToken(
    credential_id: number,
    new_refresh_token: string
  ): Promise<IRefreshToken | null>;
  clearRefreshToken(credential_id: number): Promise<DeleteResult>;
}
