import { ThunkDispatch } from "@reduxjs/toolkit";
import { JSXElementConstructor, Key, ReactElement, ReactNode } from "react";

export interface IAuthContext {
    user: IUserAuth | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
}
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
  intention: string;
  income?: string;
}

export interface IAuth {
  user: string | null;
  token: string | null;
}

export interface IUserAuth {
  auth: IAuth;
  id_user: number;
  email: string;
  active: boolean;
  date_register: Date;
}

export interface IAuthChildren {
  children: JSX.Element | ReactElement;
}

interface IToken {
  auth: string
}

export interface IGetState {
  getState: () => any | unknown | IToken,
}

export interface BaseQueryApi {
  signal: AbortSignal;
  dispatch: ThunkDispatch<any, any, any>;
  getState: () => unknown | any;
  extra: unknown;
  endpoint: string;
  type: 'query' | 'mutation';
  /**
   * Only available for queries: indicates if a query has been forced,
   * i.e. it would have been fetched even if there would already be a cache entry
   * (this does not mean that there is already a cache entry though!)
   *
   * This can be used to for example add a `Cache-Control: no-cache` header for
   * invalidated queries.
   */
  forced?: boolean;
}

export interface IProperty {
  estate_id: string,
  name: string,
  inclusion_date: Date,
  user_poster: string,
  value: number,
  isSold?: boolean,
  isRented?: boolean,
  media: string[]
}