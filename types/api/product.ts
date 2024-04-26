export type TAll = {
  getAct: "all",
}

export type TAnalog = {
  getAct: "analog",
  url: string,
}

export type TRequestProductGet = {
  method: "post",
  body: TAll | TAnalog;
};