# frozen_string_literal: true

node['chef-imagemagick']['source']['dependencies'].each { |pkg| package pkg }
