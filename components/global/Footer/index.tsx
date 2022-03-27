import { Container, Grid, Typography } from '@/components/reusable';
import classNames from 'classnames/bind';
import { Maybe } from 'graphql/jsutils/Maybe';

import styles from './index.module.scss';

const css = classNames.bind(styles);

export interface FooterProps {
  copyright?: Maybe<string>;
}

export const Footer: React.FC<FooterProps> = ({ copyright }) => (
  <footer className={css('footer')}>
    <Container>
      <Grid container justifyContent="center" alignItems="center">
        {copyright && (
          <Typography as="span" variant="body" bodySize="secondary">
            {copyright}
          </Typography>
        )}
      </Grid>
    </Container>
  </footer>
);
