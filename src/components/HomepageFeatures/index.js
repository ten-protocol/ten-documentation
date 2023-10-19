import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Encrypted',
    png: require('@site/static/img/encrypted-trans.png').default,
    description: (
      <>
   Obscuro leverages hardware-based Trusted Execution Environments (TEE) to achieve data confidentiality and computational privacy.

      </>
    ),
  },
  {
    title: 'Scale',
    png: require('@site/static/img/scale-trans.png').default,
    description: (
      <>
        Designed as a decentralized Ethereum L2 Rollup protocol, Obscuro enhances the scalability of the Ethereum network.
      </>
    ),
  },
  {
    title: 'Great UX & DX',
    png: require('@site/static/img/great-ux-dx-trans.png').default,
    description: (
      <>
        Obscuro prioritizes privacy while maintaining a seamless user experience, allowing users to access their preferred dApps and services without additional applications or extensions.
      </>
    ),
  },
];

function Feature({ png, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Use the PNG image */}
        <img src={png} alt={title} className={styles.featureSvg} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

//function Feature({Svg, title, description}) {
//  return (
//    <div className={clsx('col col--4')}>
//      <div className="text--center">
//        <Svg className={styles.featureSvg} role="img" />
//      </div>
//      <div className="text--center padding-horiz--md">
//        <h3>{title}</h3>
//        <p>{description}</p>
//      </div>
//    </div>
//  );
//}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
