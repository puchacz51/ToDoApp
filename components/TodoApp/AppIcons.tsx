import { CgGym } from "react-icons/cg";
import { FaSchool, FaSun, FaSuitcase } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { Category } from "../../types";
export const SwitchIcon: React.FC<{ option: Category }> = (props) => {
  const category: string = props.option;

  let icon: JSX.Element;
  switch (category) {
    case "gym":
      icon = <CgGym />;
      break;
    case "school":
      icon = <FaSchool />;
      break;
    case "work":
      icon = <FaSuitcase />;
      break;
    case "daily duties":
      icon = <FaSun />;
      break;

    default:
      icon = <BiTask />;
      break;
  }
  return icon;
};
