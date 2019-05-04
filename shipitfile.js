module.exports = shipit => {
  require('shipit-deploy')(shipit);
  shipit.initConfig({
    default: {
      workspace: '/tmp/vote4art',
      repositoryUrl: 'git@github.com:lettell/vote4art.git',
      ignores: ['.git', 'node_modules', '.vscode'],
      keepReleases: 5,
      deleteOnRollback: false,
      shallowClone: true,
    },
    staging: {
      deployTo: '/home/admin/front/staging',
      branch: 'staging',
      servers: 'admin@webmiko.com:20167'
    },
    production: {
      branch: 'master',
      deployTo: '/home/admin/front/production',
      servers: 'admin@webmiko.com:20167'
    }
  });
};