let allBanks = [];
let filter = "income";
let currency = localStorage.getItem("currency") || "$";

let categories = {};

const initialState = { allBanks, filter, categories, currency };

export const projectReducer = (state = initialState, action) => {
  let activeBank;

  switch (action.type) {
    case "FETCHED_CATEGORY":
      return { ...state, categories: action.doc[0] };

    case "EMPTY_BANKS":
      return { ...state, allBanks: [] };

    case "FETCHED_DATA":
      return { ...state, allBanks: action.doc };

    case "EDIT_ITEM":
      allBanks = [...state.allBanks];
      activeBank = allBanks.find(({ active }) => active);

      for (const key of Object.keys(activeBank.bankStatements)) {
        if (key === action.details.filter) {
          activeBank.bankStatements[key] = action.data;
        }
      }

      return { ...state, allBanks };

    case "REMOVE_ITEM":
      allBanks = [...state.allBanks];
      activeBank = allBanks.find(({ active }) => active);

      for (const key of Object.keys(activeBank.bankStatements)) {
        if (key === action.filter) {
          activeBank.bankStatements[key] = action.data;
        }
      }

      return { ...state, allBanks };

    case "ADD_ITEM":
      allBanks = [...state.allBanks];
      activeBank = allBanks.find(({ active }) => active);

      for (const key of Object.keys(activeBank.bankStatements)) {
        if (key === action.details.filter) {
          activeBank.bankStatements[key] = action.data;
        }
      }

      for (const user in state.categories) {
        if (user === action.details.filter) {
          if (state.categories[user].indexOf(action.details.category) === -1) {
            state.categories[user] = [
              ...state.categories[user],
              action.details.category,
            ];
          }
        }
      }

      return { ...state, allBanks };

    case "ADD_WALLET":
      allBanks = [...state.allBanks, action.newBank];
      if (action.newBank.default) {
        allBanks = allBanks.map((bank) => {
          if (bank.bankName === action.newBank.bankName) {
            return {
              ...bank,
              active: true,
            };
          }
          return {
            ...bank,
            active: false,
          };
        });
        return { ...state, allBanks };
      }
      return { ...state, allBanks };

    case "CHANGE_FILTER":
      return { ...state, filter: action.filter };

    case "CHANGE_WALLET":
      allBanks = state.allBanks.map((bank) => {
        if (bank.bankName === action.name) {
          return {
            ...bank,
            active: true,
          };
        }
        return { ...bank, active: false };
      });

      return { ...state, allBanks };

    case "CURRENCY_SELECTED":
      return { ...state, currency: action.currency };

    default:
      return state;
  }
};
