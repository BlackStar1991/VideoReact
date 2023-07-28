import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';

import videoSource from "./videos/start_long_1024x1366.mp4"
// const videoSource = 'https://savelife.in.ua/wp-content/themes/savelife/assets/landing-army-support-assets/media/start_long_1024x1366.mp4';


const VideoPlayer = ({ src }) => {
    const videoRef = useRef(null);
    const [videoKey, setVideoKey] = useState(0); // Add state for the key

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            videoElement.addEventListener('ended', handleVideoEnded);
            videoElement.play().catch((error) => {
                console.log('Auto-play failed:', error);
            });
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('ended', handleVideoEnded);
            }
        };
    }, [videoKey]); // Listen for changes in the videoKey instead of src

    useEffect(() => {
        if (videoRef.current) {
            // Pause the video and reset currentTime when the source changes
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            setVideoKey((prevKey) => prevKey + 1); // Increment the videoKey to force re-mount
        }
    }, [src]);

    const handleVideoEnded = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <div className="video_container">
            <video key={videoKey} className="video_block" ref={videoRef} autoPlay loop muted>
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
};

const BulletList = ({currentData}) => {


    const fieldsToShow = ["Quantity", "Calibre", "Firing range", "Weight"];

    return (
        <ul className="bl_descr">
            {fieldsToShow.map((field) => (
                <li key={field} className="bl_descr__item">
                    {`${field}: ${currentData[field]}`}
                </li>
            ))}
        </ul>

    );
};


