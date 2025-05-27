import { User } from './path/to/user/types';

declare global { 
    namespace Express {
        interface Request {
            user?: User; 
        }
    }
}

