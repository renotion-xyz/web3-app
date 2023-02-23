import { Block, Box, Heading } from 'react-bulma-components';
import Link from '../Link';

export default function Contact() {
  return (
    <Box>
      <Heading size={4}>
        Contact
      </Heading>
      <Block>
        Telegram: {' '}
        <Link
          url='https://t.me/quiker'
          title='@quiker'
        />
        <br/>
        Email: {' '}
        <Link
          url='mailto:hello@renotion.xyz'
          title='hello@renotion.xyz'
        />
      </Block>
    </Box>
  );
}