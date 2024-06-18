# frozen_string_literal: true

remote_file node['chef-imagemagick']['jpeg']['source']['file_path'] do
  checksum node['chef-imagemagick']['jpeg']['source']['checksum']
  source   node['chef-imagemagick']['jpeg']['source']['url']

  not_if { ::File.exist? node['chef-imagemagick']['jpeg']['source']['file_path'] }
end

execute 'imagemagick__jpeg__extract' do
  command "tar xf #{node['chef-imagemagick']['jpeg']['source']['file_path']}"
  cwd     Chef::Config['file_cache_path']

  not_if { ::File.directory? node['chef-imagemagick']['jpeg']['source']['folder_path'] }
end

execute 'imagemagick__jpeg__configure' do
  command "./configure --disable-install-doc"
  cwd     node['chef-imagemagick']['jpeg']['source']['folder_path']
end

execute 'imagemagick__jpeg__compile' do
  command 'make && make install'
  cwd     node['chef-imagemagick']['jpeg']['source']['folder_path']
end
