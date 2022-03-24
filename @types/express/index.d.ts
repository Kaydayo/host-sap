import Stakeholder from '../../src/models/stakeholders'


declare global {
    namespace Express {
      interface Request {
        user?: Stakeholder;
      }
    }
  }
  