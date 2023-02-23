import './style.css';

interface LinkProps {
  url: string;
  title: string;
}

export default function Link(props: LinkProps) {
  return (
    <a
      className='rnt-link'
      href={props.url}
      target='_blank'
      rel='noreferrer'
    >
      {props.title}
    </a>
  );
}