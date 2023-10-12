import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Encrypted',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
   Obscuro leverages hardware-based Trusted Execution Environments (TEE) to achieve data confidentiality and computational privacy.

      </>
    ),
  },
  {
    title: 'Scale',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Designed as a decentralized Ethereum L2 Rollup protocol, Obscuro enhances the scalability of the Ethereum network.
      </>
    ),
  },
  {
    title: 'Great UX & DX',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Obscuro prioritizes privacy while maintaining a seamless user experience, allowing users to access their preferred dApps and services without additional applications or extensions.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

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
