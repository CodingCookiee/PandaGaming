import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "../button/Button";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  // Toggle Audio and Visual Indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [isIndicatorActive, setIsIndicatorActive] = useState(true);

  //  Ref for Audio and Nav Container
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  //Toggle Audio and Visual Indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage Audio Playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(
      navContainerRef.current,
      {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      },
      "nav",
    );
  }, [isNavVisible]);

  // Ensure audio starts playing on user interaction
  useEffect(() => {
    const audioElement = audioElementRef.current;
    const playAudio = () => {
      audioElement.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    };

    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16  border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between size-full p-4">
          {/* Logo and Product Button */}
          <div className="flex items-center gap-7">
            <img src="/gamer.png" alt="logo" className=" w-10" />
            <Button
              title="Products"
              id="product-button"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>
          {/* Navigation Links and Audio Button */}
          <div className="flex items-center h-full">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio ref={audioElementRef} src="/audio/loop.mp3" loop />
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <div
                  key={index}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
