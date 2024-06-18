include_recipe 'oh_my_zsh'

node['users'].each do |name|
  user = data_bag_item('users', name)

  if user['oh-my-zsh'] && user['oh-my-zsh']['enabled']

    if res_action = user['oh-my-zsh']['action']
      res_action  = res_action.to_sym
    end

    login = user['oh-my-zsh']['login'] ? user['oh-my-zsh']['login'] : user['id']

    oh_my_zsh_user login do
      home           user['home']
      theme          user['oh-my-zsh']['theme']
      case_sensitive user['oh-my-zsh']['case_sensitive']
      plugins        user['oh-my-zsh']['plugins']
      autocorrect    user['oh-my-zsh']['autocorrect']
      locale         user['locale']
      action         res_action || :ensure
    end
  end
end
