# frozen_string_literal: true

include_recipe 'chef-imagemagick::dependencies'

include_recipe 'chef-imagemagick::jpeg'
include_recipe 'chef-imagemagick::png'

include_recipe 'chef-imagemagick::download'
include_recipe 'chef-imagemagick::extract'
include_recipe 'chef-imagemagick::configure'
include_recipe 'chef-imagemagick::compile'
