import { createContext, useContext, useReducer } from "react";
import { IAction, IContext, IState, RegisterAction, IRegisterProps } from "../../interfaces";

const initialData: IState = {
  currentStep: 0,
  name: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  intention: [],
  income: "",
};

export const RegisterContext = createContext<IContext | undefined>(undefined);

const registerReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case RegisterAction.setCurrentStep:
      return { ...state, currentStep: action.payload };
    case RegisterAction.setName:
      return { ...state, name: action.payload };
    case RegisterAction.setEmail:
      return { ...state, email: action.payload };
    case RegisterAction.setConfirmEmail:
      return { ...state, confirmEmail: action.payload };
    case RegisterAction.setPassword:
      return { ...state, password: action.payload };
    case RegisterAction.setConfirmPassword:
      return { ...state, confirmPassword: action.payload };
    case RegisterAction.setIntention:
      return { ...state, intention: action.payload };
    case RegisterAction.setIncome:
      return { ...state, income: action.payload };
    default:
      return state;
  } 
};

export const RegisterProvider = ({children}: IRegisterProps) =>{
    const [state, dispatch] = useReducer(registerReducer, initialData);
    const value = { state, dispatch};
    return (
      <RegisterContext.Provider value={value}>
        {children}
      </RegisterContext.Provider>
    )
}

export const useRegister = () =>{
  const context = useContext(RegisterContext);

  if (context === undefined){
    throw new Error("useRegister must be used inside Register Provider")
  }
  return context;
}