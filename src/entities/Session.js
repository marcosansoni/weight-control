class Session {
  constructor(data) {
    this.token = data?.token;
    this.email = data?.email;
  }

  get isValid() {
    return Boolean(this.token);
  }
}

export default Session;
