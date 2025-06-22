/** @jsxImportSource @emotion/react */
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {checkTable} from "../../../api/tablesApi";
import {funnyWeddingTableNames, LotteryText} from "./LotteryText";
import {showToast, ToastType} from "../../toast/toast/toast";
import {withMyTheme} from "../../theme/theme";
import {css} from "@emotion/react";
import {mobileCss} from "../../theme/isMobile";
import {tabletCss} from "../../theme/isTablet";
import {MyButton} from "../../components/button/MyButton";
import {MyInput} from "../../components/input/MyInput";
import {alpha} from "@mui/material/styles";

// @ts-ignore
const UNKNOWN_TABLE_NAME = "?"

const TablesContentStyle = withMyTheme(() => css`
    display: flex;
    background-image: url('/images/peach_background_50.jpg');
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 100vw;
    height: 100vh;
    gap: 1vh;
    ${mobileCss(`
        background-image: url('/images/peach_background_30.png');
    `)}
`)

const TablesTitleStyle = withMyTheme((theme) => css`
    font-size: clamp(2rem, 5vw, 5rem);
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.main};
    ${mobileCss(`
        font-size: clamp(2rem, 5vh, 5rem);
    `)}
`)

const TablesDescriptionStyle = withMyTheme((theme) => css`
    font-size: clamp(1rem, 1.5vw, 2.5rem);
    width: 65%;
    font-family: ${theme.typography.body1.fontFamily};
    font-weight: 200;
    text-align: center;
    color: black;
    ${mobileCss(`
        font-size: 1.2em;
        width: 85%;
    `)}
`)

const TablesInputStyle = withMyTheme(() => css`
    width: 35vw;
    display: flex;
    justify-items: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    ${tabletCss(`
        width: 55vw;
    `)}
    ${mobileCss(`
        width: 70vw;
    `)}
`)

const TablesInputTextStyle = withMyTheme((theme) => css`
    text-align: center;
    width: 100%;
    font-family: ${theme.typography.body1.fontFamily};
    background-color: ${theme.palette.background.paper};
    font-size: 1.3em;
`)

const TableResultStyle = withMyTheme(() => css`
    position: relative;
    margin-top: 2vh;
    display: inline-block;
    text-align: center;
    ${mobileCss(`
       margin-top: 1.5vh;
    `)}
`)

const TableNameStyle = withMyTheme((theme) => css`
    font-size: clamp(2.5rem, 5vw, 5rem);
    font-weight: 700;
    width: 100%;
    color: ${alpha(theme.palette.text.primary, 0.75)};
    position: absolute;
    font-family: ${theme.typography.h1.fontFamily};
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    ${mobileCss(`
        width: 100%;
    `)}
`)

const TableNameUnknownStyle = withMyTheme(() => css`
    opacity: 0.5;
    top: -5%;
    font-size: clamp(3.5rem, 7vw, 5rem);
`)

const TablesImageStyle = withMyTheme(() => css`
    height: 28vh;
    max-width: 85vw;
`)

const TablesButton = withMyTheme(() => css`
    margin-top: 2vh;
    font-size: 1.4rem;
    padding: .5rem 3vw;
    ${mobileCss(`
        padding: .5rem 8vw;
    `)}
`)

export const Tables = () => {

    const {t} = useTranslation()

    const [tableName, setTableName] = useState(UNKNOWN_TABLE_NAME)
    const [who, setWho] = useState('')
    const [loading, setLoading] = useState(false)


    const searchTable = async () => {
        searchFunnyRandomName()
        // enable once backend is ready
        // await searchTableApi()
    }

    const searchFunnyRandomName = () => {
        const randomWord = Math.floor(Math.random() * funnyWeddingTableNames.length)
        const funnyTableName = funnyWeddingTableNames[randomWord]
        setTableName(funnyTableName)
    }

    const searchTableApi = async () => {
        try {
            if (!validate()) {
                return
            }
            setLoading(true)
            const response = await checkTable(who);
            if (response.status == 404) {
                showTableError()
            } else {
                const body = await response.json()
                console.log('Successfully checked table', response.status, response.text, body);
                setTableName(body.tableName)
            }
        } catch (error) {
            showTableError(error)
        } finally {
            setLoading(false)
        }
    }

    const showTableError = (error?: any) => {
        showToast(t('tables.tableNotFound'), ToastType.ERROR);
        console.error('Could not check tables', error);
        setTableName(UNKNOWN_TABLE_NAME)
    }

    const validate = () => {
        if (who === '') {
            return false
        }
        return true
    }

    const onWhoChanged = (newWho: string) => {
        setWho(newWho)
        setTableName(UNKNOWN_TABLE_NAME)
    }

    return <section
        id="tables"
        css={TablesContentStyle}>
        <div css={TablesTitleStyle}>{t('tables.title')}</div>
        <br/>
        <div css={TablesDescriptionStyle}>
            {t('tables.description')}
        </div>
        <br/>
        <div css={TablesInputStyle}>
            <MyInput placeholder={t('tables.who')}
                     onChange={(value) => onWhoChanged(value)}
                     value={who}
                     additionalCss={TablesInputTextStyle}/>
        </div>
        <MyButton text={t('tables.search')} variant={"contained"} additionalCss={TablesButton} enabled={validate()}
                  onClick={searchTable}/>

        <br/>
        <div css={TableResultStyle}>
            <div css={[TableNameStyle, tableName === UNKNOWN_TABLE_NAME ? TableNameUnknownStyle : null]}>
                {tableName === UNKNOWN_TABLE_NAME ? tableName : <LotteryText text={tableName}/>}
            </div>
            <img css={TablesImageStyle} src="/images/table_icon_1.png"/>
        </div>
    </section>
}
