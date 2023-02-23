import './style.css';
import { MdContentCopy } from 'react-icons/md';

interface ClickToCopyProps {
  text: string;
  caption?: string;
}

function copy(text: string) {
  navigator.clipboard.writeText(text);
}

export default function ClickToCopy(props: ClickToCopyProps) {
  return (
    <div className='clickToCopy-container' onClick={() => copy(props.text)}>
      <span>{props.caption ?? props.text}</span>
      <MdContentCopy />
    </div>
  );
}
