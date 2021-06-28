const users = [];

module.exports = class User {
    constructor(userName, userEmail, userPhone, userMessage) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.userMessage = userMessage;
    }

    save() {
        users.push(this);
    }

    static getAll() {
        return users;
    }
}