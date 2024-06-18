# frozen_string_literal: true

execute 'imagemagick__compile' do
  command 'make && make install'
  cwd     node['chef-imagemagick']['source']['folder_path']
end
