import classNames from 'classnames/bind';
import { DetailedHTMLProps, LabelHTMLAttributes } from 'react';

import styles from './Label.module.scss';

export interface LabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  required?: boolean;
}

const css = classNames.bind(styles);

export const Label: React.FC<LabelProps> = ({ children, htmlFor, required, id, ...props }) => {
  const classes = css('label', {
    'label--required': required,
  });
  return (
    <label htmlFor={htmlFor} className={classes} id={id} {...props}>
      {children}
    </label>
  );
};
