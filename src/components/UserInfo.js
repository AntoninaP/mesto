
export class UserInfo {
  constructor({name, job, avatar}) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {name: this._name.textContent, job: this._job.textContent, avatar: this._avatar.src};
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setUserId (userId) {
    this._userId = userId;
  }

  getUserId () {
    return this._userId;
  }
}
