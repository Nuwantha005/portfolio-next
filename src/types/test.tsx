Nuwantha005: folllowing is a code that uses light gallery to add both images and videos using light gallery . can i modify this lgcomponent to do the same ? #file:page.tsx 


import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

import LightGallery from 'lightgallery/react';
import { LightGallerySettings } from 'lightgallery/lg-settings';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';

interface AppProps {}
interface AppState {
  settings: LightGallerySettings;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div>
        <LightGallery plugins={[lgZoom, lgVideo]} mode="lg-fade">
          <a
            data-lg-size="1406-1390"
            className="gallery-item"
            data-src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1406&q=80"
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@entrycube' >Diego Guzmán </a></h4> <p> Location - <a href='https://unsplash.com/s/photos/fushimi-inari-taisha-shrine-senbontorii%2C-68%E7%95%AA%E5%9C%B0-fukakusa-yabunouchicho%2C-fushimi-ward%2C-kyoto%2C-japan'>Fushimi Ward, Kyoto, Japan</a></p>"
          >
            <img
              className="img-responsive"
              src="https://images.unsplash.com/photo-1581894158358-5ecd2c518883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
            />
          </a>
          <a
            data-lg-size="1400-1400"
            data-pinterest-text="Shinimamiya, Osaka, Japan"
            data-tweet-text="Shinimamiya, Osaka, Japan"
            className="gallery-item"
            data-src="https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@asoshiation' >Shah </a></h4><p> Location - <a href='https://unsplash.com/s/photos/shinimamiya%2C-osaka%2C-japan'>Shinimamiya, Osaka, Japan</a></p>"
          >
            <img
              className="img-responsive"
              src="https://images.unsplash.com/photo-1544550285-f813152fb2fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
            />
          </a>
          <a
            data-lg-size="1400-1400"
            className="gallery-item"
            data-src="https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
            data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@katherine_xx11' >Katherine Gu </a></h4><p> For all those years we were alone and helpless.</p>"
          >
            <img
              className="img-responsive"
              src="https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80"
            />
          </a>
          <a
            data-lg-size="1400-1400"
            className="gallery-item"
            data-iframe="true"
            data-src="https://www.lightgalleryjs.com/pdf/sample.pdf"
          >
            <img
              className="img-responsive"
              src="https://images.unsplash.com/photo-1455541504462-57ebb2a9cec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&q=80"
            />
          </a>
          <a
            className="gallery-item"
            data-src="https://www.youtube.com/watch?v=egyIeygdS_E&mute=0"
            key="4"
          >
            <img
              style={{ maxWidth: '400px' }}
              className="img-responsive"
              alt=""
              src="https://img.youtube.com/vi/egyIeygdS_E/maxresdefault.jpg"
            />
          </a>
        </LightGallery>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));




import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { LightGallery as ILightGallery } from 'lightgallery/lightgallery';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';
import './style.scss';

export const App: FC<{ name: string }> = ({ name }) => {
    const lightGalleryRef = useRef < ILightGallery > null;
    const containerRef = useRef(null);
    const [galleryContainer, setGalleryContainer] = useState(null);

    const onInit = useCallback((detail) => {
        if (detail) {
            lightGalleryRef.current = detail.instance;
            // Since we are using dynamic mode, we need to programmatically open lightGallery
            lightGalleryRef.current.openGallery();
        }
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            setGalleryContainer(containerRef.current);
        }
    }, []);

    const videos = [
        {
            src: 'https://youtu.be/IUN664s7N-c',
            subHtml: `<h4>'Peck Pocketed' by Kevin Herron | Disney Favorite</h4>`,
        },
        {
            src: 'https://www.youtube.com/watch?v=ttLu7ygaN6I',
            subHtml: `<h4>Forest Path - Unreal Engine 5 Cinematic by Sharkyy</h4>`,
        },
        {
            src: 'https://www.youtube.com/watch?v=C3vyugaBhSs',
            subHtml: `<h4>UE5 | In The Heart Of The Forest by Anastasia Gorban</h4>`,
        },
        // Add more video objects as needed
    ];

    return (
        <>
            <div ref={containerRef} />
            <LightGallery
                container={galleryContainer}
                onInit={onInit}
                plugins={[lgThumbnail, lgVideo]}
                closable={false}
                showMaximizeIcon={true}
                slideDelay={400}
                thumbWidth={130}
                thumbHeight={'100px'}
                thumbMargin={6}
                appendSubHtmlTo={'.lg-item'}
                dynamic={true}
                dynamicEl={videos}
                // videojs
                // videojsOptions={{ muted: false }}
                hash={false}
                elementClassNames={'inline-gallery-container'}
            />
        </>
    );
};
