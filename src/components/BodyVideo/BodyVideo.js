import './BodyVideo.scss';

export default function BodyVideo() {

    return (
        <>
            <div className='video'>
                <div className='video__youtube'>
                    <iframe
                        src='https://www.youtube.com/embed/C9tAiTOi_Iw'
                        frameborder='0'
                        width="853"
                        height="480"
                        allow='autoplay; encrypted-media'
                        allowfullscreen
                        title='video'
                    />
                </div>
            </div>
        </>
    )
}