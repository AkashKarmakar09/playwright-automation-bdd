module.exports = {
  random4() {
    return Math.floor(1000 + Math.random() * 9000);
  },

  uniqueUsername(baseUsername) {
    const random = this.random4();
    return `${baseUsername}_${random}`;
  },

  uniqueEmail(baseEmail) {
    const random = this.random4();
    const [local, domain] = baseEmail.split("@");
    return `${local}_${random}@${domain}`;
  },
};
