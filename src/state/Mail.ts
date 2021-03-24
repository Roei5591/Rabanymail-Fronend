
export interface Mail {
  to: string[],
  subject: string,
  isStarred: boolean,
  isOutbound: boolean,
  _id: string,
  from: string,
  text: string,
  html: string,
  created: string,

}