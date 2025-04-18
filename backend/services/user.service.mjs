import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (password, storedPassword) => {
  const passwordMatched = await bcrypt.compare(password, storedPassword);

  return passwordMatched;
};
