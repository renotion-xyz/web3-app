import './style.css';
import polygon from '../../assets/polygon.svg';
import github from '../../assets/github.png';

export function References() {
  return (
    <div className='references'>
      <div>
        <a
          href='https://polygonscan.com/address/0xD189E333277a8dbd65244A97bE3ecBE4f7Bee5cf'
          target='_blank'
          rel='noreferrer'
        >
          <img src={polygon} width='40' height='40' alt='polygon' />
        </a>
      </div>
      <div>
        <a
          href='https://github.com/renotion-xyz'
          target='_blank'
          rel='noreferrer'
        >
          <img src={github} width='40' height='40' alt='github' />
        </a>
      </div>
    </div>
  )
}