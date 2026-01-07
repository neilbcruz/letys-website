export interface Location {
    id: string;
    name: string;
    mapLink: string;
    image: string;
    address: string[];
    hours: Partial<Record<'mon'|'tue'|'wed'|'thu'|'fri'|'sat'|'sun', [string,string]>>;
}

export const LOCATIONS = [
    {
        id: 'main',
        name: "MAIN STORE",
        mapLink: "https://goo.gl/maps/6v5HKFPuKa7StZoMA",
        image: "location-main",
        address: [
            "Lety's Buko Pie, National Road,", 
            "Barangay Anos, Los Baños, Laguna", 
            "(in front of Heaven's Memorial Garden)"
        ],
        hours: {
            mon: ["06:00","18:00"],
            tue: ["06:00","18:00"],
            wed: ["06:00","18:00"],
            thu: ["06:00","18:00"],
            fri: ["06:00","18:00"],
            sat: ["06:00","18:00"],
            sun: ["06:00","18:00"]
        }
    },
    {
        id: 'shell',
        name: "ANOS SHELL BRANCH",
        mapLink: "https://maps.app.goo.gl/sJpTk76p5udHyA6b8",
        image: "location-shell",
        address: [
            "56JH+HPC, National Hwy,", 
            "Barangay Anos, Los Baños, Laguna", 
            "(beside Shell Gas Station)"
        ],
        hours: {
            mon: ["07:00","16:00"],
            tue: ["07:00","16:00"],
            wed: ["07:00","16:00"],
            thu: ["07:00","16:00"],
            fri: ["07:00","16:00"],
            sat: ["07:00","16:00"],
            sun: ["07:00","16:00"]
        }
    },
    {
        id: 'agapita',
        name: "AGAPITA BRANCH",
        mapLink: "https://goo.gl/maps/TX86xgAPRUh7VyRm8",
        image: "location-agapita",
        address: [
            "Lety's Buko Pie, Agapita Plaza,", 
            "Barangay Umali, Los Baños, Laguna", 
            "(near UPLB)"
        ],
        hours: {
            mon: ["06:00","18:00"],
            tue: ["06:00","18:00"],
            wed: ["06:00","18:00"],
            thu: ["06:00","18:00"],
            fri: ["06:00","18:00"],
            sat: ["06:00","18:00"],
            sun: ["06:00","18:00"]
        }
    },
    {
        id: 'pansol',
        name: "PANSOL BRANCH",
        mapLink: "https://goo.gl/maps/n4piamTpgqPmFqpH6",
        image: "location-pansol",
        address: [
            "Lety’s Buko Pie, Pansol,", 
            "Calamba City, Laguna", 
            "(near Cuyab Resort)"
        ],
        hours: {
            mon: ["07:30","17:30"],
            tue: ["07:30","17:30"],
            wed: ["07:30","17:30"],
            thu: ["07:30","17:30"],
            fri: ["07:30","17:30"],
            sat: ["07:30","17:30"],
            sun: ["07:30","17:30"]
        }
    }
];
