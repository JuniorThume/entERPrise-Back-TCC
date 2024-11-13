import bcrypt from 'bcryptjs';

async function EncryptPassword(pswd: string) {
  const salt = process.env.APP_SALT || (await bcrypt.genSalt(10));
  return await bcrypt.hash(pswd, salt);
}

async function DecryptPassword(pswd: string, pswdEncryped: string) {
  return await bcrypt.compare(pswd, pswdEncryped);
}

export { EncryptPassword, DecryptPassword };
