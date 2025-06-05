# frozen_string_literal: true

execute 'imagemagick__extract' do
  command "tar xf #{node['chef-imagemagick']['source']['file_path']}"
  cwd     Chef::Config['file_cache_path']

  not_if { ::File.directory? node['chef-imagemagick']['source']['folder_path'] }
end
