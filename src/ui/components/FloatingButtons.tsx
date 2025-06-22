/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { withMyTheme } from "../theme/theme"
import { MyButton } from "./button/MyButton"
import { mobileCss } from "../theme/isMobile"
import { useTranslation } from "react-i18next"
import { Navigation, Restaurant } from "@mui/icons-material"
import { navigateToMap, navigateToZielonaBrama } from "../landing/location/Location"

const FloatingButtonsContainerStyle = withMyTheme(() => css`
    position: fixed;
    bottom: 5vh;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
    
    /* Hide on desktop */
    display: none;
    
    ${mobileCss(`
        display: flex;
    `)}
`)

const FloatingButtonStyle = withMyTheme(() => css`
    font-size: 0.9rem;
    padding: 0.8rem 1.2rem;
    border-radius: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 120px;
`)

export const FloatingButtons = () => {
    const { t } = useTranslation()

    const scrollToMenu = () => {
        const menuElement = document.getElementById('menu')
        if (menuElement) {
            menuElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div css={FloatingButtonsContainerStyle}>
            <MyButton
                text={t('navigate')}
                variant="contained"
                colorVariant="primary"
                startIcon={<Navigation />}
                onClick={navigateToMap}
                additionalCss={FloatingButtonStyle}
            />
            <MyButton
                text={t('menu.title')}
                variant="contained"
                colorVariant="primary"
                startIcon={<Restaurant />}
                onClick={scrollToMenu}
                additionalCss={FloatingButtonStyle}
            />
        </div>
    )
} 