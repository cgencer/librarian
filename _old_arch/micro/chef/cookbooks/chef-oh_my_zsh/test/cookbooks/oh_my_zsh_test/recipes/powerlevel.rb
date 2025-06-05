include_recipe 'zsh'
include_recipe 'oh_my_zsh'

user_account 'lenny' do
  shell '/bin/zsh'
  home '/home/lenny'
end

oh_my_zsh_user 'lenny' do
  home  '/home/lenny'
  theme 'powerlevel10k/powerlevel10k'
  action :ensure
end

# test deployment of preconfigured prompt
cookbook_file '/home/lenny/.p10k.zsh' do
  source 'p10k.zsh'
  owner 'root'
  group 'root'
  mode '0440'
  action :create
end