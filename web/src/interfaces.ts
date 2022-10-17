import { JSXElementConstructor, Key, ReactElement, ReactNode } from "react";

export interface IState {
  currentStep: number;
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  intention: string;
  income: string | null;
}

export interface IAction {
  type: RegisterAction;
  payload: any;
}

export enum RegisterAction {
  setCurrentStep,
  setName,
  setEmail,
  setConfirmEmail,
  setPassword,
  setConfirmPassword,
  setIntention,
  setIncome,
  setCelular,
  setDepto,
}

export interface IContext {
  state: IState;
  dispatch: (action: IAction) => void;
}

export interface IRegisterProps {
  children: ReactNode | JSX.Element[];
}

export interface IData {
  name: string;
  order: number;
  checked?: boolean;
  index?: number;
}

export interface IObj {
  obj: IData;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
}

export interface IFinalValues {
  intention: string,
  income?: string
}

export interface IUserAuth {
  id_user: number,
  email: string,
  active: boolean,
  date_register: Date
} 

export interface IAuthChildren {
  children: JSX.Element | ReactElement
}
