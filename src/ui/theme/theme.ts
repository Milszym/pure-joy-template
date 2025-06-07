import { SerializedStyles } from "@emotion/react"
import { createTheme, Theme } from "@mui/material"

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#daaa98',
            light: '#e3bcaf',
            dark: '#bf846f',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f6efe5',
            light: '#f6efe5',
            dark: '#8DC3C9',
            contrastText: '#fff',
        },
        text: {
            primary: '#000',
            secondary: '#fff',
        },
        background: {
            paper: '#fff'
        }
    },
    typography: {
        fontFamily: "'Cormorant', serif",
        h1: {
            fontFamily: "'Great Vibes', serif",
        },
        body1: {
            fontFamily: "'Cormorant', serif",
        },
    }
})

export const withMyTheme = <T extends (arg: any, additionalArg?: any) => any>(
    styleCreator: (theme: Theme, additionalArg?: any) => ReturnType<T>
) => {
    return (theme: any, additionalArg?: any) => styleCreator(theme as Theme, additionalArg) as SerializedStyles;
};