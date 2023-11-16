import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Encryption',
    png: require('@site/static/img/encrypted.png').default,
    description: (
      <>
        The first Ethereum L2 to bring confidential EVM smart contracts (with shared state). You can now build an AMM without MEV.
      </>
    ),
  },
  {
    title: 'Scalability',
    png: require('@site/static/img/scale.png').default,
    description: (
      <>
        Ten enhances the scalability of the Ethereum network by moving computation off-chain to secure enclaves and rolling up encrypted transactions.
      </>
    ),
  },
  {
    title: 'Great UX & DX',
    png: require('@site/static/img/great-ux-dx.png').default,
    description: (
      <>
        Ten has a seamless developer and user experience. DApps written for Ethereum will just work on Ten.
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
