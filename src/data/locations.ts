import MainStore from '../assets/images/location-main.jpg';
import Agapita from '../assets/images/location-agapita.jpg';
import Shell from '../assets/images/location-shell.jpg';
import Pansol from '../assets/images/location-pansol.jpg';

export const LOCATIONS = [
    {
        id: 'main',
        name: "MAIN STORE",
        mapLink: "https://goo.gl/maps/5X7KQ3frkvcYXyMf9",
        image: MainStore,
        address: ["Lety's Buko Pie, National Road,", "Barangay Anos, Los Baños, Laguna", "(in front of Heaven's Memorial Garden)"],
        hours: "Open daily from 6am to 6pm"
    },
    {
        id: 'agapita',
        name: "AGAPITA BRANCH",
        mapLink: "https://goo.gl/maps/wQfUpTLt3cBWu29G6",
        image: Agapita,
        address: ["Lety's Buko Pie, Agapita Plaza,", "Barangay Batong Malake, Los Baños, Laguna", "(near UPLB)"],
        hours: "Open daily from 6am to 5pm"
    },
    {
        id: 'shell',
        name: "ANOS SHELL BRANCH",
        mapLink: "https://goo.gl/maps/cD73huCuXU57BXfb6",
        image: Shell,
        address: ["56JH+HPC, National Hwy,", "Barangay Anos, Los Baños, Laguna", "(beside Shell Gas Station)"],
        hours: "Open Fri, Sat, Sun ONLY from 6am to 6pm"
    },
    {
        id: 'pansol',
        name: "PANSOL BRANCH",
        mapLink: "https://goo.gl/maps/aTFtvHWEaH5N8i54A",
        image: Pansol,
        address: ["Lety’s Buko Pie, Pansol,", "Calamba City, Laguna", "(near Cuyab Resort)"],
        hours: "Open daily from 7am to 5pm"
    }
];