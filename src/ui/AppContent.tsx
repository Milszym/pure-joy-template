import {Title} from "./landing/title/Title";
import {Location} from "./landing/location/Location";
import {Faq} from "./landing/faq/Faq";
import {WeddingWitnesses} from "./landing/weddingWitnesses/WeddingWitnesses";
import {Memories} from "./landing/memories/Memories";
import {Rsvp} from "./landing/rsvp/Rsvp";
import {Toaster} from "react-hot-toast";

export const AppContent = () => {
    return <>
        {/* <Navigation /> */}
        <Title/>
        <Location/>
        <Faq/>
        <WeddingWitnesses/>
        <Memories/>
        <Rsvp/>
        {/* <Tables /> */}

        <Toaster/>
    </>
}