function App() {

    const data = [
        {
            "id": "0",
            "Name": "40-mm grenade launcher",
            "ImageURL": "https://okozaoko.okko.ua/img/40mm.b2ac114d.webp",
            "Quantity": "100 pcs.",
            "Calibre": "40x53-mm",
            "Firing range": "2200 meters",
            "Weight": "31 kg",
            "VideoURL": "https://okozaoko.okko.ua/media/MK_19.4f818f8a.mp4"
        },
        {
            "id": "1",
            "Name": "Machine gun",
            "ImageURL": "https://okozaoko.okko.ua/img/dhk.da85433f.webp",
            "Quantity": "200 pcs.",
            "Calibre": "12.7х108",
            "Firing range": "3500 meters",
            "Weight": "30-33 kg",
            "VideoURL": "https://okozaoko.okko.ua/media/DSHKM.3ac7b773.mp4"
        },
        {
            "id": "2",
            "Name": "82-mm mortar",
            "ImageURL": "https://okozaoko.okko.ua/img/minomet.6b75401d.webp",
            "Quantity": "300 pcs.",
            "Calibre": "82-mm",
            "Firing range": "4100 meters",
            "Weight": "44 kg",
            "VideoURL": "https://okozaoko.okko.ua/media/2023.03.28_minomet_11_sec.1b96a35f.mp4"
        }
    ];

    const [currentId, setCurrentId] = useState("0");
    const [currentVideo, setCurrentVideo] = useState(videoSource);

    const handleButtonClick = (newId) => {
        setCurrentId(newId);
        const selectedVideo = data.find((item) => item.id === newId);
        if (selectedVideo) {
            setCurrentVideo(selectedVideo["VideoURL"]);
        }
    };

    const currentData = data.find(item => item.id === currentId);
    const BlockList = ({ data, handleButtonClick }) => {
        return (
            <div className="bl_list">
                {data.map((item) => (
                    <button key={item.id}
                            className={`button_element ${currentId === item.id ? "active" : ""}`}
                            type="button"
                            onClick={() => handleButtonClick(item.id)}>
                        <img src={item.ImageURL} width="300" height="200" alt={item.Name}/>
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="field">
            <VideoPlayer src={currentVideo} />
            <div className="bl_full">
                <h1 className='bl_title'>We arm the fighters</h1>
                <p className='bl_paragraf'>Our goal is to raise 400 million UAH for mortars, heavy machine guns and
                    automatic grenade launchers for the Territorial Defence Forces of Ukraine</p>
                <BlockList data={data} handleButtonClick={handleButtonClick}/>
                <div className="bl_under">
                    <BulletList currentData={currentData}/>
                    <div className="bl_support">
                        <span>support</span>
                        <div className="decor"></div>
                    </div>
                    <a href="https://okozaoko.okko.ua/en/" rel="nofollow noopener noreferrer" target="_blank">
                        <svg className="bl_svg" xmlns="http://www.w3.org/2000/svg" width="130" height="65"  viewBox="0 0 130 65">
                            <path d="M0 0h130v65H0z"
                                  fill="none"/>
                            <path d="M130 0H0v39h26v26h78V39h26V0z" fill="#fff"/>
                            <path d="M21.8 13.1c-.9.1-1.7.5-2.3 1.1-.6-.7-1.4-1.1-2.3-1.1-1-.1-2.1.2-2.9 1-1.4 1.3-1.6 3.5-.5 5l5.7 7.5 5.7-7.5c1.2-1.5 1-3.7-.5-5-.8-.8-1.8-1.1-2.9-1zm1.9 4.8-4.2 5.6-4.2-5.6c-.6-.8-.5-1.9.2-2.5.4-.3.8-.5 1.3-.5h.2c.5.1 1 .3 1.4.8l1.2 1.6 1.2-1.6c.3-.4.8-.7 1.4-.8s1.1.1 1.5.5c.5.6.6 1.7 0 2.5zM47.5 21.6v.7c0 .4-.1.8-.1 1.2-.1.4-.2.7-.5 1-.2.3-.5.5-.9.7-.4.2-.9.3-1.5.3s-1.1-.1-1.5-.3c-.4-.2-.7-.4-.9-.7-.2-.3-.4-.6-.4-1-.1-.4-.1-.8-.1-1.2v-5.4c0-.4.1-.9.1-1.2.1-.4.2-.7.4-1s.5-.5.9-.7 1-.3 1.5-.3c.6 0 1.1.1 1.5.3s.7.4.9.7c.2.3.4.6.5 1 .1.4.1.8.1 1.2v.6h-1.9v-1.1c0-.2-.1-.3-.2-.4l-.3-.3c-.1-.1-.3-.1-.5-.1s-.4.1-.6.1c-.2.1-.2.2-.3.3s-.1.3-.2.5V23c0 .2.1.3.1.5.1.1.2.3.3.3.1.1.3.1.6.1.2 0 .4 0 .5-.1l.3-.3c.1-.1.1-.3.2-.4 0-.2.1-.3.1-.5v-.7l1.9-.3zM52.7 13.6c.6 0 1.1.1 1.5.3s.7.4.9.7.4.7.4 1c.1.4.1.8.1 1.2v5.4c0 .4-.1.9-.1 1.2-.1.4-.2.8-.5 1-.2.3-.5.5-.9.7-.4.2-.9.3-1.5.3s-1.1-.1-1.5-.3c-.4-.2-.7-.4-.9-.7-.2-.3-.4-.6-.5-1-.1-.4-.1-.8-.1-1.2v-5.4c0-.4.1-.9.1-1.2.1-.4.2-.7.5-1 .2-.3.5-.5.9-.7.5-.2 1-.3 1.6-.3zm0 10.1c.3 0 .4-.1.6-.1l.3-.3c.1-.1.1-.3.1-.5v-6.5c0-.2-.1-.3-.1-.5-.1-.1-.2-.3-.3-.3-.1-.1-.3-.1-.6-.1h-.1c-.2 0-.4.1-.5.1l-.3.3c-.1.1-.1.3-.1.5v6.5c0 .2.1.3.1.5.1.1.2.3.3.3.1.1.3.1.6.1zM60 16.7l.1 8.6h-1.8V13.7h2.5l1.6 7 1.6-7h2.5v11.6h-1.8l.1-8.5-1.6 7.1h-1.7L60 16.7zM69.3 25.3V13.7h5.2v1.7h-3.3v3.1h2.7v1.7h-2.7v3.3h3.3v1.7l-5.2.1zM86.9 22.3c0 .5-.1 1-.2 1.4-.1.4-.3.7-.5.9-.3.2-.5.4-.9.5s-.8.2-1.3.2h-3V13.7h2.9c.5 0 .9.1 1.3.2s.7.3.9.5.4.5.5.8c.1.3.2.7.2 1.1v.7c0 .6-.1 1.1-.3 1.4-.2.4-.5.6-.9.7.4.1.7.3.9.7.2.4.3.8.3 1.4v1.1zm-2.1-5.8c0-.2 0-.3-.1-.5 0-.1-.1-.3-.2-.4-.1-.1-.2-.2-.3-.2-.1-.1-.3-.1-.5-.1h-1v3h.8c.2 0 .4 0 .5-.1.2-.1.3-.1.4-.2.1-.1.2-.2.2-.4s.1-.3.1-.5v-.6zm.2 4.7c0-.2 0-.3-.1-.4-.1-.1-.1-.3-.2-.4-.1-.1-.2-.2-.3-.2-.1-.1-.3-.1-.5-.1h-1v3.5h1c.2 0 .3 0 .5-.1.1 0 .3-.1.3-.2.1-.1.2-.2.2-.4.1-.2.1-.4.1-.6v-1.1zM90.7 13.7h2.6l2.1 11.6h-1.9l-.3-2.1h-2.3l-.3 2.1h-1.9l2-11.6zm.4 7.9h1.8l-.9-5.9-.9 5.9zM103.3 21.6v.7c0 .4-.1.8-.1 1.2-.1.4-.2.7-.5 1-.2.3-.5.5-.9.7-.4.2-.9.3-1.5.3s-1.1-.1-1.5-.3c-.4-.2-.7-.4-.9-.7s-.4-.6-.4-1c-.1-.4-.1-.8-.1-1.2v-5.4c0-.4.1-.9.1-1.2.1-.4.2-.7.4-1s.5-.5.9-.7c.4-.2.9-.3 1.5-.3s1.1.1 1.5.3.7.4.9.7c.2.3.4.6.5 1 .1.4.1.8.1 1.2v.6h-1.9v-1.1c0-.2-.1-.3-.2-.4l-.3-.3c-.1-.1-.3-.1-.5-.1s-.4.1-.6.1-.2.2-.3.3c-.1.1-.1.3-.2.5V23c0 .2.1.3.1.5.1.1.2.3.3.3.1.1.3.1.6.1.2 0 .4 0 .5-.1l.3-.3c.1-.1.1-.3.2-.4s.1-.3.1-.5v-.7l1.9-.3zM105.8 25.3V13.7h1.9v4.9h.7l1.8-4.9h2.1l-2.1 5.7 2.2 5.9h-2.1l-1.9-5h-.8v5h-1.8zM43.7 39.8h2.6l2.1 11.6h-2l-.3-2.1h-2.3l-.3 2.1h-1.9l2.1-11.6zm.3 7.9h1.8l-.8-5.9-1 5.9zM50.3 51.4V39.8h1.9v9.9h3.1v1.7h-5zM57.4 51.4V39.8h1.9v11.6h-1.9zM68.2 39.8 66 51.4h-2.6l-2.1-11.6h1.9l1.5 9.6 1.5-9.6h2zM69.8 51.4V39.8H75v1.7h-3.3v3.1h2.7v1.7h-2.7v3.3H75v1.7l-5.2.1z"/>
                            <defs>
                                <filter id="a" width="15.4" height="26" x="82.1" y="32" filterUnits="userSpaceOnUse"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter>
                            </defs>
                            <mask id="b" width="15.4" height="26" x="82.1" y="32" maskUnits="userSpaceOnUse"><path d="M96.6 33.4H83v24.2h13.6V33.4z" fill="#fff" filter="url(#a)" /></mask>
                            <g mask="url(#b)">
                                <path d="M97.5 32H82.1v26h15.4V32z" fill="#fdd901" />
                                <path d="M97.5 32.5H82.1v13h15.4v-13z" fill="#0068ff" />
                            </g>
                            <path d="M5.6 5.6v27.8h26v26h66.8v-26h26V5.6H5.6zm26 26H7.4V7.4h24.2v24.2zm1.8 1.8h47.8v24.2H33.4V33.4zm63.2 24.2H83V33.4h13.6v24.2zm26-26H33.4V7.4h89.2v24.2z"/>
                        </svg>
                    </a>
                </div>

            </div>
        </div>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);

