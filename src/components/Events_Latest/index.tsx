import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { withTranslation } from "react-i18next";
import { HomePageStartBlockProps } from "./types";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYbTOTqUajcIkd8oCvpEadFt7RyvBjfng",
  authDomain: "loyola-institute-website.firebaseapp.com",
  projectId: "loyola-institute-website",
  storageBucket: "loyola-institute-website.firebasestorage.app",
  messagingSenderId: "402915219080",
  appId: "1:402915219080:web:7ea779b21ce69e4829313d",
  measurementId: "G-M5X9CS51T0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface EventItem {
  id: string;
  event_date: string;
  event_description: string;
}

const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const EventsLatestStartBlock = ({
  videourl,
  t,
  id,
  direction,
}: HomePageStartBlockProps) => {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events_and_notifications");
      const eventSnapshot = await getDocs(eventsCollection);
      const eventsList = eventSnapshot.docs.map(doc => ({
        id: doc.id,
        event_date: doc.data().event_date || "",
        event_description: (doc.data().event_description || "").replace(/^"|"$/g, "")
      }));

      const sortedEvents = eventsList.sort((a, b) => parseDate(b.event_date).getTime() - parseDate(a.event_date).getTime());
      setEvents(sortedEvents);
      console.log(sortedEvents);
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-12 bg-white">
      <Fade direction={direction} triggerOnce>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id={id}>
            <div className="flex flex-col justify-center space-y-6">
              <h6 className="text-2xl font-extrabold font-mono" style={{ color: "#414886" }}>
                {t("Events and Notifications")}
              </h6>
              <div className="border-2 border-black">
                {events.map((item) => (
                  <div key={item.id} className="flex border-b border-gray-500 p-2">
                    <span className="text-lg font-medium w-1/4 pr-2">{item.event_date}</span>
                    <span className="text-black text-base pl-4 w-3/4" dangerouslySetInnerHTML={{ __html: item.event_description }}></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <iframe
                className="w-10/12 sm:h-80 lg:h-96 rounded-md shadow-lg h-5/6"
                src="https://www.youtube.com/embed/fFXliHpgBiU?si=DZEVfNHegdz-Wbdm&amp;start=98"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              />
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default withTranslation()(EventsLatestStartBlock);
