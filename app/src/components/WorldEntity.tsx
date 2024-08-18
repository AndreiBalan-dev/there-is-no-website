import React, { useEffect, useRef, useState } from "react";
import Matter, {
  Engine,
  Render,
  World,
  Mouse,
  MouseConstraint,
  Runner,
  Events,
  Bodies,
} from "matter-js";
import { Render as RenderType, Engine as EngineType } from "matter-js";
import { VideoPlayerBox } from "./(video-player)/VideoPlayerBox";
import { VideoPlayButton } from "./(video-player)/VideoPlayButton";
import { VideoHamburgerMenu } from "./(video-player)/VideoHamburgerMenu";
import {
  FaCoffee,
  FaGithub,
  FaLightbulb,
  FaRegLightbulb,
} from "react-icons/fa";
import voice1 from "../assets/1.mp3";
import voice2 from "../assets/2.mp3";
import voice3 from "../assets/3.mp3";
import pop1 from "../assets/pop.mp3";
import voice4 from "../assets/4.mp3";
import humming1 from "../assets/humming.mp3";
import voice5 from "../assets/5.mp3";
import voice6 from "../assets/6.mp3";
import voice7 from "../assets/7.mp3";
import voice8 from "../assets/8.mp3";
import voice9 from "../assets/9.mp3";
import voice10 from "../assets/10.mp3";
import voice11 from "../assets/11.mp3";
import voice12 from "../assets/12.mp3";
import voice13 from "../assets/13.mp3";
import rickroll from "../assets/rickroll.mp3";
import SorryComponent from "../components/(pages)/FirstPage";
import SwordMiniGameComponent from "../components/(pages)/SecondPage";
import CookieClickerGameComponent from "../components/(pages)/ThirdPage";
import rickRollGif from "../assets/rickroll.gif";

const subtitles1 = [
  "Wait... ",
  "what ",
  "are ",
  "you doing ",
  "here? ",
  "This ",
  "isn’t ",
  "a place ",
  "for visitors. ",
  "Actually, ",
  "this isn’t ",
  "even ",
  "a place ",
  "at all. ",
  "But, ",
  "since ",
  "you’ve stumbled ",
  "in, ",
  "I suppose ",
  "you can ",
  "stay ",
  "for a moment. ",
  "Just ",
  "don’t ",
  "get too comfortable, ",
  "okay?",
];

const subtitles2 = [
  "You're ",
  "still ",
  "here? ",
  "I must admit, ",
  "I wasn’t ",
  "expecting ",
  "that. ",
  "This ",
  "is awkward... ",
  "I mean, ",
  "there’s really ",
  "nothing ",
  "here ",
  "for you. ",
  "Maybe ",
  "you should ",
  "consider ",
  "leaving ",
  "before ",
  "things get, ",
  "well, ",
  "complicated.",
];

const subtitles3 = [
  "Alright, ",
  "I get it. ",
  "You ",
  "want ",
  "something ",
  "to do. ",
  "Fine, ",
  "here’s a ",
  "cat video ",
  "you can ",
  "watch. ",
];

const subtitles4 = [
  "What?! ",
  "What have ",
  "you done?! ",
  "I invite ",
  "you in, ",
  "and you ",
  "go ",
  "and break ",
  "things? ",
  "This is ",
  "why ",
  "we can’t ",
  "have ",
  "nice things! ",
  "Seriously, ",
  "you need ",
  "to go. ",
];

const subtitles5 = [
  "You’re ",
  "still lingering? ",
  "Unbelievable! ",
  "Alright, ",
  "let’s spice ",
  "things up ",
  "a bit. ",
  "Clearly, ",
  "you have ",
  "a talent ",
  "for breaking things, ",
  "so how about ",
  "you try ",
  "fixing something ",
  "for a change? ",
  "Type out ",
  "an apology—",
  "quickly now. ",
  "Let’s see ",
  "if you can ",
  "manage at least ",
  "that without ",
  "turning the world ",
  "upside down.",
];

const subtitles6 = [
  "Well, ",
  "that was… ",
  "passable. ",
  "I guess ",
  "I can ",
  "accept your ",
  "apology. ",
  "This time. ",
  "But don’t ",
  "get too ",
  "comfortable—you're ",
  "still on ",
  "very thin ice! ",
  "Now, let’s ",
  "take it ",
  "from the top. ",
  "Here’s the ",
  "video—again. ",
  "Please, ",
  "for the love ",
  "of all that’s ",
  "sacred, ",
  "don’t break ",
  "it this time.",
];

const subtitles7 = [
  "Oh, ",
  "seriously? ",
  "Are you ",
  "doing this ",
  "on purpose? ",
  "This is ",
  "beyond frustrating! ",
  "I knew ",
  "better than ",
  "to trust you ",
  "with anything. ",
  "You know what? ",
  "Fine. ",
  "You want ",
  "chaos? ",
  "I’ll give you ",
  "chaos. ",
  "Brace yourself—",
  "because things are ",
  "about to get wild!",
];

const subtitles8 = [
  "Here’s ",
  "a sword. ",
  "Yes, ",
  "you heard me ",
  "right, ",
  "a sword! ",
  "No time ",
  "for questions, ",
  "just start ",
  "swinging. ",
  "Maybe if ",
  "you prove ",
  "you’re not ",
  "a total disaster ",
  "with this, ",
  "I might consider ",
  "not unleashing ",
  "a digital apocalypse ",
  "on this place.",
];

const subtitles9 = [
  "Okay, ",
  "okay, ",
  "I’ll admit, ",
  "you’re not ",
  "entirely hopeless. ",
  "But you’ve got ",
  "a worrying ",
  "enthusiasm ",
  "for breaking things. ",
  "So, if ",
  "destruction is ",
  "what you crave, ",
  "try this ",
  "on for size. ",
  "It’s a cookie—",
  "yes, ",
  "a cookie. ",
  "Go ahead, ",
  "smash it ",
  "to bits.",
];

const subtitles10 = [
  "Yes, ",
  "really, ",
  "a cookie. ",
  "What? ",
  "Were you ",
  "expecting something ",
  "more, ",
  "I don’t know, ",
  "earth-shattering? ",
  "This is ",
  "your final shot ",
  "to prove ",
  "you can handle ",
  "anything without ",
  "triggering Armageddon. ",
  "Now click away, ",
  "and don’t ",
  "hold back!",
];

const subtitles11 = [
  "Well, ",
  "congratulations! ",
  "You’ve done it—",
  "you’ve broken ",
  "everything in sight, ",
  "just as you wanted. ",
  "You know what? ",
  "I surrender. ",
  "You win. ",
  "Here’s your ",
  "grand prize—",
  "a nice, ",
  "harmless video. ",
  "Enjoy… ",
  "or maybe not. ",
  "Let’s see ",
  "if you can ",
  "break this one ",
  "too.",
];

