version = 'v0.10.5'
node.set['nvm']['nvm_install_test']['version'] = version

user 'testuser' do
  shell '/bin/bash'
  supports :manage_home => true
  home '/home/testuser'
  action :create
end

include_recipe 'nvm'

nvm_install version  do
	from_source false
  user 'testuser'
	alias_as_default true
	action :create
end
