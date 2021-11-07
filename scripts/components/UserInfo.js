export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._userInfo = { name: this._nameElement.textContent, job: this._jobElement.textContent };

    return this._userInfo;
  }

  setUserInfo(newName, newJob) {
    this._nameElement.textContent = newName;
    this._jobElement.textContent = newJob;
  }
}
