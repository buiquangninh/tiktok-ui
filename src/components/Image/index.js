import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import styles from './image.module.scss';

function Image({ src, alt, className, fallBack: customFallBack = images.noImage, ...props }, ref) {
    const [fallBack, setFallBack] = useState('');

    console.log(customFallBack);

    const handleError = () => {
        setFallBack(customFallBack);
    };

    return <img className={classNames(styles.wrapper, className)} ref={ref} src={fallBack || src} alt={alt} {...props} onError={handleError} />;
}

export default forwardRef(Image);
