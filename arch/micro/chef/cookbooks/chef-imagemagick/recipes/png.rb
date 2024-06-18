# frozen_string_literal: true

remote_file node['chef-imagemagick']['png']['source']['file_path'] do
  checksum node['chef-imagemagick']['png']['source']['checksum']
  source   node['chef-imagemagick']['png']['source']['url']

  not_if { ::File.exist? node['chef-imagemagick']['png']['source']['file_path'] }
end

execute 'imagemagick__png__extract' do
  command "tar xf #{node['chef-imagemagick']['png']['source']['file_path']}"
  cwd     Chef::Config['file_cache_path']

  not_if { ::File.directory? node['chef-imagemagick']['png']['source']['folder_path'] }
end

execute 'imagemagick__png__configure' do
  command "./configure --disable-install-doc"
  cwd     node['chef-imagemagick']['png']['source']['folder_path']
end

execute 'imagemagick__png__compile' do
  command 'make && make install'
  cwd     node['chef-imagemagick']['png']['source']['folder_path']
end
