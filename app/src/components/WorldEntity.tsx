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
import SorryComponent from "../components/(pages)/FirstPage";
import SwordMiniGameComponent from "../components/(pages)/SecondPage";
import CookieClickerGameComponent from "../components/(pages)/ThirdPage";

const MatterComponent: React.FC = () => {
  const [fps, setFps] = React.useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<EngineType>(Engine.create());
  const renderRef = useRef<RenderType | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const [hasClicked, setHasClicked] = useState(false);
  const [startText, setStartText] = useState("Click anywhere to start");
  const [canAddBodies, setCanAddBodies] = useState(false);
  const [canAddBodiesNext, setCanAddBodiesNext] = useState(false);
  const [hasCollided, setHasCollided] = useState(false);
  const [addedBodies, setAddedBodies] = useState<any>([]);
  const [sorryComponentToggle, setSorryComponentToggle] = useState(false);
  const [triggeredAudio6, setTriggeredAudio6] = useState(false);
  const [triggeredAudio9, setTriggeredAudio9] = useState(false);
  const [triggeredAudio11, setTriggeredAudio11] = useState(false);
  const [swordFightComponentToggle, setSwordFightComponentToggle] =
    useState(false);

  const [cookieClickerComponentToggle, setCookieClickerComponentToggle] =
    useState(false);

  const [subtitle1, setSubtitle1] = useState("");
  const [subtitle2, setSubtitle2] = useState("");
  const [subtitle3, setSubtitle3] = useState("");
  const [subtitle4, setSubtitle4] = useState("");
  const [hintText1, setHintText1] = useState("");
  const [hintText2, setHintText2] = useState("");

  let triggeredSubtitle4 = false;
  const bodiesWithCustomForce = new Set<Matter.Body>();

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

  const audioTextRef_1 = useRef<HTMLAudioElement>(new Audio(voice1));
  const audioTextHummingRef_1 = useRef<HTMLAudioElement>(new Audio(humming1));
  const audioTextRef_2 = useRef<HTMLAudioElement>(new Audio(voice2));
  const audioTextRef_3 = useRef<HTMLAudioElement>(new Audio(voice3));
  const audioSoundPopRef_1 = useRef<HTMLAudioElement>(new Audio(pop1));
  const audioTextRef_4 = useRef<HTMLAudioElement>(new Audio(voice4));
  const audioTextRef_5 = useRef<HTMLAudioElement>(new Audio(voice5));
  const audioTextRef_6 = useRef<HTMLAudioElement>(new Audio(voice6));
  const audioTextRef_7 = useRef<HTMLAudioElement>(new Audio(voice7));
  const audioTextRef_8 = useRef<HTMLAudioElement>(new Audio(voice8));
  const audioTextRef_9 = useRef<HTMLAudioElement>(new Audio(voice9));
  const audioTextRef_10 = useRef<HTMLAudioElement>(new Audio(voice10));
  const audioTextRef_11 = useRef<HTMLAudioElement>(new Audio(voice11));
  const audioTextRef_12 = useRef<HTMLAudioElement>(new Audio(voice12));
  const audioTextRef_13 = useRef<HTMLAudioElement>(new Audio(voice13));

  const hasCollidedGlobalRef = useRef(false);
  const triggeredSubtitleRef4 = useRef(false);
  const triggeredSubtitleRef7 = useRef(false);
  const triggeredAudioGlobal5 = useRef(false);
  const triggeredAudioGlobal6 = useRef(false);
  const triggeredAudioGlobal9 = useRef(false);
  const triggeredAudioGlobal11 = useRef(false);

  function playAudio1() {
    audioTextRef_1.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudioHumming1() {
    audioTextHummingRef_1.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio2() {
    audioTextRef_2.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio3() {
    audioTextRef_3.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudioPop1() {
    audioSoundPopRef_1.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio4() {
    audioTextRef_4.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio5() {
    audioTextRef_5.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio6() {
    audioTextRef_6.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio7() {
    audioTextRef_7.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio8() {
    audioTextRef_8.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio9() {
    audioTextRef_9.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio10() {
    audioTextRef_10.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio11() {
    audioTextRef_11.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio12() {
    audioTextRef_12.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio13() {
    audioTextRef_13.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function addSubtitles13() {
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
  }

  function addSubtitles12() {
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

    setTimeout(() => {
      setSubtitle1("");
    }, 12000); // Clear the subtitle text
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
    }, 16800); // Clear the subtitle text

    setTimeout(() => {
      playAudio12();
      addSubtitles12();
    }, 17000); // Start the next set of subtitles after the current one ends
  }

  function addSubtitles10() {
    setTimeout(() => {
      setSubtitle1(subtitles10[0]);
    }, 100); // "Yes, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[1]);
    }, 500); // "really, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[2]);
    }, 1000); // "a cookie. "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[3]);
    }, 1500); // "What? "

    setTimeout(() => {
      setSubtitle1(subtitles10[4]);
    }, 2200); // "Were you "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[5]);
    }, 2620); // "expecting something "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[6]);
    }, 3200); // "more, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[7]);
    }, 3700); // "I don’t know, "

    setTimeout(() => {
      setSubtitle1(subtitles10[8]);
    }, 4200); // "earth-shattering? "

    setTimeout(() => {
      setSubtitle1(subtitles10[9]);
    }, 5400); // "This is "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[10]);
    }, 6000); // "your final shot "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[11]);
    }, 7000); // "to prove "

    setTimeout(() => {
      setSubtitle1(subtitles10[12]);
    }, 7700); // "you can handle "

    setTimeout(() => {
      setSubtitle1(subtitles10[13]);
    }, 8200); // "anything without "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[14]);
    }, 9000); // "triggering Armageddon. "

    setTimeout(() => {
      setSubtitle1(subtitles10[15]);
    }, 10600); // "Now click away, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[16]);
    }, 11900); // "and don’t "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles10[17]);
    }, 12100); // "hold back!"

    setTimeout(() => {
      setSubtitle1("");
    }, 15000); // Clear the subtitle text
  }

  function addSubtitles9() {
    setTimeout(() => {
      setSubtitle1(subtitles9[0]);
    }, 100); // "Okay, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[1]);
    }, 500); // "okay, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[2]);
    }, 1150); // "I’ll admit, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[3]);
    }, 1700); // "you’re not "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[4]);
    }, 2200); // "entirely hopeless. "

    setTimeout(() => {
      setSubtitle1(subtitles9[5]);
    }, 3300); // "But you’ve got "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[6]);
    }, 3700); // "a worrying "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[7]);
    }, 4500); // "enthusiasm "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[8]);
    }, 5400); // "for breaking things. "

    setTimeout(() => {
      setSubtitle1(subtitles9[9]);
    }, 6800); // "So, if "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[10]);
    }, 7600); // "destruction is "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[11]);
    }, 8200); // "what you crave, "

    setTimeout(() => {
      setSubtitle1(subtitles9[12]);
    }, 9200); // "try this "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles9[13]);
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
      setSubtitle1("");
    }, 17000); // Clear the subtitle text
  }

  function addSubtitles8() {
    setTimeout(() => {
      setSubtitle1(subtitles8[0]);
    }, 100); // "Here’s "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[1]);
    }, 400); // "a sword. "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[2]);
    }, 1000); // "Yes, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[3]);
    }, 1400); // "you heard me "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[4]);
    }, 1800); // "right, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[5]);
    }, 2400); // "a sword! "

    setTimeout(() => {
      setSubtitle1(subtitles8[6]);
    }, 3400); // "No time "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[7]);
    }, 3900); // "for questions, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[8]);
    }, 4700); // "just start "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[9]);
    }, 5400); // "swinging. "

    setTimeout(() => {
      setSubtitle1(subtitles8[10]);
    }, 6400); // "Maybe if "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[11]);
    }, 6800); // "you prove "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[12]);
    }, 7500); // "you’re not "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[13]);
    }, 8100); // "a total disaster "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[14]);
    }, 9200); // "with this, "

    setTimeout(() => {
      setSubtitle1(subtitles8[15]);
    }, 10100); // "I might consider "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[16]);
    }, 10800); // "not unleashing "

    setTimeout(() => {
      setSubtitle1(subtitles8[17]);
    }, 11500); // "a digital apocalypse "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles8[18]);
    }, 12200); // "on this place."

    setTimeout(() => {
      setSubtitle1("");
    }, 16000); // Clear the subtitle text
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
      setHintText1("Hint: Break everything!");
    }, 20000); // "it this time."

    setTimeout(() => {
      setSubtitle4("");
    }, 22000); // Clear the subtitle text
  }

  function addSubtitles5() {
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
    console.log(triggeredSubtitle4);
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
      setHintText1("Hint: Break everything!");
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
  function handleUserInteraction() {
    if (!hasClicked) {
      setHasClicked(true);
      playAudio3();
      addSubtitles3();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    const interval = setInterval(() => {
      setStartText((prev) => {
        if (prev.endsWith("...")) {
          return "Click anywhere to start";
        } else {
          return prev + ".";
        }
      });
    }, 1000);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      clearInterval(interval);
    };
  }, [hasClicked]);

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

      const wallThickness = 50; // Thickness of the website box
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
          setFps(
            Math.round((frames * 1000) / (currentTimestamp - lastTimestamp))
          );
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
    if (!sorryComponentToggle && (canAddBodies || canAddBodiesNext)) {
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

      setAddedBodies({ videoPlayerBox, videoPlayButton, videoHamburgerMenu });

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
        }

        event.pairs.forEach((pair) => {
          bodiesWithCustomForce.delete(pair.bodyA);
          bodiesWithCustomForce.delete(pair.bodyB);
        });

        requestAnimationFrame(() => {
          if (bodiesWithCustomForce.size === 0) {
            if (!audioTextRef_4.current.paused) {
              audioTextRef_4.current.pause();
              audioTextRef_4.current.currentTime = 0;
            }
            if (!triggeredAudioGlobal5.current) {
              setTimeout(() => {
                setSorryComponentToggle(true);
              }, 11300);
              playAudio5();
              addSubtitles5();
              triggeredAudioGlobal5.current = true;
              Matter.Events.off(engine, "collisionStart", (e) => {});
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
              if (!audioTextRef_6.current.paused) {
                audioTextRef_6.current.pause();
                audioTextRef_6.current.currentTime = 0;
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
  }, [sorryComponentToggle, canAddBodies, canAddBodiesNext]);

  function handleSorryComplete() {
    if (!audioTextRef_5.current.paused) {
      audioTextRef_5.current.pause();
      audioTextRef_5.current.currentTime = 0;
    }
    if (!triggeredAudioGlobal6.current) {
      playAudio6();
      addSubtitles6();
      triggeredAudioGlobal6.current = true;
      setTriggeredAudio6(true);
    }
  }

  function handleSwordMiniGameComplete() {
    if (!audioTextRef_7.current.paused) {
      audioTextRef_7.current.pause();
      audioTextRef_7.current.currentTime = 0;
    }
    if (!triggeredAudioGlobal9.current) {
      playAudio9();
      addSubtitles9();
      triggeredAudioGlobal9.current = true;
      setTriggeredAudio9(true);
    }
  }

  function handleCookieClickerGameComplete() {
    if (!audioTextRef_9.current.paused) {
      audioTextRef_9.current.pause();
      audioTextRef_9.current.currentTime = 0;
    }
    if (!triggeredAudioGlobal11.current) {
      playAudio11();
      addSubtitles11();
      triggeredAudioGlobal11.current = true;
      setTriggeredAudio11(true);
    }
  }

  return (
    <>
      {!sorryComponentToggle && !swordFightComponentToggle && (
        <div
          ref={sceneRef}
          className="w-full h-screen relative flex flex-col justify-center"
        >
          <div className="absolute top-2 right-2 text-white">
            FPS: {fps.toFixed(0)}
          </div>
          {!hasClicked && !canAddBodies && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl">
              <div>{startText}</div>
              <div className="text-base mt-5">Make sure your audio is on!</div>
              <div className="text-base">
                If you resize the window, refresh the website too!
              </div>
            </div>
          )}
          {hasClicked && !canAddBodies && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {subtitle1}
            </div>
          )}
          {hasClicked &&
            canAddBodies &&
            hasCollided &&
            !triggeredAudioGlobal5.current && (
              <div className="absolute inset-0 flex flex-col items-center justify-center max-h-fit w-full mt-20">
                <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-fit">
                  {subtitle2}
                </div>

                <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-fit">
                  {hintText1}
                </div>
              </div>
            )}
        </div>
      )}

      {hasClicked &&
        canAddBodies &&
        hasCollided &&
        triggeredAudioGlobal5.current &&
        !triggeredAudioGlobal6.current &&
        !triggeredAudio6 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center max-h-fit w-full mt-20">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-fit">
              {subtitle3}
            </div>

            <div className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl max-w-fit">
              {hintText2}
            </div>
          </div>
        )}

      {triggeredAudioGlobal6.current &&
        triggeredAudio6 &&
        !triggeredSubtitleRef7.current && (
          <div className="absolute inset-0 flex flex-col items-center justify-center max-h-fit w-full mt-20">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-fit">
              {subtitle4}
            </div>

            <div className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl max-w-fit">
              {hintText1}
            </div>
          </div>
        )}

      {triggeredSubtitleRef7.current && !swordFightComponentToggle && (
        <div className="absolute inset-0 flex flex-col items-center justify-center max-h-fit w-full mt-20">
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {subtitle1}
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

      {cookieClickerComponentToggle &&
        !swordFightComponentToggle &&
        !sorryComponentToggle && (
          <div>
            <CookieClickerGameComponent
              onComplete={handleCookieClickerGameComplete}
            />
          </div>
        )}
    </>
  );
};

export default MatterComponent;
