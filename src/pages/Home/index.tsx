import { useRef, useState } from 'react';
import './index.css';
import Startup from '../../components/Startup';
import { useInView } from 'react-intersection-observer';
import Navbar from '../../components/Navbar';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/solid'

import BackgroundImage from '../../assets/images/voxel-world.png';
import DesktopDaxaImage from '../../assets/images/desktop/daxa-logo.png';
import MobileDaxaImage from '../../assets/images/mobile/daxa-logo.png';
import WorkCard from '../../components/WorkCard';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import YoutubeEmbed from '../../components/YoutubeEmbed';
import InfoHeader from '../../components/InfoHeader';
import TwitterCard from '../../components/TwitterCard';
import ContactCard from '../../components/ContactCard';

const Home = () => {
  const [showStartup, setShowStartup] = useState(true);

  const windowWidth = useWindowWidth();
  const MINIMUM_WIDTH_TO_SHOW_STARTUP = 640;
  const WIDTH_TO_CHANGE_IMAGE = 800;

  const { ref, inView } = useInView({
    initialInView: true,
    threshold: 0
  });

  type divElement = null | HTMLDivElement;
  const workLocation = useRef<divElement>(null);
  const socialLocation = useRef<divElement>(null);
  const contactLocation = useRef<divElement>(null);
  const info = useRef<divElement>(null);

  if (showStartup && windowWidth > MINIMUM_WIDTH_TO_SHOW_STARTUP)
    return (
      <Startup
        onClick={() => {
          setShowStartup(false);
        }}
      />
    );

  return (
    <div className="home">
      <Navbar
        show={!inView}
        workLocation={workLocation}
        socialLocation={socialLocation}
        contactLocation={contactLocation}
      ></Navbar>
      <div className="hero-space" ref={ref}>
        <div className={`banner__${inView ? 'focused' : 'unfocused'}`}>
          <img
            src={BackgroundImage}
            className="landscape"
            alt={'a beautiful voxel landscape'}
          />
          <div className="text">
            <h1 className="name">Gabe Rundlett</h1>
            <h3 className="phrase">
              I am a young software engineer who loves <br /> making cool things
              with code in my free-time
            </h3>
          </div>
          <ChevronDoubleDownIcon
            className="scrolldown"
            onClick={() => {
              info.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>
      <div className="container" ref={info}>
        <section className="work-info" ref={workLocation}>
          <InfoHeader title={'Recent Works'}>
            {"Things I'm working on"}
          </InfoHeader>
          <WorkCard image={BackgroundImage} title="Gvox Engine">
            Gvox Engine is a raytraced voxel engine built to utilize the GPU as
            much as possible, Gvox Engine is being developed along side the{' '}
            <b>Gvox Format</b> library, which can convert between many voxel
            file formats, standard and custom. both Gvox and the Gvox Engine are
            Open-source
          </WorkCard>
          <WorkCard
            image={
              windowWidth <= WIDTH_TO_CHANGE_IMAGE
                ? MobileDaxaImage
                : DesktopDaxaImage
            }
            title="Daxa"
          >
            Daxa is a GPU API based on Vulkan, designed by Patrick Ahrens and
            co-developed by me
          </WorkCard>
        </section>
        <section className="social-info" ref={socialLocation}>
          <InfoHeader title={'SOCIAL'}>{"I'm here too"}</InfoHeader>
          <div className="video">
            <div className="video-title">
              <h1>Check my latest video:</h1>
            </div>
            <YoutubeEmbed />
          </div>
          <TwitterCard></TwitterCard>
        </section>
        <section className="contact-info" ref={contactLocation}>
          <InfoHeader title={'Contact'}>Talk to me</InfoHeader>
          <ContactCard />
        </section>
      </div>
    </div>
  );
};

export default Home;
