# frozen_string_literal: true

default['chef-imagemagick']['source']['checksum']  = '16068fd45bcde796d7d8cce299b48649718b6f4b6d583effec5737b9c922fca6'
default['chef-imagemagick']['source']['extension'] = 'tar.gz'
default['chef-imagemagick']['source']['uri']       = 'https://www.imagemagick.org/download'
default['chef-imagemagick']['source']['version']   = '7.0.8-10'

default['chef-imagemagick']['source']['folder_name'] = "ImageMagick-#{node['chef-imagemagick']['source']['version']}"
default['chef-imagemagick']['source']['file_name']   = "#{node['chef-imagemagick']['source']['folder_name']}.#{node['chef-imagemagick']['source']['extension']}"
default['chef-imagemagick']['source']['file_path']   = "#{Chef::Config['file_cache_path']}/#{node['chef-imagemagick']['source']['file_name']}"
default['chef-imagemagick']['source']['folder_path'] = "#{Chef::Config['file_cache_path']}/#{node['chef-imagemagick']['source']['folder_name']}"
default['chef-imagemagick']['source']['url']         = "#{node['chef-imagemagick']['source']['uri']}/#{node['chef-imagemagick']['source']['file_name']}"

# Delegators

default['chef-imagemagick']['delegators']['source']['uri'] = 'https://www.imagemagick.org/download/delegates'

## JPEG

default['chef-imagemagick']['jpeg']['source']['checksum']  = '240fd398da741669bf3c90366f58452ea59041cacc741a489b99f2f6a0bad052'
default['chef-imagemagick']['jpeg']['source']['extension'] = 'tar.gz'
default['chef-imagemagick']['jpeg']['source']['version']   = '9b'

default['chef-imagemagick']['jpeg']['source']['folder_name'] = "jpeg-#{node['chef-imagemagick']['jpeg']['source']['version']}"
default['chef-imagemagick']['jpeg']['source']['file_name']   = "jpegsrc.v#{node['chef-imagemagick']['jpeg']['source']['version']}.#{node['chef-imagemagick']['jpeg']['source']['extension']}"
default['chef-imagemagick']['jpeg']['source']['file_path']   = "#{Chef::Config['file_cache_path']}/#{node['chef-imagemagick']['jpeg']['source']['file_name']}"
default['chef-imagemagick']['jpeg']['source']['folder_path'] = "#{Chef::Config['file_cache_path']}/#{node['chef-imagemagick']['jpeg']['source']['folder_name']}"
default['chef-imagemagick']['jpeg']['source']['url']         = "#{default['chef-imagemagick']['delegators']['source']['uri']}/#{node['chef-imagemagick']['jpeg']['source']['file_name']}"

## PNG

default['chef-imagemagick']['png']['source']['checksum']  = '042e8701abc737a72f1393d0d8fca8ca86146460fe94c6c396261868f489c2de'
default['chef-imagemagick']['png']['source']['extension'] = 'tar.gz'
default['chef-imagemagick']['png']['source']['version']   = '1.6.31'

default['chef-imagemagick']['png']['source']['folder_name'] = "libpng-#{node['chef-imagemagick']['png']['source']['version']}"
default['chef-imagemagick']['png']['source']['file_name']   = "#{node['chef-imagemagick']['png']['source']['folder_name']}.#{node['chef-imagemagick']['png']['source']['extension']}"
default['chef-imagemagick']['png']['source']['file_path']   = "#{Chef::Config['file_cache_path']}/#{node['chef-imagemagick']['png']['source']['file_name']}"
default['chef-imagemagick']['png']['source']['folder_path'] = "#{Chef::Config['file_cache_path']}/#{node['chef-imagemagick']['png']['source']['folder_name']}"
default['chef-imagemagick']['png']['source']['url']         = "#{default['chef-imagemagick']['delegators']['source']['uri']}/#{node['chef-imagemagick']['png']['source']['file_name']}"

# Dependencies

default['chef-imagemagick']['source']['dependencies'] = []
