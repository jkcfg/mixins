import { mix, patch } from '@jkcfg/mixins';
import * as std from '@jkcfg/std';

const withNamespace = ns => (
  obj => patch(obj, { metadata: { namespace: ns } })
);

const deployment = {
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  metadata: {
    labels: {
      app: 'nginx',
    },
  },
  spec: {
    selector: {
      matchLabels: {
        app: 'nginx',
      },
    },
    replicas: 2,
    template: {
      metadata: {
        labels: {
          app: 'nginx',
        },
      },
      spec: {
        containers: [{
          name: 'nginx',
          image: 'nginx:1.7.9',
          ports: [{
            containerPort: 80,
          }],
        }],
      },
    },
  },
};

std.log(mix(deployment, withNamespace('monitoring')), { format: std.Format.YAML });
