/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Wire } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WireUpdateFormInputValues = {
    title?: string;
    date?: string;
};
export declare type WireUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WireUpdateFormOverridesProps = {
    WireUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WireUpdateFormProps = React.PropsWithChildren<{
    overrides?: WireUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    wire?: Wire;
    onSubmit?: (fields: WireUpdateFormInputValues) => WireUpdateFormInputValues;
    onSuccess?: (fields: WireUpdateFormInputValues) => void;
    onError?: (fields: WireUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WireUpdateFormInputValues) => WireUpdateFormInputValues;
    onValidate?: WireUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WireUpdateForm(props: WireUpdateFormProps): React.ReactElement;
