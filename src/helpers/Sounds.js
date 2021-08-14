import like from "../assets/sounds/state-change_confirm-up.wav";
import open from "../assets/sounds/ui_lock.wav";
// import close from "../assets/sounds/ui_unlock.wav";
// import camera from "../assets/sounds/ui_camera-shutter.wav";
// import trash from "../assets/sounds/navigation_transition-right.wav";
import slide from "../assets/sounds/navigation_hover-tap.wav";


const likeAudio = new Audio(like);
const openAudio = new Audio(open);
// const closeAudio = new Audio(close);
// const cameraAudio = new Audio(camera);
// const trashAudio = new Audio(trash);
const slideAudio = new Audio(slide);

const playSound = audioFile => { audioFile.play()};

const onClick=(type)=>{
  switch (type) {
    case 'like':
      playSound(likeAudio)
    break;
    case 'comment':
      playSound(openAudio)
    break;
    case 'open':
      playSound(slideAudio)
    break;
    default:
    playSound(likeAudio)
  }

}
export default onClick
