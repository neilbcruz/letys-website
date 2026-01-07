import { useState } from "react";
// import GoogleMaps from '../components/home/GoogleMaps';
import { LOCATIONS } from "../data/locations";
import { IMAGE_MAP } from "../data/images";

function isStoreOpen(hours: Partial<Record<'mon'|'tue'|'wed'|'thu'|'fri'|'sat'|'sun', [string,string]>>): boolean {
    const now = new Date();
    const days = ['sun','mon','tue','wed','thu','fri','sat'] as const;
    const day = days[now.getDay()];

    const today = hours[day];
    if (!today) return false; // closed today

    const [openStr, closeStr] = today;
    const [openH, openM] = openStr.split(':').map(Number);
    const [closeH, closeM] = closeStr.split(':').map(Number);

    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    return nowMinutes >= openMinutes && nowMinutes <= closeMinutes;
}


function formatTimeRange([open, close]: [string,string]) {
    // Convert 24h to 12h format
    const to12 = (t: string) => {
        const [h,m] = t.split(":").map(Number);
        const ampm = h >= 12 ? "PM" : "AM";
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        return `${hour12}:${m.toString().padStart(2,'0')}${ampm}`;
    };
    return `${to12(open)}-${to12(close)}`;
}

export default function LocationsPage() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const dayKeys = ["mon","tue","wed","thu","fri","sat","sun"];

    return (
        <div className="w-full text-center">
            <div className="bg-primary-3 p-4 mb-4 tablet:px-8 desktop:px-40">
                <h1 className="text-primary-2 font-bold text-2xl">Locations</h1>
            </div>

            <div className="px-4 pt-4 tablet:px-8 desktop:px-40 tablet:flex tablet:flex-wrap tablet:justify-between tablet:gap-4">
                {LOCATIONS.map(loc => {
                    const now = new Date();
                    const todayKey = dayKeys[now.getDay()];
                    const isOpen = isStoreOpen(loc.hours);
                    const todayHours = formatTimeRange(loc.hours[todayKey]);

                    return (
                        <div key={loc.id} className="py-4 border-t border-primary-2 tablet:border-none w-full tablet:w-[48%] desktop:w-[22%] text-left">
                            <h2 className="text-primary-2 font-bold text-lg cursor-pointer hover:text-secondary-1 mb-2" 
                                onClick={() => window.open(loc.mapLink, "_blank")}>
                                {loc.name}
                            </h2>

                            <div className="text-sm font-bold text-gray-700 mb-2">
                                {loc.address.map((line, i) => <p key={i}>{line}</p>)}
                            </div>

                            <img
                                src={IMAGE_MAP[loc.image]}
                                alt={loc.name}
                                className="w-full h-auto mt-2 object-cover cursor-pointer tablet:h-56 desktop:h-64 hover:opacity-90 transition mb-2"
                                onClick={() => window.open(loc.mapLink, "_blank")}
                            />

                            <div className="text-sm font-bold mb-2">
                                <p>
                                    Today ({days[now.getDay()]}): {todayHours} - 
                                    <span className={`ml-2 ${isOpen ? "text-green-600" : "text-red-600"}`}>
                                        {isOpen ? "Open" : "Closed"}
                                    </span>
                                </p>

                                {expanded[loc.id] && (
                                    <div className="mt-1 text-gray-600 text-left">
                                        {days.map((d, i) => (
                                            <p key={i}>{d}: {formatTimeRange(loc.hours[dayKeys[i]])}</p>
                                        ))}
                                    </div>
                                )}

                                <button 
                                    className="mt-1 text-xs text-blue-500 hover:underline"
                                    onClick={() => toggleExpand(loc.id)}
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
