import { IMAGES } from "../../data/images";

export default function PageHero() {
    return (
        <div 
            className="w-full h-40 tablet:h-60 desktop:h-80 bg-cover bg-center flex items-center px-4 tablet:px-8 desktop:px-40 relative"
            style={{ backgroundImage: `url(${IMAGES.HERO})` }}
        >
            {/* Overlay to dim the image (80% brightness simulation) */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* If you want text here, add it with relative z-10 */}
        </div>
    )
}