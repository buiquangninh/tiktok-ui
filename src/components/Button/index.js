import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    text = true,
    primary = false,
    secondary = false,
    outline = false,
    disabled = false,
    rounded = false,
    small = false,
    large = false,
    w100 = false,
    children,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith === 'on' && typeof key === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        secondary,
        outline,
        disabled,
        rounded,
        small,
        large,
        w100,
        text,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon-left')}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={cx('icon-right')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
