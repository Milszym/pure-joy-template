import {Title} from "./landing/title/Title";
import {Location} from "./landing/location/Location";
import {Faq} from "./landing/faq/Faq";
import {WeddingWitnesses} from "./landing/weddingWitnesses/WeddingWitnesses";
import {Memories} from "./landing/memories/Memories";
import {Rsvp} from "./landing/rsvp/Rsvp";
import {Toaster} from "react-hot-toast";
import {Tables} from "./landing/tables/Tables";
import { Schedule } from "./landing/schedule/Schedule";
import { Menu } from "./landing/menu/Menu";
import { FloatingButtons } from "./components/FloatingButtons";

export const AppContent = () => {
    return <>
        {/* <Navigation /> */}
        <Title/>
        <Location/>
        <Faq/>
        <WeddingWitnesses/>
        <Memories/>
        <Rsvp/>
        <Tables/>
        <Schedule/>
        <Menu />

        <FloatingButtons />
        <Toaster/>
    </>
}