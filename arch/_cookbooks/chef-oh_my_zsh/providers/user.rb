# see https://docs-archive.chef.io/release/12-2/custom_resources.html#custom-providers-w-platform-resources
def load_current_resource
  @login = new_resource.login
  # TODO: == ?
  unless @home = new_resource.home
    @home = @login == 'root' ? '/root' : "/home/#{@login}"
  end
end

action :create do
  if ::File.exists?("#{@home}/.oh-my-zsh") && ::File.exists?("#{@home}/.zshrc")
    Chef::Log.info("#{@home}/.oh-my-zsh exists and action is :ensure, skipping")
  else
    install
  end
end

action :ensure do
  install
end

def install
  login, home = @login, @home

  arch_r = ark ".oh-my-zsh for #{login}" do
    name '.oh-my-zsh'
    path home
    url 'https://github.com/robbyrussell/oh-my-zsh/archive/master.tar.gz'
    action :put
    owner login
    group login
  end

  is_powerlevel_theme = new_resource.theme == 'powerlevel10k/powerlevel10k'
  if is_powerlevel_theme
    arch_r = ark ".powerlevel for #{login}" do
      name 'powerlevel10k'
      path "#{home}/.oh-my-zsh/custom/themes/"
      url 'https://github.com/romkatv/powerlevel10k/archive/master.tar.gz'
      action :put
      owner login
      group login
    end

  end

  conf_r = template "#{home}/.zshrc" do
    cookbook 'oh_my_zsh'
    source 'zshrc.erb'
    owner login
    mode '644'
    variables({
      :theme          => new_resource.theme,
      :case_sensitive => new_resource.case_sensitive,
      :plugins        => new_resource.plugins,
      :autocorrect    => new_resource.autocorrect,
      :locale         => new_resource.locale,
      :powerlevel     => is_powerlevel_theme
    })
  end

  updated = conf_r.updated_by_last_action? || arch_r.updated_by_last_action?
  new_resource.updated_by_last_action(updated)
end
