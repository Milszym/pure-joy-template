/** @jsxImportSource @emotion/react */
import { useTranslation } from "react-i18next"
import { withMyTheme } from "../../theme/theme"
import { css } from "@emotion/react"
import { mobileCss } from "../../theme/isMobile"
import { 
    Church, 
    CardGiftcard, 
    Restaurant, 
    Cake,
    MusicNote,
    PhotoCamera,
    AutoAwesome,
    LocalDining,
    Celebration,
    Fastfood,
} from "@mui/icons-material"

export const SCHEDULE_ID = "schedule"

const ScheduleContentStyle = withMyTheme((theme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    justify-content: center;
    height: 100vh;
    background: ${theme.palette.background.default};
    color: ${theme.palette.text.primary};
    ${mobileCss(`
        padding-top: 5vh;
        height: auto;
        width: 100vw;
    `)}
`)

const ScheduleTitleStyle = withMyTheme((theme) => css`
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.main};
    margin-bottom: 2rem;
    text-align: center;
    ${mobileCss(`
        font-size: clamp(2rem, 8vw, 3rem);
        margin-bottom: 1.5rem;
    `)}
`)

const ScheduleDescriptionStyle = withMyTheme((theme) => css`
    font-size: clamp(1rem, 1.5vw, 1.3rem);
    font-family: ${theme.typography.body1.fontFamily};
    color: ${theme.palette.text.primary};
    text-align: center;
    max-width: 800px;
    line-height: 1.6;
    margin-bottom: 3rem;
    ${mobileCss(`
        font-size: 1.1rem;
        margin-bottom: 2rem;
        max-width: 100%;
    `)}
`)

const ScheduleGridStyle = withMyTheme(() => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;
    gap: 2rem;
    max-width: 50vw;
    width: 100%;
    ${mobileCss(`
        grid-template-columns: 1fr;
        grid-template-rows: repeat(10, 1fr);
        grid-auto-flow: row;
        gap: 1.5rem;
        max-width: none;
        width: 85vw;
        margin-bottom: 5vh;
        padding-left: 5vw;
        padding-right: 5vw;
    `)}
`)

const ScheduleItemStyle = withMyTheme((theme) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: ${theme.palette.background.paper};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    ${mobileCss(`
        gap: 0.8rem;
        padding: 0.8rem;
    `)}
`)

const ScheduleIconStyle = withMyTheme((theme) => css`
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

const ScheduleContentItemStyle = withMyTheme(() => css`
    display: flex;
    flex-direction: column;
    flex: 1;
`)

const ScheduleTimeStyle = withMyTheme((theme) => css`
    font-size: 1.1rem;
    font-weight: 700;
    color: ${theme.palette.primary.main};
    font-family: ${theme.typography.body1.fontFamily};
    ${mobileCss(`
        font-size: 1rem;
    `)}
`)

const ScheduleEventStyle = withMyTheme((theme) => css`
    font-size: 0.95rem;
    color: ${theme.palette.text.primary};
    font-family: ${theme.typography.body1.fontFamily};
    margin-top: 0.2rem;
    ${mobileCss(`
        font-size: 0.9rem;
    `)}
`)

interface ScheduleItemProps {
    time: string;
    event: string;
    icon: React.ReactNode;
}

const ScheduleItem = ({ time, event, icon }: ScheduleItemProps) => (
    <div css={ScheduleItemStyle}>
        <div css={ScheduleIconStyle}>
            {icon}
        </div>
        <div css={ScheduleContentItemStyle}>
            <div css={ScheduleTimeStyle}>{time}</div>
            <div css={ScheduleEventStyle}>{event}</div>
        </div>
    </div>
)

export const Schedule = () => {
    const { t } = useTranslation()

    const scheduleItems = [
        { time: "16:30", event: t('schedule.scheduleEvent1'), icon: <Church /> },
        { time: "17:00", event: t('schedule.scheduleEvent2'), icon: <CardGiftcard /> },
        { time: "17:45", event: t('schedule.scheduleEvent3'), icon: <Restaurant /> },
        { time: "18:30", event: t('schedule.scheduleEvent4'), icon: <Cake /> },
        { time: "19:00", event: t('schedule.scheduleEvent5'), icon: <MusicNote /> },
        { time: "20:00", event: t('schedule.scheduleEvent6'), icon: <PhotoCamera /> },
        { time: "21:00", event: t('schedule.scheduleEvent7'), icon: <AutoAwesome /> },
        { time: "22:00", event: t('schedule.scheduleEvent8'), icon: <LocalDining /> },
        { time: "00:00", event: t('schedule.scheduleEvent9'), icon: <Celebration /> },
        { time: "01:00", event: t('schedule.scheduleEvent10'), icon: <Fastfood /> }
    ]

    return (
        <div id={SCHEDULE_ID} css={ScheduleContentStyle}>
            <div css={ScheduleTitleStyle}>
                {t('schedule.title')}
            </div>
            <div css={ScheduleDescriptionStyle}>
                {t('schedule.description')}
            </div>
            <div css={ScheduleGridStyle}>
                {scheduleItems.map((item, index) => (
                    <ScheduleItem 
                        key={index}
                        time={item.time}
                        event={item.event}
                        icon={item.icon}
                    />
                ))}
            </div>
        </div>
    )
}
