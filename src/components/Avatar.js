export class Avatar {
  constructor(link) {
    this._link = link;
  }

  editAvatar (link) {
    this._link.src = link;
  }
}
