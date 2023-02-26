import { Block, Box } from 'react-bulma-components';
import Link from '../Link';

export default function Intro() {
  return (
    <Box>
      <Block>
        <span className='renotion-title-color'>
          <b>Re</b>
        </span>
        notion is a web3-based app that allows you to publish your
        Notion publicly shared page to your custom domain.
      </Block>
      <Block>
        This way,<br/>
        <i><b>https://example.notion.site/</b>Hello-World-f589ad99d9354d....</i>
        {' '}becomes{' '}<i><b>https://example.com/</b></i>
      </Block>
      <Block>
        This project uses global infrastructure of
        {' '}
        <Link url='https://workers.cloudflare.com/' title='Cloudflare'/>
        {' '}
        and
        {' '}
        <Link url='https://polygon.technology/' title='Polygon'/>.
      </Block>
      <Block>
        Find more info, full source code, and the roadmap on Github:
        {' '}
        <Link url='https://github.com/renotion-xyz'/>
      </Block>
    </Box>
  )
}