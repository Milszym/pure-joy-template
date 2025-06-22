/** @jsxImportSource @emotion/react */
import { useTranslation } from "react-i18next"
import { withMyTheme } from "../../theme/theme"
import { css } from "@emotion/react"
import { mobileCss } from "../../theme/isMobile"
import { MyButton } from "../../components/button/MyButton"
import {
    Restaurant,
    LocalDining,
    SoupKitchen,
    LocalBar,
    Cake,
    SetMeal,
    LunchDining,
    LocalPizza,
    LocalFlorist,
    Fastfood
} from "@mui/icons-material"
import { Fullscreen } from "../../components/Fullscreen"
import { Dialog, DialogContent, DialogTitle, Theme } from "@mui/material"
import { useState } from "react"

export const MENU_ID = "menu"

const MenuContentStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('/images/peach_background_30.png');
    height: 100vh;
    width: 100vw;
    color: ${theme.palette.text.primary};
    ${mobileCss(`
        height: auto;
    `)}
`)

const MenuTitleStyle = withMyTheme((theme) => css`
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.main};
    margin-bottom: 3rem;
    margin-top: 3rem;
    text-align: center;
    ${mobileCss(`
        font-size: clamp(2rem, 8vw, 3rem);
        margin-bottom: 2rem;
    `)}
`)

const MenuGridStyle = withMyTheme(() => css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1.5rem;
    overflow-y: auto;
    height: 100%;
    padding: 0 3rem;
    ${mobileCss(`
        gap: 0.5rem;
        height: auto;
        width: 85vw;
        margin-bottom: 5vh;
        overflow-y: visible;
        flex-wrap: no-wrap;
    `)}
`)

const MenuItemStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: ${theme.palette.background.paper};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`)

const MenuItemHeaderStyle = withMyTheme(() => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    ${mobileCss(`
        gap: 0.8rem;
        margin-bottom: 0.8rem;
    `)}
`)

const MenuIconStyle = withMyTheme((theme) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${theme.palette.secondary.light};
    color: ${theme.palette.primary.dark};
    flex-shrink: 0;
    ${mobileCss(`
        width: 40px;
        height: 40px;
    `)}
`)

const MenuItemTitleStyle = withMyTheme((theme) => css`
    font-size: 1.3rem;
    font-weight: 700;
    color: ${theme.palette.primary.main};
    font-family: ${theme.typography.body1.fontFamily};
    ${mobileCss(`
        font-size: 1.1rem;
    `)}
`)

const MenuDescriptionStyle = withMyTheme((theme) => css`
    font-size: 0.95rem;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.body1.fontFamily};
    line-height: 1.5;
    margin-bottom: 1rem;
    white-space: pre-line;
    ${mobileCss(`
        font-size: 0.9rem;
        margin-bottom: 0.8rem;
    `)}
`)

const MenuButtonStyle = withMyTheme(() => css`
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    align-self: flex-start;
    ${mobileCss(`
        font-size: 0.85rem;
        padding: 0.4rem 0.8rem;
    `)}
`)

const MenuDialogContentStyle = withMyTheme((theme) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
`)

const MenuDialogTitleStyle = withMyTheme((theme: Theme) => css`
    font-family: ${theme.typography.h1.fontFamily};
    font-weight: ${theme.typography.h1.fontWeight};
    font-size: 2rem;
    text-align: center;
    margin-top: 1em;
`)

const MenuDialogDescriptionStyle = withMyTheme((theme: Theme) => css`
    font-size: 1.2rem;
    color: black;
    text-align: center;
    white-space: pre-line;
    font-family: ${theme.typography.body1.fontFamily};
    font-weight: 300;

    ${mobileCss(`
        font-size: 4vw;
    `)}
`)

const MenuDialogButtonWrapperStyle = withMyTheme(() => css`
    margin-top: 3vh;
`)

interface MenuItemProps {
    title: string;
    description?: string;
    icon: React.ReactNode;
    showButton?: boolean;
    onButtonClick?: () => void;
}

