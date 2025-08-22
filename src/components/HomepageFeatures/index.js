import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Collaboration',
    Svg: require('@site/static/img/undraw_azero_decentralised.svg').default,
    description: (
      <>
        The contribution of each member of this community is consolidated under one roof thanks to 
        geoDNS (and other tools) where posible, building a network more decentralised, resilient and unstoppable.
      </>
    ),
  },
  {
    title: 'Bootnodes',
    Svg: require('@site/static/img/undraw_azero_bootnode.svg').default,
    description: (
      <>
        The collective of Aleph Zero fans are happy to provide persistent details of their nodes
        so new operators can start their nodes and find more peers in the network.
      </>
    ),
  },
  {
    title: 'Endpoints',
    Svg: require('@site/static/img/undraw_azero_endpoint.svg').default,
    description: (
      <>
        Generous members of the community commit additional storage to provide full archives
        of the blockchains, accesible to the public via RPC Endpoints.
      </>
    ),
  },
  {
    title: 'Wallets',
    Svg: require('@site/static/img/undraw_azero_walletapp.svg').default,
    description: (
      <>
        Also, other participants host the wallet app in their servers so these can be easily accessed 
        from all around the world with lightning speed.
      </>
    ),
  },
  {
    title: 'Explorers',
    Svg: require('@site/static/img/undraw_azero_explorer.svg').default,
    description: (
      <>
        Further down the road, maybe the next frontier will offer the possibility to 
        decentralise blockchain indexers or block-explorers to the broader community... any ideas?.
      </>
    ),
  },
  {
    title: 'Beyond...',
    Svg: require('@site/static/img/undraw_azero_lfg.svg').default,
    description: (
      <>
        The motivation of this initiative stems from the current crisis in the Aleph Zero network,
        but as all other crises this one will pass with time... so let's keep it fun and exciting!
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
        <Heading as="h3">{title}</Heading>
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
