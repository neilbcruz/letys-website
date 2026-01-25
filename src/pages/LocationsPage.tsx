import { useState } from "react";
import { LOCATIONS } from "@/data/locations";
import type { Location } from "@/data/locations";
import { IMAGE_MAP, type ImageSet } from "@/lib/images";
import LocationsMap from "@/components/ui/LocationMap";
import { MapPin, Clock, ExternalLink } from "lucide-react";

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
    return `${hour12}:${m.toString().padStart(2,"0")} ${ampm}`;
  };
  return `${to12(open)} - ${to12(close)}`;
}

export default function LocationsPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  if (!LOCATIONS || LOCATIONS.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">No locations available at this time.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-br from-primary-2 to-primary-3 text-white py-12 lg:py-16">
        <div className="container-width text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Locations</h1>
          <p className="text-xl lg:text-2xl">Visit us at any of our convenient branches across Laguna</p>
        </div>
      </div>

      {/* Map Section */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <h2 className="heading-secondary text-center mb-8">Find Us on the Map</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl" role="region" aria-label="Interactive map of store locations">
            <LocationsMap
              locations={LOCATIONS}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
            />
          </div>
        </div>
      </section>

      {/* Location Cards */}
      <section className="section-padding bg-linear-to-b from-white to-gray-50">
        <div className="container-width">
          <h2 className="heading-secondary text-center mb-12">All Branches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {LOCATIONS.map(loc => {
              const now = new Date();
              const todayKey = DAY_KEYS[now.getDay()];
              const isOpen = isStoreOpen(loc.hours);
              const imageData: ImageSet | undefined = IMAGE_MAP[loc.image];
              if (!imageData) return null;

              const isActive = activeLocation === loc.id;

              return (
                <article
                  key={loc.id}
                  className={`card-elevated overflow-hidden cursor-pointer transform hover:scale-105 transition-all
                    ${isActive ? "ring-4 ring-primary-1" : ""}`}
                  onClick={() => setActiveLocation(loc.id === activeLocation ? null : loc.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${loc.name} location details`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLocation(loc.id === activeLocation ? null : loc.id);
                    }
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={imageData.default}
                      srcSet={imageData.srcSet}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      alt={`${loc.name} storefront`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}>
                        {isOpen ? "Open Now" : "Closed"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-2 mb-3 flex items-center justify-between">
                      {loc.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(loc.mapLink, "_blank", "noopener,noreferrer");
                        }}
                        className="text-primary-1 hover:text-primary-3 transition-colors"
                        aria-label={`View ${loc.name} on Google Maps`}
                      >
                        <ExternalLink size={20} />
                      </button>
                    </h3>

                    {/* Address */}
                    <div className="mb-4">
                      <div className="flex items-start gap-2 text-gray-700">
                        <MapPin size={18} className="mt-1 shrink-0 text-primary-2" aria-hidden="true" />
                        <address className="text-sm not-italic">
                          {loc.address.map((line, i) => (
                            <span key={i} className="block">{line}</span>
                          ))}
                        </address>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <Clock size={18} className="mt-1 shrink-0 text-primary-2" aria-hidden="true" />
                        <div className="text-sm">
                          <p className="font-bold text-gray-900">
                            Today ({DAYS[now.getDay()]}): {formatTime(loc.hours[todayKey])}
                          </p>
                          
                          {expanded[loc.id] && (
                            <div className="mt-3 space-y-1 text-gray-600">
                              {DAY_KEYS.map((key, i) => (
                                <p key={key} className="flex justify-between">
                                  <span className="font-medium">{DAYS[i]}:</span>
                                  <span>{formatTime(loc.hours[key])}</span>
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      className="text-sm text-primary-2 font-bold hover:text-primary-1 underline focus:outline-none focus:ring-2 focus:ring-primary-1 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(prev => ({...prev, [loc.id]: !prev[loc.id]}));
                      }}
                      aria-expanded={expanded[loc.id]}
                      aria-controls={`hours-${loc.id}`}
                    >
                      {expanded[loc.id] ? "Hide full hours" : "Show full hours"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}