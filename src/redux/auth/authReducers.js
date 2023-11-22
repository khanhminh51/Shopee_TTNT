import {
  LOGIN,
  REGISTER,
  DETAIL,
  GETID,
  DETAILUPDATE,
  REMOVEUSER,
} from './authTypes';

const initialData = {
  appID: '',
  token: true,
  userData: [
    {
      Id: 'KH000',
      Hoten: 'Châu Hoàng Duy',
      Email: 'Duy@gmail.com',
      TenTK: 'admin',
      MK: 'admin123',
      role: 'admin',
    },
    {
      Id: 'KH001',
      Hoten: 'Nguyễn Văn A',
      Email: 'A@gmail.com',
      TenTK: 'user',
      MK: 'user123',
      role: 'guest',
    },
  ],
  detailUser: {},
};

function generateUniqueKHID(existingKHIDs) {
  const prefix = 'KH';
  const min = 1;
  const max = 999;

  let randomNumbers;
  let paddedNumber;
  let generatedKHID;

  do {
    randomNumbers = min + Math.floor(Math.random() * (max - min + 1));
    paddedNumber = randomNumbers.toString().padStart(3, '0');
    generatedKHID = prefix + paddedNumber;
  } while (existingKHIDs.some(user => user.Id === generatedKHID));

  return generatedKHID;
}
export default function auth(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: state.userData.find(
          item => item.TenTK === action.user && item.MK === action.pass,
        )
          ? true
          : false,
      };

    case GETID:
      const user = state.userData.find(item => item.TenTK === action.value);
      if (user) {
        return {
          ...state,
          appID: user.Id,
        };
      }

    case REGISTER:
      return {
        ...state,
        userData: [
          ...state.userData,
          {
            Id: generateUniqueKHID(state.userData),
            Hoten: action.ten,
            Email: action.email,
            TenTK: action.user,
            MK: action.pass,
            role: 'guest',
          },
        ],
      };

    case DETAIL:
      return {
        ...state,
        detailUser: state.userData.find(user => user.Id === action.Id),
      };

    case DETAILUPDATE:
      const userIndex = state.userData.findIndex(user => user.Id === action.id);
      const updatedData = {
        Id: action.id,
        Hoten: action.ten,
        Email: action.email,
        TenTK: action.user,
        MK: action.pass,
      };
      if (userIndex !== -1) {
        state.userData[userIndex] = {
          ...state.userData[userIndex],
          ...updatedData,
        };
      }
      return {
        ...state,
        userData: [...state.userData],
      };

    case REMOVEUSER:
      return {
        ...state,
        userData: state.userData.filter(user => user.Id !== action.id),
      };

    default:
      return state;
  }
}
