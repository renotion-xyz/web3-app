import { Box, Heading } from 'react-bulma-components';
import Link from '../Link';

const ITEMS = [
  'https://thetrustedproduction.com/'
]

export default function Showcase() {
  return (
    <Box>
      <Heading size={4}>
        Showcase
      </Heading>
      {
        ITEMS.map((item, idx) => (
          <p key={`showcase-${idx}`}>
            <Link
              title={item}
              url={item}
            />
          </p>
        ))
      }
    </Box>
  );
}