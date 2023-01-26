/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WireCreateFormInputValues = {
    title?: string;
    date?: string;
};
export declare type WireCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WireCreateFormOverridesProps = {
    WireCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WireCreateFormProps = React.PropsWithChildren<{
    overrides?: WireCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: WireCreateFormInputValues) => WireCreateFormInputValues;
    onSuccess?: (fields: WireCreateFormInputValues) => void;
    onError?: (fields: WireCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WireCreateFormInputValues) => WireCreateFormInputValues;
    onValidate?: WireCreateFormValidationValues;
} & React.CSSProperties>;
export default function WireCreateForm(props: WireCreateFormProps): React.ReactElement;
