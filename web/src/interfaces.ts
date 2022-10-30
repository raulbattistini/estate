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
  intention: string[];
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

export interface IFinalValues {
  intention: string[];
  income?: string;
}

export interface IAuth {
  user: string | null;
  token: string | null;
}

export interface IUserAuth {
  id: string;
  name: string;
  admin: boolean;
  email: string;
  password: string;
  intention?: string;
  income?: string;
}

export interface IAuthChildren {
  children: JSX.Element | ReactElement;
}

export interface IProperty {
  estate_id: string;
  name: string;
  inclusion_date: Date;
  user_poster: string;
  value: number;
  isSold?: boolean;
  isRented?: boolean;
  media: string[];
}

export interface IPost {
  post_id: string
  title: string
  content: string
  created_at: Date
}

export interface IValues {
  name: string,
  email: string,
  password: string,
  intention?: string,
  income?: string
}

export interface IUpdatePost {
  title: string,
  content: string,
}