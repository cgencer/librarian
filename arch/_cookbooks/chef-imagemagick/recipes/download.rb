# frozen_string_literal: true

remote_file node['chef-imagemagick']['source']['file_path'] do
  checksum node['chef-imagemagick']['source']['checksum']
  source   node['chef-imagemagick']['source']['url']

  not_if { ::File.exist? node['chef-imagemagick']['source']['file_path'] }
end
