import { atom } from "recoil";

export const ErrorList = atom({
  key: "ErrorList",
  default: "",
});

export const Warning = atom({
  key: "Warning",
  default: "",
});

export const CRoomWarning = atom({
  key: "CRoomWarning",
  default: "",
});

export const CRoomError = atom({
  key: "CRoomError",
  default: "",
});
