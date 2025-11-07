import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Encryption',
    png: require('@site/static/img/encrypted.png').default,
    description: (
      <>
        The first L2 to encrypt Ethereum. TEN allows you to build contracts with data access controls, just like Web2. Suddenly anything becomes possible.
      </>
    ),
  },
  {
    title: 'Scalability',
    png: require('@site/static/img/scale.png').default,
    description: (
      <>
        TEN enhances the scalability of the Ethereum network by moving computation off-chain to secure enclaves and rolling up encrypted transactions.
      </>
    ),
  },
  {
    title: 'Great UX & DX',
    png: require('@site/static/img/great-ux-dx.png').default,
    description: (
      <>
        DApps written for Ethereum will just work on TEN.
        You don't have to learn any new languages and can use all your favorite Ethereum tools.
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
