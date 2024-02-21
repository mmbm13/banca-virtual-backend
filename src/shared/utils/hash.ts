import { createHash } from 'crypto';

export const hash = (text: string): string => {
  const hashInstance = createHash('sha256');
  return hashInstance.update(text).digest('hex');
};
