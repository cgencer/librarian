include_recipe 'zsh'
include_recipe 'oh_my_zsh'

user_account 'lenny' do
  shell '/bin/zsh'
  home '/home/lenny'
end

oh_my_zsh_user 'lenny' do
  home  '/home/lenny'
  theme 'aussiegeek'
  action :ensure
end

user_account 'mary' do
  shell '/bin/zsh'
end

oh_my_zsh_user 'mary' do
  plugins        %w{rvm ruby}
  autocorrect    false
  case_sensitive true
  action :ensure
end

template '/home/mary/.zshrc.chef.local' do
  source 'zshrc.chef.local.erb'
  owner 'mary'
end

# DO not do this in production, this file should be user controlled. We just do this for testing reasons
template '/home/mary/.zshrc.local' do
  source 'zshrc.local.erb'
  owner 'mary'
end


