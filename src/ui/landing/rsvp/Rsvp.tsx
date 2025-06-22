/** @jsxImportSource @emotion/react */
import {useState} from "react";
import emailjs from "emailjs-com";
import {useTranslation} from "react-i18next";
import {MainConfig} from "../../../config/MainConfig";
import {showToast, ToastPosition, ToastType} from "../../toast/toast/toast";
import {withMyTheme} from "../../theme/theme";
import {css} from "@emotion/react";
import {tabletCss} from "../../theme/isTablet";
import {mobileCss} from "../../theme/isMobile";
import {Fullscreen} from "../../components/Fullscreen";
import {MyInput} from "../../components/input/MyInput";
import {MyButton} from "../../components/button/MyButton";
import { isTodayBefore } from '../../util/dateUtils';

const RsvpContent = withMyTheme(() => css`
    display: flex;
    background-image: url('/images/peach_background_50.jpg');
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 100vw;
    height: 100vh;
    ${mobileCss(`
        background-image: url('/images/peach_background_30.png');
    `)}
`)

const RsvpTitle = withMyTheme((theme) => css`
    font-size: clamp(2rem, 5vw, 5rem);
    color: ${theme.palette.primary.main};
    font-family: ${theme.typography.h1.fontFamily};
    ${mobileCss(`
        font-size:clamp(2rem, 5vh, 5rem);
    `)}
`)

const RsvpDescription = withMyTheme((theme) => css`
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

const RsvpInputs = withMyTheme(() => css`
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

const RsvpInputText = withMyTheme((theme) => css`
    width: 100%;
    font-family: ${theme.typography.body1.fontFamily};
    font-size: 1.5rem;
    background-color: ${theme.palette.background.paper};
`)

const RsvpButton = withMyTheme(() => css`
    margin-top: 2vh;
    font-size: 1.4rem;
    padding: .5rem 3vw;
    ${mobileCss(`
        padding: .5rem 8vw;
    `)}
`)

const RsvpOurContacts = withMyTheme(() => css`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 13vw;
    ${mobileCss(`
        justify-content: space-evenly;
        width: 90vw;
    `)}
`)

const RsvpOurContact = withMyTheme((theme) => css`
    font-family: ${theme.typography.body1.fontFamily};
    font-weight: 200;
    font-size: 1.7em;
    color: black;
    ${mobileCss(`
       font-size:1.3em;
    `)}
`)

const RsvpPhone = withMyTheme((theme) => css`
    font-weight: 500;
    cursor: pointer;
    font-family: ${theme.typography.body1.fontFamily};
    color: ${theme.palette.primary.main};
`)

const RsvpThankYouTitle = withMyTheme((theme) => css`
    font-size: clamp(1rem, 3vw, 6rem);
    font-family: ${theme.typography.h1.fontFamily};
    color: ${theme.palette.primary.main};
    ${mobileCss(`
        font-size:clamp(1rem, 10vw, 6rem);
    `)}
`)

export const Rsvp = () => {

    const {t} = useTranslation()

    const [who, setWho] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const [sendEnabled, setSendEnabled] = useState(true)

    // Only show RSVP if today is before June 26, 2025
    const rsvpOpen = isTodayBefore('2025-07-01');

    const sendEmail = async () => {
        if (!validate()) {
            return
        }
        setSendEnabled(false)
        const serviceID = 'service_d4bc9kv';
        const templateID = 'template_ri7qxkn';
        const templateParams = {
            the_from: who,
            the_email: email,
            the_message: message,
        };

        try {
            const response = await emailjs.send(serviceID, templateID, templateParams);
            console.log('Email successfully sent', response.status, response.text);
            showToast('Pomyślnie wysłano wiadomość. Dziękujemy i do zobaczenia!', ToastType.SUCCESS);
            setEmailSent(true)
        } catch (error) {
            showToast('Niestety nie udało się wysłać wiadomości. Spróbuj później lub zadzwoń do nas osobiście :)', ToastType.ERROR);
            console.error('Could not send email', error);
        } finally {
            setSendEnabled(true)
        }
    }

    const validate = () => {
        if (who === '' || message === '' || email === '') {
            showToast(t('rsvp.formNotFilledError'), ToastType.ERROR, ToastPosition.BOTTOM_CENTER);
            return false
        }
        return true
    }

    const onWhoChanged = (newWho: string) => {
        setWho(newWho)
    }

    const onMessageChanged = (newMessage: string) => {
        setMessage(newMessage)
    }

    const onEmailChanged = (newEmail: string) => {
        setEmail(newEmail)
    }

    return rsvpOpen ? <Fullscreen id="rsvp" additionalCss={RsvpContent}>
        <div css={RsvpTitle}>{t('rsvp.title')}</div>
        <br/>
            <div css={RsvpDescription}>
                {t('rsvp.description1')}
                <br/><br/>
                {t('rsvp.description2')}
            </div>
            <br/>
            {!emailSent ? <>
                <div css={RsvpInputs}>
                    <MyInput placeholder={t('rsvp.who')}
                             onChange={(value) => onWhoChanged(value)}
                             value={who}
                             additionalCss={RsvpInputText}/>
                    <br/>
                    <MyInput additionalCss={RsvpInputText}
                             multiline
                             rows={3}
                             value={message}
                             placeholder={t('rsvp.message')}
                             onChange={(value) => onMessageChanged(value)} />
                    <br/>
                    <MyInput placeholder={t('rsvp.email')}
                             value={email}
                             type="email"
                             autoComplete="email"
                             onChange={(value) => onEmailChanged(value)}
                             additionalCss={RsvpInputText}/>
                </div>
                <MyButton text={t('rsvp.send')} variant={"contained"} additionalCss={RsvpButton} enabled={sendEnabled} onClick={sendEmail}/>
            </> : <div css={RsvpThankYouTitle}>
                {t('rsvp.thankYou')}!
            </div>}
            <br/>
            <div css={RsvpOurContacts}>
                <div css={RsvpOurContact}>
                    {t('rsvp.firstName')} <PhoneNumber phoneNumber={MainConfig.rsvp.firstPhoneNumber}/>
                </div>
                <div css={RsvpOurContact}>
                    {t('rsvp.secondName')} <PhoneNumber phoneNumber={MainConfig.rsvp.secondPhoneNumber}/>
                </div>
            </div>
    </Fullscreen> : <></>
}

const PhoneNumber = (props: { phoneNumber: string }) => {
    const callNumber = (phoneNumber: string) => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return <span css={RsvpPhone} onClick={() => callNumber(props.phoneNumber)}>
        {props.phoneNumber}
    </span>
}