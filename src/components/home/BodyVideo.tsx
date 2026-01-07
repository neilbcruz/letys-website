export default function BodyVideo() {
    return (
        <div className="bg-black w-full flex justify-center py-4 tablet:px-8 desktop:px-40">
            <div className="w-full aspect-video relative">
                 <iframe 
                    className="w-full h-full absolute top-0 left-0"
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}