import React from 'react';

import SVG from '../UI/svg';

import styles from './index.module.scss';

function Footer(props) {

    return (
        <footer className={styles.footer}>
            <p>Project created by Botche </p>
            <div className={styles.footer__svgs}>
                <a className={styles.footer__link} href="https://github.com/Botche"><SVG iconName="github" /></a>
                <a className={styles.footer__link} href="https://www.linkedin.com/in/gabriel-petkov-011868197/"><SVG iconName="linkedIn" /></a>
            </div>
        </footer>
    );
}

export default Footer;