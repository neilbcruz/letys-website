import { useState } from "react";
import { LOCATIONS } from "@/data/locations";
import type { Location } from "@/data/locations";
import { IMAGE_MAP, type ImageSet } from "@/lib/images";
import LocationsMap from "@/components/ui/LocationMap";

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAY_KEYS: (keyof Location["hours"])[] = ["sun","mon","tue","wed","thu","fri","sat"];

function isStoreOpen(hours: Location["hours"]) {
  const now = new Date();
  const todayKey = DAY_KEYS[now.getDay()];
  const [openStr, closeStr] = hours[todayKey];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = openStr.split(":").map(Number);
  const [closeH, closeM] = closeStr.split(":").map(Number);
  return nowMinutes >= openH * 60 + openM && nowMinutes <= closeH * 60 + closeM;
}

function formatTime([open, close]: [string,string]) {
  const to12 = (t: string) => {
    const [h,m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2,"0")}${ampm}`;
  };
  return `${to12(open)}-${to12(close)}`;
}

export default function LocationsPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  // Safety check
  if (!LOCATIONS || LOCATIONS.length === 0) {
    return <div>No locations available</div>;
  }

  return (
    <div className="w-full text-center">
      <div className="bg-primary-3 p-4 mb-4 tablet:px-8 desktop:px-40">
        <h1 className="text-primary-2 font-bold text-2xl">Locations</h1>
      </div>

      {/* Map */}
      <div className="px-4 tablet:px-8 desktop:px-40 mb-4">
        <LocationsMap
          locations={LOCATIONS}
          activeLocation={activeLocation}
          setActiveLocation={setActiveLocation}
        />
      </div>

      {/* Location cards */}
      <div className="px-4 pt-4 tablet:px-8 desktop:px-40 tablet:flex tablet:flex-wrap tablet:justify-between tablet:gap-4">
        {LOCATIONS.map(loc => {
          const now = new Date();
          const todayKey = DAY_KEYS[now.getDay()];
          const isOpen = isStoreOpen(loc.hours);
          const imageData: ImageSet | undefined = IMAGE_MAP[loc.image];
          if (!imageData) return null;

          const isActive = activeLocation === loc.id;

          return (
            <div
              key={loc.id}
              className={`py-4 border-t border-primary-2 tablet:border-none w-full tablet:w-[48%] desktop:w-[22%] text-left cursor-pointer
                ${isActive ? "bg-yellow-50" : ""}`}
              onClick={() => setActiveLocation(loc.id)}
            >
              <h2
                className="text-primary-2 font-bold text-lg hover:text-secondary-1 mb-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(loc.mapLink, "_blank");
                }}
              >
                {loc.name}
              </h2>

              <div className="text-sm font-bold text-gray-700 mb-2">
                {loc.address.map((line,i) => <p key={i}>{line}</p>)}
              </div>

              <img
                src={imageData.default}
                srcSet={imageData.srcSet}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 22vw"
                alt={loc.name}
                className="w-full h-auto mt-2 object-cover cursor-pointer rounded-md tablet:h-56 desktop:h-64 hover:opacity-90 transition mb-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(loc.mapLink, "_blank");
                }}
              />

              <div className="text-sm font-bold mb-2">
                <p>
                  Today ({DAYS[now.getDay()]}): {formatTime(loc.hours[todayKey])} - 
                  <span className={`ml-2 ${isOpen ? "text-green-600" : "text-red-600"}`}>
                    {isOpen ? "Open" : "Closed"}
                  </span>
                </p>

                {expanded[loc.id] && (
                  <div className="mt-1 text-gray-600 text-left">
                    {DAY_KEYS.map((key, i) => (
                      <p key={key}>{DAYS[i]}: {formatTime(loc.hours[key])}</p>
                    ))}
                  </div>
                )}

                <button 
                  className="mt-1 text-xs text-blue-500 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(prev => ({...prev, [loc.id]: !prev[loc.id]}));
                  }}
                >
                  {expanded[loc.id] ? "Hide full hours" : "Show full hours"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}