<?php
namespace Deployer;

require 'recipe/common.php';
require 'recipe/slack.php';

// Project name
set('application', 'craft-starter');

// Configuration

set('repository', 'git@github.com:Upstatement/craft-starter.git');
set('git_tty', true); // [Optional] Allocate tty for git on first deployment

// Shared files/dirs between deploys
set('shared_files', [
    '.env',
    '.htaccess'
]);

set('shared_dirs', [
    'public/cpresources',
    'public/uploads',
    'storage/logs',
    'storage/runtime',
]);

// TODO: Configure Slack notifications.
// set('slack_webhook', '');
// set('slack_success_color', 'good');
// set('slack_failure_color', 'danger');

// Hosts
inventory('hosts.yml');

set('allow_anonymous_stats', false);


// Tasks
desc('Build static assets locally and upload');
task(
    'build',
    [
        'build:run',
        'build:upload',
    ]
);

desc('Run static assets build script');
task('build:run', function() {
    if (getenv('TRAVIS')) {
        writeln('<comment>Skipping static build on TravisCI</comment>');
    } else {
        run(
            'export NVM_DIR="$HOME/.nvm"
            source "$NVM_DIR/nvm.sh"
            nvm install
            npm install
            npm run build'
        );
    }
})->local();

desc('Upload built static assets');
task('build:upload', function () {
    upload(__DIR__.'/public/static/dist', '{{release_path}}/public/static');
});

desc('Run Craft migrations');
task('craft:migrate', './craft migrate/all --interactive=0');

desc('Sync Craft project configuration');
task('schematic:sync_project_config', './craft project-config/sync --interactive=0');

desc('Deploy your project');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
    'deploy:vendors',
    'build',
    'craft:migrate',
    'craft:sync_project_config',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);

// TODO: Slack notifications on deploy.
// before('deploy', 'slack:notify');
// after('success', 'slack:notify:success');
// after('deploy:failed', 'slack:notify:failure');

// If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
