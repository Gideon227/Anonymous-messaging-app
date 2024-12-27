import { IconType } from "react-icons";
import { FaRobot } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { VscRobot } from "react-icons/vsc";
import { SiProbot } from "react-icons/si";
import { LiaRobotSolid } from "react-icons/lia";

export interface Avatar {
  id: number;
  image: IconType; // Explicit type for React Icon components
}

export const avatars: Avatar[] = [
  {
    id: 1,
    image: FaRobot,
  },
  {
    id: 2,
    image: BsRobot,
  },
  {
    id: 3,
    image: VscRobot,
  },
  {
    id: 4,
    image: SiProbot,
  },
  {
    id: 5,
    image: LiaRobotSolid,
  },
];
