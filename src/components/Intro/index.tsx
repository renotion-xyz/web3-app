import './style.css';
import { Block } from 'react-bulma-components';
import Link from '../Link';

export default function Intro() {
  return (
    <Block>
      <Block className='intro-block-prominent'>
        <span className='renotion-title-color'>
          <b>Re</b>
        </span>
        notion is a web3-based app that allows you to publish your
        Notion publicly shared page to your custom domain.
      </Block>
      <Block>
        <span className='intro-block-prominent'>This way,</span>
        <div className='intro-address-bar'>
          https://example.notion.site/Hello-World-f589ad99d9354d....
        </div>
        <span className='intro-block-prominent'>💣 becomes...</span>
        <div className='intro-address-bar'>
          https://example.com/
        </div>
      </Block>
      <Block>
        This project uses global infrastructure of
        {' '}
        <Link url='https://workers.cloudflare.com/' title='Cloudflare'/>
        {' '}
        and
        {' '}
        <Link url='https://polygon.technology/' title='Polygon'/>.
        <br/>
        Find more info, full source code, and the roadmap on Github:
        {' '}
        <Link url='https://github.com/renotion-xyz'/>
      </Block>
    </Block>
  )
}