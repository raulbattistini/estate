import { ReactNode } from "react"

export interface IState {

    currentStep: number,
    name: string,
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string,
    intention: string,
    income: string | null
}

export interface IAction {
    type: RegisterAction
    payload: any
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

export interface IContext{
    state: IState,
    dispatch: (action: IAction) => void
}

export interface IRegisterProps {
    children: ReactNode | JSX.Element[]
}