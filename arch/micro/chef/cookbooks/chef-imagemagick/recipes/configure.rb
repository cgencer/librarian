# frozen_string_literal: true

execute 'imagemagick__configure' do
  command './configure CPPFLAGS=-I/usr/local/include LDFLAGS=-L/usr/local/lib'
  cwd     node['chef-imagemagick']['source']['folder_path']
end
