import { types as driverTypes } from '../actions/driverAction';

const defaultState = {
  listDriver : [
    {
     driverId: 1,
     name: 'Le Thanh Cong',
     address: '200 Nguyen Co Thach'
    },
    {
     driverId: 2,
     name: 'Nguyen Trong Danh',
     address: '200 Nguyen Van Cu'
    },
    {
     driverId: 3,
     name: 'Nguyen Thanh Duy',
     address: '267 Le Van Sy'
    },
    {
     driverId: 4,
     name: 'Le Van Thanh',
     address: '300 Thu Dau Mot'
    },
  ],
  isAdding : false,
  isEdit : false,
}; 

const editDriver = (driverList, payload ) => {

  driverList[payload.driverUpdateIndex].name = payload.newName;
  driverList[payload.driverUpdateIndex].address = payload.newAddress;
  
  return driverList;
}


const driverReducer = (state = defaultState, action) => {
    switch (action.type) {
     case driverTypes.ADD_DRIVER:
        return {...state, listDriver : [...state.listDriver, action.driver] }
    case driverTypes.REMOVE_DRIVER:
        return {...state, listDriver: state.listDriver.filter((driver) => driver.driverId !== action.id )}
    case driverTypes.EDIT_DRIVER:
        return {...state, listDriver: editDriver(state.listDriver, action.payload) }
     default:
      return state
    }
  }

  const selectors  = {
    getDriverList :state => state.driverReducer.listDriver
  };

export default driverReducer;
export { selectors };