const MenuItem = ({ title, description, icon, showButton = true, onButtonClick }: MenuItemProps) => {
    const { t } = useTranslation()

    return <div css={MenuItemStyle}>
        <div css={MenuItemHeaderStyle}>
            <div css={MenuIconStyle}>
                {icon}
            </div>
            <div css={MenuItemTitleStyle}>{title}</div>
        </div>
        {description && (
            <div css={MenuDescriptionStyle} dangerouslySetInnerHTML={{ __html: description }} />
        )}
        {showButton && (
            <MyButton
                text={t('menu.seeDetails')}
                variant="outlined"
                additionalCss={MenuButtonStyle}
                enabled={true}
                onClick={onButtonClick}
            />
        )}
    </div>
}

export const Menu = () => {
    const { t } = useTranslation()
    const [selectedMenuItem, setSelectedMenuItem] = useState<{ title: string; description: string } | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleOpenModal = (title: string, descriptionKey: string) => {
        setSelectedMenuItem({
            title: title,
            description: t(descriptionKey)
        })
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const menuItems: Array<{
        title: string;
        description?: string;
        icon: React.ReactNode;
        showButton: boolean;
        descriptionKey?: string;
    }> = [
        {
            title: t('menu.soup.title'),
            description: t('menu.soup.description'),
            icon: <SoupKitchen />,
            showButton: false
        },
        {
            title: t('menu.mainCourse.title'),
            description: t('menu.mainCourse.description'),
            icon: <Restaurant />,
            showButton: false
        },
        {
            title: t('menu.supper1.title'),
            description: t('menu.supper1.description'),
            icon: <LocalDining />,
            showButton: false
        },
        {
            title: t('menu.supper2.title'),
            description: t('menu.supper2.description'),
            icon: <SoupKitchen />,
            showButton: false
        },
        {
            title: t('menu.drinks.title'),
            description: undefined,
            icon: <LocalBar />,
            showButton: true,
            descriptionKey: 'menu.drinks.description'
        },
        {
            title: t('menu.sweetBuffet.title'),
            description: undefined,
            icon: <Cake />,
            showButton: true,
            descriptionKey: 'menu.sweetBuffet.description'
        },
        {
            title: t('menu.polishBuffet.title'),
            description: undefined,
            icon: <SetMeal />,
            showButton: true,
            descriptionKey: 'menu.polishBuffet.description'
        },
        {
            title: t('menu.meatBuffet.title'),
            description: undefined,
            icon: <LunchDining />,
            showButton: true,
            descriptionKey: 'menu.meatBuffet.description'
        },
        {
            title: t('menu.saladBuffet.title'),
            description: undefined,
            icon: <LocalFlorist />,
            showButton: true,
            descriptionKey: 'menu.saladBuffet.description'
        },
        {
            title: t('menu.varietyBuffet.title'),
            description: undefined,
            icon: <Fastfood />,
            showButton: true,
            descriptionKey: 'menu.varietyBuffet.description'
        }
    ]

    return (
        <div id={MENU_ID} css={MenuContentStyle}>
            <div css={MenuTitleStyle}>
                {t('menu.title')}
            </div>
            <div css={MenuGridStyle}>
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        showButton={item.showButton}
                        onButtonClick={() => handleOpenModal(item.title, item.descriptionKey || '')}
                    />
                ))}
            </div>
            
            <Dialog onClose={handleCloseModal} open={modalOpen}>
                <DialogTitle>
                    <div css={MenuDialogTitleStyle}>
                        {selectedMenuItem?.title}
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div css={MenuDialogContentStyle}>
                        {!!selectedMenuItem && <div css={MenuDialogDescriptionStyle} dangerouslySetInnerHTML={{ __html: selectedMenuItem?.description }}/> }
                        <div css={MenuDialogButtonWrapperStyle}>
                            <MyButton
                                variant="contained"
                                colorVariant="primary"
                                text={t('location.close')}
                                onClick={handleCloseModal}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}