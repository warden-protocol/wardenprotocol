import { useKeplrAddress } from "../keplr";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Address({ address, hideAvatar = false }: { address: string, hideAvatar?: boolean }) {
  const myAddr = useKeplrAddress();
  const color = getRandomColor(address);
  return (
    <span className="inline-flex flex-row items-center">
      {!hideAvatar && (
        <Avatar className="w-6 h-6 text-black text-xs font-semibold font-mono">
          <AvatarFallback style={{ background: color.color }}>
            {color.character}
          </AvatarFallback>
        </Avatar>
      )}
      <span className="ml-1 text-sm font-medium text-gray-900">
        {address === myAddr ? `you (${address})` : address}
      </span>
    </span>
  );
}

function getRandomColor(name: string) {
  const firstAlphabet = name.charAt(name.length - 2).toLowerCase();
  const secondAlphabet = name.charAt(name.length - 1).toLowerCase();
  const asciiCode1 = firstAlphabet.charCodeAt(0);
  const asciiCode2 = secondAlphabet.charCodeAt(0);
 
  const colorNum1 = asciiCode1.toString() + asciiCode1.toString() + asciiCode1.toString();
  const colorNum2 = asciiCode2.toString() + asciiCode2.toString() + asciiCode2.toString();
 
  var num = Math.round(0xffffff * (parseInt(colorNum1) + parseInt(colorNum2)) / 2);
  var r = num >> 16 & 255;
  var g = num >> 8 & 255;
  var b = num & 255;
 
  return {
    color: 'rgb(' + r + ', ' + g + ', ' + b + ', 0.3)',
    character: firstAlphabet.toUpperCase() + secondAlphabet.toUpperCase()
  };
}
