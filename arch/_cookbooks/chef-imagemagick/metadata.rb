description      'Installs and configure ImageMagick.'
license          'MIT'
long_description IO.read(File.join(File.dirname(__FILE__), 'README.md'))
maintainer       'Washington Botelho'
maintainer_email 'wbotelhos@gmail.com'
name             'chef-imagemagick'
version          '0.3.0'

recipe 'chef-imagemagick::compile',      'Compiles the source code.'
recipe 'chef-imagemagick::config',       'Create config file.'
recipe 'chef-imagemagick::configure',    'Configures the source code.'
recipe 'chef-imagemagick::dependencies', 'Installs dependencies.'
recipe 'chef-imagemagick::download',     'Downloads the source.'
recipe 'chef-imagemagick::extract',      'Extracts the source code.'
recipe 'chef-imagemagick::jpeg',         'Installs JPEG lib.'
recipe 'chef-imagemagick::png',          'Installs PNG lib.'

issues_url 'https://github.com/wbotelhos/chef-imagemagick/issues'
source_url 'https://github.com/wbotelhos/chef-imagemagick'

supports 'ubuntu'

chef_version '>= 11'
