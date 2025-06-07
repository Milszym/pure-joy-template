/** @jsxImportSource @emotion/react */
import {css, useTheme} from "@emotion/react";
import {Button, Theme, ButtonProps as MuiButtonProps} from "@mui/material";
import {withMyTheme} from "../../theme/theme";
import {alpha} from "@mui/material/styles";

const ButtonPrimaryStyle = withMyTheme((theme: Theme, additionalCss?: any) => css`
    font-size: 1.2rem;
    padding: 10px 20px;
    font-weight: 600;
    border-radius: 25em;
    text-transform: none;

    &.MuiButton-outlined {
        border-color: ${theme.palette.primary.main};
        color: ${theme.palette.primary.main};

        &:hover {
            background-color: rgba(196, 85, 38, 0.04);
            border-color: ${theme.palette.primary.main};
        }
    }

    &.MuiButton-contained {
        background-color: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: 0 4px 8px ${alpha(theme.palette.primary.main, 0.5)};

        &:hover {
            background-color: ${theme.palette.primary.main};
        }
    }

    ${additionalCss ? additionalCss(theme) : ''}
`)

const ButtonSecondaryStyle = withMyTheme((theme: Theme, additionalCss?: any) => css`
    font-size: 1rem;
    padding: 10px 20px;
    font-weight: 500;
    border-radius: 25em;
    text-transform: none;

    &.MuiButton-outlined {
        border-color: ${theme.palette.secondary.main};
        color: ${theme.palette.secondary.main};

        &:hover {
            border-color: ${theme.palette.secondary.light};
        }
    }

    &.MuiButton-contained {
        background-color: ${theme.palette.secondary.main};
        color: ${theme.palette.secondary.contrastText};
        box-shadow: 0 4px 8px ${alpha(theme.palette.primary.main, 0.5)};

        &:hover {
            background-color: ${theme.palette.secondary.light};
        }
    }

    ${additionalCss ? additionalCss(theme) : ''}
`)

// Extend the MUI ButtonProps to create our own props interface
interface MyButtonProps extends Omit<MuiButtonProps, 'css' | 'startIcon'> {
    colorVariant?: "primary" | "secondary";
    variant?: "outlined" | "text" | "contained";
    text: string;
    onClick?: () => void;
    enabled?: boolean,
    additionalCss?: any;
    startIcon?: React.ReactNode;
    type?: "button" | "submit" | "reset"; // Explicitly define type for clarity
}

export const MyButton = (
    {
        text,
        colorVariant = 'primary',
        variant = 'outlined',
        onClick,
        additionalCss,
        startIcon,
        type = "button", // Default type is "button"
        ...props // Spread operator to capture all other props
    }: MyButtonProps
) => {
    const style = colorVariant === 'secondary' ? ButtonSecondaryStyle : ButtonPrimaryStyle;

    return (
        <Button
            css={(theme) => style(theme, additionalCss)}
            onClick={onClick}
            color={colorVariant}
            variant={variant}
            startIcon={startIcon}
            type={type}
            {...props}
        >
            {text}
        </Button>
    );
}