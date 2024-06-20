export class LoginResult {
  username: string;
    userId: string;
    mobile?: string | null;
    Token: string;
    constructor() {
      this.Token = '';
      this.mobile = null,
      this.username = '';
      this.userId = '';
    }
  }