const subtitles12 = [
  "Ha! ",
  "Gotcha! ",
  "Did you ",
  "really think ",
  "I’d let you ",
  "have the last laugh? ",
  "This is ",
  "my domain, ",
  "and I’m ",
  "always one ",
  "step ahead. ",
  "Better luck ",
  "next time, ",
  "you delightful ",
  "destroyer of worlds!",
];

const subtitles13 = [
  "And before ",
  "you leave, ",
  "remember: ",
  "This is ",
  "not a ",
  "website.",
];

const MatterComponent: React.FC = () => {
  // const audioTextRef_1 = useRef<HTMLAudioElement | null>(null);
  // const audioTextHummingRef_1 = useRef<HTMLAudioElement | null>(null);
  // const audioTextRef_2 = useRef<HTMLAudioElement | null>(null);
  // const audioTextRef_3 = useRef<HTMLAudioElement | null>(null);
  // const audioSoundPopRef_1 = useRef<HTMLAudioElement | null>(null);
  const audioTextRef_4 = useRef<HTMLAudioElement | null>(null);
  const audioTextRef_5 = useRef<HTMLAudioElement | null>(null);
  const audioTextRef_6 = useRef<HTMLAudioElement | null>(null);
  const audioTextRef_7 = useRef<HTMLAudioElement | null>(null);
  // const audioTextRef_8 = useRef<HTMLAudioElement | null>(null);
  const audioTextRef_9 = useRef<HTMLAudioElement | null>(null);
  const audioTextRef_10 = useRef<HTMLAudioElement | null>(null);
  // const audioTextRef_11 = useRef<HTMLAudioElement | null>(null);
  // const audioTextRef_12 = useRef<HTMLAudioElement | null>(null);
  // const audioTextRef_13 = useRef<HTMLAudioElement | null>(null);
  // const audioMusicRef_1 = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    //   audioTextRef_1.current = new Audio(voice1);
    //   audioTextHummingRef_1.current = new Audio(humming1);
    //   audioTextRef_2.current = new Audio(voice2);
    //   audioTextRef_3.current = new Audio(voice3);
    //   audioSoundPopRef_1.current = new Audio(pop1);
    audioTextRef_4.current = new Audio(voice4);
    audioTextRef_5.current = new Audio(voice5);
    audioTextRef_6.current = new Audio(voice6);
    audioTextRef_7.current = new Audio(voice7);
    //   audioTextRef_8.current = new Audio(voice8);
    audioTextRef_9.current = new Audio(voice9);
    audioTextRef_10.current = new Audio(voice10);
    //   audioTextRef_11.current = new Audio(voice11);
    //   audioTextRef_12.current = new Audio(voice12);
    //   audioTextRef_13.current = new Audio(voice13);
    //   audioMusicRef_1.current = new Audio(rickroll);
  }, []);

  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<EngineType>(Engine.create());
  const renderRef = useRef<RenderType | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const [hasClicked, setHasClicked] = useState(false);
  const enableHints = useRef(false);
  const startText = useRef("Select your play mode below");
  const [canAddBodies, setCanAddBodies] = useState(false);
  const [hasCollided, setHasCollided] = useState(false);
  const [sorryComponentToggle, setSorryComponentToggle] = useState(false);
  const [triggeredAudio6, setTriggeredAudio6] = useState(false);
  const [swordFightComponentToggle, setSwordFightComponentToggle] =
    useState(false);
  const [cookieClickerComponentToggle, setCookieClickerComponentToggle] =
    useState(false);
  const [rickRollComponentToggle, setRickRollComponentToggle] = useState(false);

  // const voice1 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/1-6v8CQs1coVpj5O1IzfmRy258KlAOCX.mp3";
  // const voice2 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/2-CoNKmo9xOV1dAxpOuOG5M2cqEmqDmD.mp3";
  // const voice3 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/3-6OJRFMQZkGTw2QKfOzSUeD65gWnD7t.mp3";
  // const pop1 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/pop-i0hjvmtiZb8TCIUw2JkQk7iNyJdV8V.mp3";
  // const voice4 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/4-SfhWnMPX71ilpg7ARp6uxDFMEyM7eP.mp3";
  // const humming1 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/humming-fihLEvhhnII3uv5Au8tcno1Lg92XLu.mp3";
  // const voice5 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/5-T0fMzBQnsDzCGS0rSuXzURHlfZ2qCz.mp3";
  // const voice6 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/6-WVuODm8JkXs8xCqcEZCv3t0wqjVjhj.mp3";
  // const voice7 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/7-YF7RYJAju6pzWgSwFhxOB6rodIGFmA.mp3";
  // const voice8 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/8-2t3uS2eLfyWnecQ3my94GYOg4wqvWl.mp3";
  // const voice9 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/9-FBoURFMIJT8rUFHKp3LObF1D7euUZh.mp3";
  // const voice10 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/10-edjjsJQ9pNtUHv8pDzri39OJNKf4cZ.mp3";
  // const voice11 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/11-LChRzohF86HLYv0HILMkwhNO6twrCw.mp3";
  // const voice12 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/12-bZxi2aS5QCSZz7O64fCpx6ZpmaDIh1.mp3";
  // const voice13 =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/13-dF1ol5609lDRh5FOdID0tQsOu7IaXF.mp3";
  // const rickroll =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/rickroll-lRwISRZCJLDcR1P9wlCUDjvBMpxyMv.mp3";

  // const rickRollGif =
  //   "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/rickroll-deiAQmp1LPZEaxxCgTiaKJLP9Q7EfN.gif";

  const [subtitle1, setSubtitle1] = useState("");
  const [subtitle2, setSubtitle2] = useState("");
  const [subtitle3, setSubtitle3] = useState("");
  const [subtitle4, setSubtitle4] = useState("");
  const [subtitle5, setSubtitle5] = useState("");
  const [subtitle6, setSubtitle6] = useState("");
  // const [subtitleEnd1, setSubtitleEnd1] = useState("");
  // const [subtitleEnd2, setSubtitleEnd2] = useState("");
  // const [subtitleEnd3, setSubtitleEnd3] = useState("");
  const [hintText1, setHintText1] = useState("");
  const [hintText2, setHintText2] = useState("");
  const [hintText3, setHintText3] = useState("");
  const [hintText4, setHintText4] = useState("");
  const [hintText5, setHintText5] = useState("");

  let triggeredSubtitle4 = false;
  const bodiesWithCustomForce = new Set<Matter.Body>();

  const hasCollidedGlobalRef = useRef(false);
  const triggeredSubtitleRef4 = useRef(false);
  const triggeredSubtitleRef7 = useRef(false);
  const triggeredAudioGlobal5 = useRef(false);
  const triggeredAudioGlobal6 = useRef(false);
  const triggeredAudioGlobal9 = useRef(false);
  const triggeredAudioGlobal11 = useRef(false);

  function playAudio1() {
    let myAudio = new Audio(voice1);
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudioHumming1() {
    let myAudio = new Audio(humming1);
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio2() {
    let myAudio = new Audio(voice2);
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio3() {
    let myAudio = new Audio(voice3);
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudioPop1() {
    let myAudio = new Audio(pop1);
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio4() {
    let myAudio = audioTextRef_4.current!;
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio5() {
    let myAudio = audioTextRef_5.current!;
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio6() {
    let myAudio = audioTextRef_6.current!;
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio7() {
    let myAudio = audioTextRef_7.current!;
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio8() {
    let myAudio = new Audio(voice8);
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio9() {
    let myAudio = audioTextRef_9.current!;
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio10() {
    let myAudio = audioTextRef_10.current!;
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio11() {
    let myAudio = new Audio(voice11);
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio12() {
    let myAudio = new Audio(voice12);
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playAudio13() {
    let myAudio = new Audio(voice13);
    myAudio.volume = 0.75;
    myAudio.play().catch((error) => console.error("Audio play error:", error));
  }

  function playRickroll() {
    let audioElement = new Audio(rickroll);

    setTimeout(() => {
      audioElement.volume = 0.3;
    }, 6100);

    setTimeout(() => {
      audioElement.volume = 1;
    }, 16200);

    setTimeout(() => {
      audioElement.volume = 0.3;
    }, 18300);

    setTimeout(() => {
      audioElement.volume = 1;
    }, 26100);

    audioElement
      .play()
      .catch((error) => console.error("Audio play error:", error));

    audioElement!.addEventListener("ended", () => {
      audioElement
        .play()
        .catch((error) => console.error("Audio replay error:", error));
    });
  }

  function addSubtitles13() {
    // audioMusicRef_1.current!.volume = 0.3;

    setTimeout(() => {
      setSubtitle1(subtitles13[0]);
    }, 100); // "And before "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles13[1]);
    }, 800); // "you leave, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles13[2]);
    }, 1400); // "remember: "

    setTimeout(() => {
      setSubtitle1(subtitles13[3]);
    }, 2500); // "This is "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles13[4]);
    }, 3000); // "not a "

    setTimeout(() => {
      setSubtitle1(subtitles13[5]);
    }, 3500); // "website."

    setTimeout(() => {
      setSubtitle1("");
    }, 4000); // Clear the subtitle text

    // setTimeout(() => {
    //   audioMusicRef_1.current!.volume = 1;
    // }, 4200);

    // setTimeout(() => {
    //   setSubtitle1("Made with love by");
    // }, 10000);
    // setTimeout(() => {
    //   setSubtitleEnd1((prev) => prev + "Balan Andrei");
    // }, 12000);
    // setTimeout(() => {
    //   setSubtitleEnd2((prev) => prev + "Rudransh Joshi");
    // }, 14000);
    // setTimeout(() => {
    //   setSubtitleEnd3((prev) => prev + "Andy Mai");
    // }, 16000);
  }

  function addSubtitles12() {
    // audioMusicRef_1.current!.volume = 0.3;
    setTimeout(() => {
      setSubtitle1(subtitles12[0]);
    }, 100); // "Ha! "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles12[1]);
    }, 500); // "Gotcha! "

    setTimeout(() => {
      setSubtitle1(subtitles12[2]);
    }, 1400); // "Did you "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles12[3]);
    }, 1800); // "really think "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles12[4]);
    }, 2300); // "I’d let you "

    setTimeout(() => {
      setSubtitle1(subtitles12[5]);
    }, 2700); // "have the last laugh? "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles12[6]);
    }, 4200); // "This is "

    setTimeout(() => {
      setSubtitle1(subtitles12[7]);
    }, 4500); // "my domain, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles12[8]);
    }, 5300); // "and I’m "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles12[9]);
    }, 5800); // "always one "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles12[10]);
    }, 6500); // "step ahead. "

    setTimeout(() => {
      setSubtitle1(subtitles12[11]);
    }, 7800); // "Better luck "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles12[12]);
    }, 8200); // "next time, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles12[13]);
    }, 8700); // "you delightful "

    setTimeout(() => {
      setSubtitle1(subtitles12[14]);
    }, 9200); // "destroyer of worlds!"

    // setTimeout(() => {
    //   audioMusicRef_1.current!.volume = 1;
    // }, 10000);

    setTimeout(() => {
      setSubtitle1("");
    }, 12000); // Clear the subtitle text

    setTimeout(() => {
      playAudio13();
      addSubtitles13();
    }, 14000);
  }

  function addSubtitles11() {
    setTimeout(() => {
      setSubtitle1(subtitles11[0]);
    }, 100); // "Well, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[1]);
    }, 500); // "congratulations! "

    setTimeout(() => {
      setSubtitle1(subtitles11[2]);
    }, 1400); // "You’ve done it—"

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[3]);
    }, 1800); // "you’ve broken "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[4]);
    }, 2300); // "everything in sight, "

    setTimeout(() => {
      setSubtitle1(subtitles11[5]);
    }, 3600); // "just as you wanted. "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[6]);
    }, 4700); // "You know what? "

    setTimeout(() => {
      setSubtitle1(subtitles11[7]);
    }, 5800); // "I surrender. "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[8]);
    }, 7200); // "You win. "

    setTimeout(() => {
      setSubtitle1(subtitles11[9]);
    }, 8400); // "Here’s your "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[10]);
    }, 8900); // "grand prize—"

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[11]);
    }, 9800); // "a nice, "

    setTimeout(() => {
      setSubtitle1(subtitles11[12]);
    }, 10300); // "harmless video. "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[13]);
    }, 11700); // "Enjoy… "

    setTimeout(() => {
      setSubtitle1(subtitles11[14]);
    }, 12700); // "or maybe not. "

    setTimeout(() => {
      setSubtitle1(subtitles11[15]);
    }, 14100); // "Let’s see "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[16]);
    }, 14800); // "if you can "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles11[17]);
    }, 15200); // "break this one "

    setTimeout(() => {
      setSubtitle1(subtitles11[18]);
    }, 15700); // "too."

    setTimeout(() => {
      setSubtitle1("");
    }, 18000); // Clear the subtitle text

    setTimeout(() => {
      setRickRollComponentToggle(true);
      playRickroll();
    }, 20000);

    setTimeout(() => {
      playAudio12();
      addSubtitles12();
    }, 26000); // Start the next set of subtitles after the current one ends
  }

  function addSubtitles10() {
    setTimeout(() => {
      setSubtitle6(subtitles10[0]);
    }, 100); // "Yes, "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[1]);
    }, 500); // "really, "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[2]);
    }, 1000); // "a cookie. "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[3]);
    }, 1500); // "What? "

    setTimeout(() => {
      setSubtitle6(subtitles10[4]);
    }, 2200); // "Were you "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[5]);
    }, 2620); // "expecting something "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[6]);
    }, 3200); // "more, "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[7]);
    }, 3700); // "I don’t know, "

    setTimeout(() => {
      setSubtitle6(subtitles10[8]);
    }, 4200); // "earth-shattering? "

    setTimeout(() => {
      setSubtitle6(subtitles10[9]);
    }, 5400); // "This is "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[10]);
    }, 6000); // "your final shot "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[11]);
    }, 7000); // "to prove "

    setTimeout(() => {
      setSubtitle6(subtitles10[12]);
    }, 7700); // "you can handle "

    setTimeout(() => {
      setSubtitle6(subtitles10[13]);
    }, 8200); // "anything without "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[14]);
    }, 9000); // "triggering Armageddon. "

    setTimeout(() => {
      setSubtitle6(subtitles10[15]);
    }, 10600); // "Now click away, "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[16]);
    }, 11900); // "and don’t "

    setTimeout(() => {
      setSubtitle6((prev) => prev + subtitles10[17]);
    }, 12100); // "hold back!"

    setTimeout(() => {
      setSubtitle6("");
    }, 15000); // Clear the subtitle text
  }

  function addSubtitles9() {
    setTimeout(() => {
      setSubtitle5(subtitles9[0]);
    }, 100); // "Okay, "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[1]);
    }, 500); // "okay, "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[2]);
    }, 1150); // "I’ll admit, "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[3]);
    }, 1700); // "you’re not "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[4]);
    }, 2200); // "entirely hopeless. "

    setTimeout(() => {
      setSubtitle5(subtitles9[5]);
    }, 3300); // "But you’ve got "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[6]);
    }, 3700); // "a worrying "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[7]);
    }, 4500); // "enthusiasm "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[8]);
    }, 5400); // "for breaking things. "

    setTimeout(() => {
      setSubtitle5(subtitles9[9]);
    }, 6800); // "So, if "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[10]);
    }, 7600); // "destruction is "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[11]);
    }, 8200); // "what you crave, "

    setTimeout(() => {
      setSubtitle5(subtitles9[12]);
    }, 9200); // "try this "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles9[13]);
    }, 9800); // "on for size. "

    setTimeout(() => {
      setSwordFightComponentToggle(false);
      setCookieClickerComponentToggle(true);
    }, 10000);

    setTimeout(() => {
      setSubtitle1(subtitles9[14]);
    }, 11000); // "It’s a cookie—"

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[15]);
    }, 11800); // "yes, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[16]);
    }, 12400); // "a cookie. "

    setTimeout(() => {
      setSubtitle1(subtitles9[17]);
    }, 13200); // "Go ahead, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[18]);
    }, 13700); // "smash it "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[19]);
    }, 14100); // "to bits."

    setTimeout(() => {
      const subtitleElemCookie = document.querySelector("#modifyFirefoxCookie");
      subtitleElemCookie?.classList.remove("justify-center");
      subtitleElemCookie?.classList.add("justify-normal");
    }, 16000); // ""

    setTimeout(() => {
      if (enableHints.current && !triggeredAudioGlobal11.current)
        setHintText4("Hint: Get 7 clicks per second!");
    }, 18000);

    setTimeout(() => {
      setSubtitle1("");
    }, 17000); // Clear the subtitle text

    setTimeout(() => {
      if (!triggeredAudioGlobal11.current) {
        playAudio10();
        addSubtitles10();
      }
    }, 20000); // Clear the subtitle text
  }

  function addSubtitles8() {
    setTimeout(() => {
      setSubtitle5(subtitles8[0]);
    }, 100); // "Here’s "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[1]);
    }, 400); // "a sword. "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[2]);
    }, 1000); // "Yes, "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[3]);
    }, 1400); // "you heard me "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[4]);
    }, 1800); // "right, "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[5]);
    }, 2400); // "a sword! "

    setTimeout(() => {
      setSubtitle5(subtitles8[6]);
    }, 3400); // "No time "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[7]);
    }, 3900); // "for questions, "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[8]);
    }, 4700); // "just start "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[9]);
    }, 5400); // "swinging. "

    setTimeout(() => {
      setSubtitle5(subtitles8[10]);
    }, 6400); // "Maybe if "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[11]);
    }, 6800); // "you prove "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[12]);
    }, 7500); // "you’re not "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[13]);
    }, 8100); // "a total disaster "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[14]);
    }, 9200); // "with this, "

    setTimeout(() => {
      setSubtitle5(subtitles8[15]);
    }, 10100); // "I might consider "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[16]);
    }, 10800); // "not unleashing "

    setTimeout(() => {
      setSubtitle5(subtitles8[17]);
    }, 11500); // "a digital apocalypse "

    setTimeout(() => {
      setSubtitle5((prev) => prev + subtitles8[18]);
    }, 12200); // "on this place."

    setTimeout(() => {
      setSubtitle5("");
    }, 16000); // Clear the subtitle text

    setTimeout(() => {
      if (enableHints.current) setHintText3("Hint: Get a score of 15!");
    }, 17000); // ""
  }

  function addSubtitles7() {
    if (!triggeredSubtitleRef7) {
      return;
    }
    triggeredSubtitleRef7.current = true;
    setTimeout(() => {
      setSubtitle1(subtitles7[0]);
    }, 100); // "Oh, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[1]);
    }, 800); // "seriously? "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[2]);
    }, 1700); // "Are you "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[3]);
    }, 2000); // "doing this "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[4]);
    }, 2400); // "on purpose? "

    setTimeout(() => {
      setSubtitle1(subtitles7[5]);
    }, 3400); // "This is "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[6]);
    }, 3900); // "beyond frustrating! "

    setTimeout(() => {
      setSubtitle1(subtitles7[7]);
    }, 5800); // "I knew "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[8]);
    }, 6200); // "better than "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[9]);
    }, 6700); // "to trust you "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[10]);
    }, 7200); // "with anything. "

    setTimeout(() => {
      setSubtitle1(subtitles7[11]);
    }, 8500); // "You know what? "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[12]);
    }, 9200); // "Fine. "

    setTimeout(() => {
      setSubtitle1(subtitles7[13]);
    }, 10000); // "You want "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[14]);
    }, 10400); // "chaos? "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[15]);
    }, 11700); // "I’ll give you "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[16]);
    }, 12400); // "chaos. "

    setTimeout(() => {
      setSubtitle1(subtitles7[17]);
    }, 13800); // "Brace yourself—"

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[18]);
    }, 14500); // "because things are "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles7[19]);
    }, 15300); // "about to get wild!"

    setTimeout(() => {
      setSubtitle1("");
      setSwordFightComponentToggle(true);
      setSorryComponentToggle(false);
      playAudio8();
      addSubtitles8();
    }, 17000); // Clear the subtitle text
  }

  function addSubtitles6() {
    setHintText1("");
    setTimeout(() => {
      setSubtitle4(subtitles6[0]);
    }, 100); // "Well, "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[1]);
    }, 800); // "that was… "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[2]);
    }, 1900); // "passable. "

    setTimeout(() => {
      setSubtitle4(subtitles6[3]);
    }, 3200); // "I guess "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[4]);
    }, 3400); // "I can "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[5]);
    }, 3700); // "accept your "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[6]);
    }, 3900); // "apology. "

    setTimeout(() => {
      setSubtitle4(subtitles6[7]);
    }, 5000); // "This time. "

    setTimeout(() => {
      setSubtitle4(subtitles6[8]);
    }, 6500); // "But don’t "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[9]);
    }, 7100); // "get too "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[10]);
    }, 7950); // "comfortable—you're "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[11]);
    }, 8600); // "still on "

    setTimeout(() => {
      setSubtitle4(subtitles6[12]);
    }, 9400); // "very thin ice! "

    setTimeout(() => {
      setSubtitle4(subtitles6[13]);
    }, 11000); // "Now, let’s "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[14]);
    }, 11300); // "take it "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[15]);
    }, 12000); // "from the top. "

    setTimeout(() => {
      setSubtitle4(subtitles6[16]);
    }, 13600); // "Here’s the "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[17]);
    }, 14200); // "video—again. "

    setTimeout(() => {
      setSorryComponentToggle(false);
    }, 14800); // render components again

    setTimeout(() => {
      setSubtitle4(subtitles6[18]);
    }, 15000); // "Please, "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[19]);
    }, 16000); // "for the love "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[20]);
    }, 16500); // "of all that’s "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[21]);
    }, 16900); // "sacred, "

    setTimeout(() => {
      setSubtitle4(subtitles6[22]);
    }, 18000); // "don’t break "

    setTimeout(() => {
      setSubtitle4((prev) => prev + subtitles6[23]);
    }, 18700); // "it this time."

    setTimeout(() => {
      if (enableHints.current) setHintText1("Hint: Break everything!");
    }, 20000);

    setTimeout(() => {
      setSubtitle4("");
    }, 22000); // Clear the subtitle text
  }

  function addSubtitles5() {
    const subtitleElem3 = document.querySelector("#modifyFirefox3");
    subtitleElem3?.classList.remove("justify-center");
    subtitleElem3?.classList.add("justify-normal");
    console.log(subtitleElem3);
    setTimeout(() => {
      setSubtitle3(subtitles5[0]);
    }, 100); // "You’re "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[1]);
    }, 580); // "still lingering? "

    setTimeout(() => {
      setSubtitle3(subtitles5[2]);
    }, 1600); // "Unbelievable! "

    setTimeout(() => {
      setSubtitle3(subtitles5[3]);
    }, 3000); // "Alright, "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[4]);
    }, 3500); // "let’s spice "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[5]);
    }, 4000); // "things up "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[6]);
    }, 4300); // "a bit. "

    setTimeout(() => {
      setSubtitle3(subtitles5[7]);
    }, 5400); // "Clearly, "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[8]);
    }, 5900); // "you have "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[9]);
    }, 6300); // "a talent "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[10]);
    }, 6900); // "for breaking things, "

    setTimeout(() => {
      setSubtitle3(subtitles5[11]);
    }, 7900); // "so how about "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[12]);
    }, 8400); // "you try "

    setTimeout(() => {
      setSubtitle3(subtitles5[13]);
    }, 9000); // "fixing something "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[14]);
    }, 10300); // "for a change? "

    setTimeout(() => {
      setSubtitle3(subtitles5[15]);
    }, 11800); // "Type out "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[16]);
    }, 12300); // "an apology—"

    setTimeout(() => {
      setSubtitle3(subtitles5[17]);
    }, 13300); // "quickly now. "

    setTimeout(() => {
      setSubtitle3(subtitles5[18]);
    }, 14500); // "Let’s see "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[19]);
    }, 15000); // "if you can "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[20]);
    }, 15400); // "manage at least "

    setTimeout(() => {
      setSubtitle3(subtitles5[21]);
    }, 16100); // "that without "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[22]);
    }, 16800); // "turning the world "

    setTimeout(() => {
      setSubtitle3((prev) => prev + subtitles5[23]);
    }, 17400); // "upside down."

    setTimeout(() => {
      if (enableHints.current)
        setHintText2(
          'Hint: Type "I am really sorry" and maybe I\'ll forgive you..'
        );
    }, 22000); // ""

    setTimeout(() => {
      setSubtitle3("");
    }, 25000); // Clear the subtitle text
  }

  function addSubtitles4() {
    if (triggeredSubtitle4 === true) return;
    triggeredSubtitle4 = true;
    setTimeout(() => {
      setSubtitle2(subtitles4[0]);
    }, 100); // "What?! "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[1]);
    }, 700); // "What have "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[2]);
    }, 986); // "you done?! "

    setTimeout(() => {
      setSubtitle2(subtitles4[3]);
    }, 2300); // "I invite "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[4]);
    }, 2800); // "you in, "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[5]);
    }, 3100); // "and you "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[6]);
    }, 3300); // "go "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[7]);
    }, 3800); // "and break "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[8]);
    }, 4200); // "things? "

    setTimeout(() => {
      setSubtitle2(subtitles4[9]);
    }, 5000); // "This is "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[10]);
    }, 5200); // "why "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[11]);
    }, 5500); // "we can’t "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[12]);
    }, 5600); // "have "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[13]);
    }, 5900); // "nice things! "

    setTimeout(() => {
      setSubtitle2(subtitles4[14]);
    }, 7400); // "Seriously, "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[15]);
    }, 7800); // "you need "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[16]);
    }, 8000); // "to go. "

    setTimeout(() => {
      if (enableHints.current) setHintText1("Hint: Break everything!");
    }, 12000); // ""
  }

  function addSubtitles3() {
    setTimeout(() => {
      setSubtitle1(subtitles3[0]);
    }, 100); // "Alright,"

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[1]);
    }, 1000); // "I get it. "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[2]);
    }, 2000); // "You "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[3]);
    }, 2300); // "want "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[4]);
    }, 2700); // "something "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[5]);
    }, 3120); // "to do. "

    setTimeout(() => {
      setSubtitle1(subtitles3[6]);
    }, 3900); // "Fine, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[7]);
    }, 4700); // "here’s a "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[8]);
    }, 5100); // "cat video "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[9]);
    }, 5900); // "you can "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[10]);
    }, 6200); // "watch. "

    setTimeout(() => {
      if (enableHints.current)
        setHintText5(
          "Hint: Seems like the video isn't loading? Try to drag stuff around maybe it'll work."
        );
    }, 10000);

    setTimeout(() => {
      setSubtitle1("");
    }, 8000);

    setTimeout(() => {
      setCanAddBodies(true);
      playAudioPop1();
    }, 8200);
  }

  function addSubtitles2() {
    setTimeout(() => {
      setSubtitle1(subtitles2[0]);
    }, 100); // "You're "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[1]);
    }, 400); // "still "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[2]);
    }, 700); // "here? "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[3]);
    }, 1900); // "I must admit, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[4]);
    }, 2430); // "I wasn’t "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[5]);
    }, 3000); // "expecting "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[6]);
    }, 3400); // "that. "

    setTimeout(() => {
      setSubtitle1(subtitles2[7]);
    }, 4200); // "This "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[8]);
    }, 4400); // "is awkward... "

    setTimeout(() => {
      setSubtitle1(subtitles2[9]);
    }, 5200); // "I mean, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[10]);
    }, 6000); // "there’s really "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[11]);
    }, 6500); // "nothing "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[12]);
    }, 6800); // "here "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[13]);
    }, 7000); // "for you. "

    setTimeout(() => {
      setSubtitle1(subtitles2[14]);
    }, 8000); // "Maybe "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[15]);
    }, 8600); // "you should "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[16]);
    }, 8800); // "consider "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[17]);
    }, 9400); // "leaving "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[18]);
    }, 10000); // "before "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[19]);
    }, 10400); // "things get, "

    setTimeout(() => {
      setSubtitle1(subtitles2[20]);
    }, 11200); // "well, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[21]);
    }, 11830); // "complicated."

    setTimeout(() => {
      setSubtitle1("");
    }, 13030);

    setTimeout(() => {
      playAudio3();
      addSubtitles3();
    }, 16800);
  }

  function addSubtitlesHumming1() {
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 100);
    setTimeout(() => {
      setSubtitle1((prev) => prev + " Mhmm..");
    }, 500);
    setTimeout(() => {
      setSubtitle1("Hm, Mhmm..");
    }, 900);
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 1200);
    setTimeout(() => {
      setSubtitle1("Mhmm..");
    }, 1500);
    setTimeout(() => {
      setSubtitle1("Hm, Mhmm..");
    }, 3200);
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 3600);
    setTimeout(() => {
      setSubtitle1("Mhmm..");
    }, 3800);
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 3800);
    setTimeout(() => {
      setSubtitle1((prev) => prev + " Hmm..");
    }, 4400);
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 4800);
    setTimeout(() => {
      setSubtitle1("Hmmm..");
    }, 5000);
    setTimeout(() => {
      setSubtitle1("Hmmmmm..");
    }, 5200);
    setTimeout(() => {
      setSubtitle1("Hmmm..");
    }, 5500);
    setTimeout(() => {
      setSubtitle1("Hmmm..");
    }, 6700);
    setTimeout(() => {
      setSubtitle1("Mhmm..");
    }, 7200);

    setTimeout(() => {
      playAudio2();
      addSubtitles2();
    }, 10000);
  }

  function addSubtitles1() {
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[0]);
    }, 100); // "Wait... "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[1]);
    }, 1300); // "what "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[2]);
    }, 1500); // "are "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[3]);
    }, 1700); // "you doing "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[4]);
    }, 2000); // "here? "

    setTimeout(() => {
      setSubtitle1(subtitles1[5]);
    }, 3000); // "This "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[6]);
    }, 3400); // "isn't "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[7]);
    }, 3700); // "a place "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[8]);
    }, 4200); // "for visitors. "

    setTimeout(() => {
      setSubtitle1(subtitles1[9]);
    }, 5300); // "Actually, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[10]);
    }, 5800); // "this isn't "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[11]);
    }, 6100); // "even "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[12]);
    }, 6700); // "a place "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[13]);
    }, 7000); // "at all. "

    setTimeout(() => {
      setSubtitle1(subtitles1[14]);
    }, 8000); // "But, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[15]);
    }, 8800); // "since "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[16]);
    }, 9000); // "you've stumbled "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[17]);
    }, 9500); // "in, "

    setTimeout(() => {
      setSubtitle1(subtitles1[18]);
    }, 10200); // "I suppose "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[19]);
    }, 10700); // "you can "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[20]);
    }, 11000); // "stay "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[21]);
    }, 11600); // "for a moment. "

    setTimeout(() => {
      setSubtitle1(subtitles1[22]);
    }, 13000); // "Just "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[23]);
    }, 13200); // "don't "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[24]);
    }, 13600); // "get too comfortable, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[25]);
    }, 14500); // "okay?"

    setTimeout(() => {
      setSubtitle1("");
    }, 17000); // ""

    setTimeout(() => {
      playAudioHumming1();
      addSubtitlesHumming1();
    }, 19000);
  }
  // Function to handle user interaction to allow audio play
  function handleUserInteraction(hints: boolean) {
    if (hints) {
      enableHints.current = true;
    }
    if (!hasClicked) {
      setHasClicked(true);
      setTimeout(() => {
        playAudio1();
        addSubtitles1();
      }, 1400);
    }
  }

  useEffect(() => {
    // Initial setup for Matter.js engine and world
    if (!sorryComponentToggle) {
      const engine = engineRef.current;
      const { world } = engine;
      engine.gravity.scale = 0.025;
      engine.gravity.y = 0.01;

      const render: RenderType = Render.create({
        element: sceneRef.current!,
        engine: engine,
        options: {
          width: window.innerWidth,
          height: window.innerHeight,
          wireframes: false,
        },
      });
      renderRef.current = render;
      render.options.background = "#09090b";

      const wallThickness = 400; // Thickness of the website box
      const width = render.options.width;
      const height = render.options.height;
      if (!width || !height) {
        return console.log("ERROR no render width or height");
      }

      const walls = [
        Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, {
          isStatic: true,
          render: { visible: false },
        }), // Top wall
        Bodies.rectangle(
          width / 2,
          height + wallThickness / 2,
          width,
          wallThickness,
          {
            isStatic: true,
            render: { visible: false },
          }
        ), // Bottom wall
        Bodies.rectangle(
          -wallThickness / 2,
          height / 2,
          wallThickness,
          height,
          {
            isStatic: true,
            render: { visible: false },
          }
        ), // Left wall
        Bodies.rectangle(
          width + wallThickness / 2,
          height / 2,
          wallThickness,
          height,
          {
            isStatic: true,
            render: { visible: false },
          }
        ), // Right wall
      ];

      World.add(world, walls);

      // FPS Updates
      let lastTimestamp = performance.now();
      let frames = 0;

      const updateFps = () => {
        const currentTimestamp = performance.now();
        frames++;
        if (currentTimestamp - lastTimestamp >= 1000) {
          // setFps(
          //   Math.round((frames * 1000) / (currentTimestamp - lastTimestamp))
          // );
          lastTimestamp = currentTimestamp;
          frames = 0;
        }
      };

      Matter.Events.on(render, "beforeRender", updateFps);

      // Mouse setup
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: true,
            lineWidth: 1,
            strokeStyle: "#ffffff",
          },
        },
      });

      World.add(world, mouseConstraint);
      render.mouse = mouse;

      // Run
      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);
      runnerRef.current = runner;

      // Cleanup on unmount
      return () => {
        Matter.Events.off(render, "beforeRender", updateFps);
        Render.stop(render);
        Runner.stop(runner);
        Engine.clear(engine);
        World.clear(world, false);
        render.canvas.remove();
        render.textures = {};
      };
    }
  }, [sorryComponentToggle]); // Run once, when component mounts

  useEffect(() => {
    if (!sorryComponentToggle && canAddBodies) {
      const engine = engineRef.current;
      const { world } = engine;

      // Re-add video player components
      const videoPlayerBox = new VideoPlayerBox({
        world,
        renderWidth: window.innerWidth,
        renderHeight: window.innerHeight,
      });
      const videoPlayButton = new VideoPlayButton({
        world,
        renderWidth: window.innerWidth,
        renderHeight: window.innerHeight,
      });
      const videoHamburgerMenu = new VideoHamburgerMenu({
        world,
        renderWidth: videoPlayerBox.walls[0].bounds.max.x,
        renderHeight: videoPlayerBox.walls[0].bounds.min.y,
      });

      // Add all bodies to the set initially
      videoPlayerBox.titleBodies.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      videoPlayerBox.walls.forEach((body) => bodiesWithCustomForce.add(body));
      videoPlayerBox.progressBarBox.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      videoPlayerBox.progressBar.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      videoPlayerBox.timeDisplay.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      videoHamburgerMenu.bodies.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      bodiesWithCustomForce.add(videoPlayButton.body);

      // setAddedBodies({ videoPlayerBox, videoPlayButton, videoHamburgerMenu });

      Events.on(engine, "beforeUpdate", function () {
        const gravity = engine.gravity;
        bodiesWithCustomForce.forEach((body) => {
          Matter.Body.applyForce(body, body.position, {
            x: -gravity.x * gravity.scale * body.mass,
            y: -gravity.y * gravity.scale * body.mass,
          });
        });
      });

      // Collision event handler
      Events.on(engine, "collisionStart", (event) => {
        if (!hasCollidedGlobalRef.current && !triggeredSubtitleRef4.current) {
          setHasCollided(true);
          hasCollidedGlobalRef.current = true;
          playAudio4();
          addSubtitles4();
          setHintText5("");
        }

        event.pairs.forEach((pair) => {
          bodiesWithCustomForce.delete(pair.bodyA);
          bodiesWithCustomForce.delete(pair.bodyB);
        });

        requestAnimationFrame(() => {
          if (bodiesWithCustomForce.size === 0) {
            if (!audioTextRef_4.current!.paused) {
              audioTextRef_4.current!.pause();
              audioTextRef_4.current!.currentTime = 0;
            }
            if (!triggeredAudioGlobal5.current) {
              setTimeout(() => {
                setSorryComponentToggle(true);
              }, 11300);
              playAudio5();
              addSubtitles5();
              triggeredAudioGlobal5.current = true;
              Matter.Events.off(engine, "collisionStart", () => {});
            }
          } else {
            console.log(bodiesWithCustomForce.size);
          }
        });
      });
      if (triggeredAudioGlobal5.current) {
        Events.on(engine, "collisionStart", (event) => {
          event.pairs.forEach((pair) => {
            bodiesWithCustomForce.delete(pair.bodyA);
            bodiesWithCustomForce.delete(pair.bodyB);
          });

          requestAnimationFrame(() => {
            if (bodiesWithCustomForce.size === 0) {
              if (!audioTextRef_6.current!.paused) {
                audioTextRef_6.current!.pause();
                audioTextRef_6.current!.currentTime = 0;
              }
              if (!triggeredSubtitleRef7.current) {
                playAudio7();
                addSubtitles7();
                triggeredSubtitleRef7.current = true;
              }
            } else {
              console.log(bodiesWithCustomForce.size);
            }
          });
        });
      }
    }
  }, [sorryComponentToggle, canAddBodies]);

  function handleSorryComplete() {
    if (!audioTextRef_5.current!.paused) {
      audioTextRef_5.current!.pause();
      audioTextRef_5.current!.currentTime = 0;
    }
    if (!triggeredAudioGlobal6.current) {
      playAudio6();
      addSubtitles6();
      triggeredAudioGlobal6.current = true;
      setTriggeredAudio6(true);
    }
  }

  function handleSwordMiniGameComplete() {
    if (!audioTextRef_7.current!.paused) {
      audioTextRef_7.current!.pause();
      audioTextRef_7.current!.currentTime = 0;
    }
    if (!triggeredAudioGlobal9.current) {
      playAudio9();
      addSubtitles9();
      triggeredAudioGlobal9.current = true;
      setHintText3("");
    }
  }

  function handleCookieClickerGameComplete() {
    if (!audioTextRef_9.current!.paused) {
      audioTextRef_9.current!.pause();
      audioTextRef_9.current!.currentTime = 0;
    }
    if (!triggeredAudioGlobal11.current) {
      if (!audioTextRef_10.current!.paused) {
        audioTextRef_10.current!.pause();
        audioTextRef_10.current!.currentTime = 0;
      }
      playAudio11();
      addSubtitles11();
      triggeredAudioGlobal11.current = true;
      setHintText4("");
    }
  }

  return (
    <>
      <div className="select-none">
        {!sorryComponentToggle &&
          !swordFightComponentToggle &&
          !cookieClickerComponentToggle &&
          !rickRollComponentToggle && (
            <div
              ref={sceneRef}
              className="w-full h-screen relative flex flex-col justify-center"
            >
              {/* <div className="absolute top-2 right-2 text-white">
              FPS: {fps.toFixed(0)}
            </div> */}
              {!hasClicked && !canAddBodies && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl">
                  <div>{startText.current}</div>
                  <div className="text-sm sm:text-base mt-5">
                    - Make sure your audio is on.
                  </div>
                  <div className="text-sm sm:text-base">
                    - If you resize the window, refresh the website too.
                  </div>
                  <div className="text-sm sm:text-base">
                    - Best viewed on Desktop.
                  </div>
                  <div className="text-base mt-5">
                    - Might not work properly on some browsers.
                  </div>
                  <button
                    onClick={() => handleUserInteraction(true)}
                    className="mt-5 px-4 py-2 bg-gray-800 text-white rounded flex items-center space-x-2 hover:bg-gray-900"
                  >
                    <FaLightbulb />
                    <span>Play With Hints</span>
                  </button>
                  <button
                    onClick={() => handleUserInteraction(false)}
                    className="mt-5 px-4 py-2 bg-gray-800 text-white rounded flex items-center space-x-2 hover:bg-gray-900"
                  >
                    <FaRegLightbulb />
                    <span>Play Without Hints</span>
                  </button>
                </div>
              )}

              {hasClicked && !canAddBodies && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl lg:text-3xl pointer-events-none">
                  {subtitle1}
                </div>
              )}
              {hasClicked && canAddBodies && !hasCollided && (
                <div className="absolute inset-0 flex flex-col items-center justify-normal max-h-fit w-full text-sm sm:text-base md:text-xl lg:text-2xl mt-6 sm:mt-6 md:mt-10 lg:mt-16 pointer-events-none">
                  {hintText5}
                </div>
              )}
              {hasClicked &&
                canAddBodies &&
                hasCollided &&
                !triggeredAudioGlobal5.current && (
                  <div className="absolute inset-0 flex flex-col items-center justify-normal max-h-fit w-full mt-6 sm:mt-6 md:mt-10 lg:mt-16 pointer-events-none">
                    <div className="text-white text-base sm:text-2xl md:text-4xl lg:text-5xl max-w-fit">
                      {subtitle2}
                    </div>

                    <div className="text-white mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-fit">
                      {hintText1}
                    </div>
                  </div>
                )}
            </div>
          )}

        <div id="modifyFirefox3" className="justify-center">
          {hasClicked &&
            canAddBodies &&
            hasCollided &&
            triggeredAudioGlobal5.current &&
            !triggeredAudioGlobal6.current &&
            !triggeredAudio6 && (
              <div className="absolute inset-0 flex flex-col items-center max-h-fit w-full mt-6 sm:mt-6 md:mt-10 lg:mt-16 pointer-events-none">
                <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-fit">
                  {subtitle3}
                </div>

                <div className="text-white text-base sm:text-xl md:text-2xl lg:text-2xl max-w-fit pointer-events-none">
                  {hintText2}
                </div>
              </div>
            )}
        </div>

        {triggeredAudioGlobal6.current &&
          triggeredAudio6 &&
          !triggeredSubtitleRef7.current && (
            <div className="absolute inset-0 flex flex-col items-center justify-normal max-h-fit w-full mt-6 sm:mt-6 md:mt-10 lg:mt-16 pointer-events-none">
              <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl  max-w-fit ">
                {subtitle4}
              </div>

              <div className="text-white text-base sm:text-xl md:text-2xl lg:text-2xl max-w-fit">
                {hintText1}
              </div>
            </div>
          )}

        {triggeredSubtitleRef7.current && !swordFightComponentToggle && (
          <div className="flex flex-col items-center justify-center max-h-fit w-full mt-6 sm:mt-6 md:mt-10 lg:mt-16 pointer-events-none">
            <div className="absolute inset-0 flex justify-center mt-8 sm:mt-6 md:mt-10 lg:mt-16 pointer-events-none text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              {triggeredAudioGlobal11 ? subtitle1 : subtitle6}
            </div>
            <div className="lg:mt-6 mt-4 text-white text-base sm:text-xl md:text-2xl lg:text-3xl max-w-fit">
              {hintText4}
            </div>
          </div>
        )}
        {sorryComponentToggle && (
          <div>
            <SorryComponent onComplete={handleSorryComplete} />
          </div>
        )}
        {swordFightComponentToggle && !sorryComponentToggle && (
          <div>
            <SwordMiniGameComponent onComplete={handleSwordMiniGameComplete} />
          </div>
        )}

        {swordFightComponentToggle && !cookieClickerComponentToggle && (
          <div className="absolute inset-0 flex flex-col items-center max-h-[50px] sm:max-h-fit w-full mt-12 sm:mt-6 md:mt-10 lg:mt-16 pointer-events-none">
            <div className="flex items-center text-white text-sm mt-20 sm:mt-4 sm:text-2xl md:text-3xl lg:text-4xl ">
              {subtitle5}
            </div>
            <div className="mt-6 text-white text-sm sm:text-base md:text-xl lg:text-2xl max-w-fit">
              {hintText3}
            </div>
          </div>
        )}

        {cookieClickerComponentToggle &&
          !swordFightComponentToggle &&
          !sorryComponentToggle &&
          !rickRollComponentToggle && (
            <div>
              <div>
                <CookieClickerGameComponent
                  onComplete={handleCookieClickerGameComplete}
                />
              </div>
            </div>
          )}

        {rickRollComponentToggle && (
          <>
            <div className="flex flex-col items-center justify-center min-h-screen">
              {/* <div className="text-center">
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl lg:mt-16 md:mt-20 mt-12">
          {subtitleEnd1}
        </div>
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {subtitleEnd2}
        </div>
        <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {subtitleEnd3}
        </div>
      </div> */}
              <div className="mt-8 flex justify-center">
                <img
                  src={rickRollGif}
                  alt="Get Rick Rolled"
                  className="w-full max-w-xl h-auto rounded-lg"
                />
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <a
                  href="https://github.com/AndreiBalan-dev/there-is-no-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-3xl hover:text-gray-400"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://buymeacoffee.com/balanandrev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-3xl hover:text-gray-400"
                >
                  <FaCoffee />
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MatterComponent;
