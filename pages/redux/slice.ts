import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  phoneNumber: string;
  workType: string;
  schedule: {
    startDate: string; // yyyy-MM-dd
    endDate: string; // yyyy-MM-dd
    visitTime: string; // hh:mm:ss
    hour: number | null;
  };
  address: {
    addressDetail: string;
    jibunAddress: string;
    liName: string | null;
    locationCode: string;
    roadCode: string;
    myundongName: string;
    roadAddress: string;
    sidoName: string;
    sigunguName: string;
  };
}

const initialState: IState = {
  phoneNumber: "",
  workType: "",
  schedule: {
    startDate: "", // yyyy-MM-dd
    endDate: "", // yyyy-MM-dd
    visitTime: "", // hh:mm:ss
    hour: null,
  },
  address: {
    addressDetail: "",
    jibunAddress: "",
    liName: null,
    locationCode: "",
    roadCode: "",
    myundongName: "",
    roadAddress: "",
    sidoName: "",
    sigunguName: "",
  },
};

const slice = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    workType: (state, action) => {},
    schedule: (state, action) => {},
    address: (state, action) => {},
    phoneNumber: (state, action) => {},
  },
});

export default slice.reducer;
