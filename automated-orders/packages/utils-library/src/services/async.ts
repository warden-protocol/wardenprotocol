import { promisify } from 'util';

export const delay = promisify((ms: number, res: () => void) => setTimeout(res, ms));
